const conn = require('../configs/db')

module.exports = {
  login: (email, username) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT id, email, user_name , name, password
                        FROM user WHERE email LIKE ? AND user_name LIKE ?`, [email, username], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
