const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {

  // generate hash for password
  hashPassword: (plainPass) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (!err) {
          bcrypt.hash(plainPass, salt, (err, hash) => {
            if (!err) {
              resolve(hash)
            } else {
              reject(new Error(err))
            }
          })
        } else { reject(new Error(err)) }
      })
    })
  }
}
