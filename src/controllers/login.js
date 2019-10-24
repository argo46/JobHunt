const loginModels = require('../models/login')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
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

    loginModels.login(email, username)
      .then(result => {
        bcrypt.compare(req.body.password, result[0].password)
          .then(bresult => {
            if (bresult) {
              const token = jwt.sign(JSON.stringify(result[0]), process.env.JWT_SECRET_KEY)
              res.json({
                message: 'succes',
                token: token
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
