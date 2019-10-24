const conn = require('../configs/db')

module.exports = {
  getCompanies: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM company', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getCompany: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM company WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  addCompany: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO company SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateCompany: (id, data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE company SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deleteCompany: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM company WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
