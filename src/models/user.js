const conn = require('../configs/db')

module.exports = {
  addUser: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO user SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  checkEmailAndUsername: (email, userName) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * from user
                    WHERE email LIKE ? OR user_name LIKE ?`, [email, userName], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

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
