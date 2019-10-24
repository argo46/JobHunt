const conn = require('../configs/db')

module.exports = {
  getCategories: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM category', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getCategory: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM category WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  addCategory: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO category SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateCategory: (id, data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE category SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE from category WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
