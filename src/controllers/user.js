const userModels = require('../models/user')
const uuid4 = require('uuid/v4')
const bcryptHelper = require('../helpers/bcrypt')
const bcrypt = require('bcrypt')
const validator = require('../helpers/validation')
const jwt = require('jsonwebtoken')

module.exports = {

  // add user async/await for waiting password been hashed
  addUser: async (req, res) => {
    const data = req.body
    data.id = uuid4()

    const dataValidation = validator.isNotUndefine([data.email, data.user_name, data.name, data.password])
    if (!dataValidation.allTrue) { validator.invalid(res, 'Error : Form data is incomplete', 400); return }

    // email validation
    if (!validator.emailText(data.email)) { validator.invalid(res, 'Error : email format is wrong', 400); return }

    // email and username validation
    const emailAndUsername = await validator.isEmailOrUserNameExistInDb(data.email, data.user_name)
    if (emailAndUsername.emailInvalid) {
      validator.invalid(res, 'Email is already exist', 400)
      return
    } else if (emailAndUsername.usernameInvalid) {
      validator.invalid(res, 'Username is already exist')
      return
    }

    // hashing password
    await bcryptHelper.hashPassword(data.password)
      .then(result => {
        data.password = result
      })
      .catch(err => {
        console.log(err)
      })

    // saving to database
    userModels.addUser(data)
      .then(result => {
        res.json({
          success: true,
          message: 'user succesfully added',
          user_id: data.id
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  login: (req, res) => {
    let { email, username } = req.body

    // setting default value for
    if (email === undefined && username === undefined) {
      res.status(401)
      res.json({
        status: 401,
        message: 'Wrong email or password'
      })
    } else {
      if (email === undefined) email = '%'
      if (username === undefined) username = '%'
    }

    userModels.login(email, username)
      .then(result => {
        bcrypt.compare(req.body.password, result[0].password)
          .then(bresult => {
            if (bresult) {
              const token = jwt.sign(JSON.stringify(result[0]), process.env.JWT_SECRET_KEY)
              res.json({
                message: 'succes',
                token: token,
                result: result[0]
              })
            } else {
              res.status(401)
              res.json({
                status: 401,
                message: 'Wrong email or password'
              })
            }
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
