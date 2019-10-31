const conn = require('../configs/db')

module.exports = {

  /**
    *   get all jobs with pagination and search query
    *
    *   page = the page that requested
    *   orderby = field to order
    *   order = asc / desc
    *   qname = search query name
    *   qcompany = search query company
     */
  getJobs: (page, orderby, order, qname, qcompany) => {
    return new Promise((resolve, reject) => {
      const itemPerPage = 3 // limit item per page
      conn.query(`SELECT j.id, j.name as name, cat.name as category, com.name as company, j.company as company_id, com.logo as company_logo, j.salary, j.location, j.description, j.date_added, j.date_updated
                  FROM job as j INNER JOIN category as cat ON j.category = cat.id 
                  JOIN company as com ON j.company = com.id
                  WHERE j.name LIKE ? AND com.name LIKE ?
                  ORDER BY ${orderby} ${order}
                  LIMIT ? OFFSET ?`, [qname, qcompany, itemPerPage, (page - 1) * itemPerPage], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getTotalCountJobs: (qname, qcompany) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT COUNT(*) AS total_data
                  FROM job as j INNER JOIN category as cat ON j.category = cat.id 
                  JOIN company as com ON j.company = com.id
                  WHERE j.name LIKE ? AND com.name LIKE ?`, [qname, qcompany], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // get single job
  getJob: (id) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT j.name, cat.name as category, com.name as company, j.salary, j.location, j.description, j.date_added, date_updated 
                        FROM job as j INNER JOIN category as cat ON j.category = cat.id 
                        JOIN company as com ON j.company = com.id
                        WHERE j.id = ?`, id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  addJob: (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO job SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateJob: (id, data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE job SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteJob: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM job WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

  // was search method in differen end point
  /* ,
    searchJob: (qname, qcompany) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT j.id, j.name, cat.name as category, com.name as company, j.salary, j.location, j.description, j.date_added, date_updated
            FROM job as j INNER JOIN category as cat ON j.category = cat.id
            JOIN company as com ON j.company = com.id
            WHERE j.name LIKE '%${qname}%' AND com.name LIKE '%${qcompany}%'`, (err, result) => {
                if(!err){
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    } */
}
