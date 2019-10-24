const signupModels = require('../models/signup')
const uuid4 = require('uuid/v4')
const bcrypt = require('../helpers/bcrypt')
const validator = require('../helpers/validation')

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
    await bcrypt.hashPassword(data.password)
      .then(result => {
        data.password = result
      })
      .catch(err => {
        console.log(err)
      })

    // saving to database
    signupModels.addUser(data)
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
