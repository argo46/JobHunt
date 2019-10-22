const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
    hashPassword: (plainPass) => {
        return new Promise ((resolve, reject) => {
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(plainPass, salt, (err, hash) => {
                    if(!err){
                           resolve(hash)
                    } else {
                           reject(new Error(err))
                    }
                })
            })
        })
    }
}