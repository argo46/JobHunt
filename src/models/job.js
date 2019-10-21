const conn = require('../configs/db')

module.exports = {
    getJobs: (page, orderby, order) => {
        return new Promise((resolve, reject) => {
            const itemPerPage = 2
        
            conn.query(`SELECT j.id, j.name, cat.name as category, com.name as company, j.salary, j.location, j.description, j.date_added, date_updated 
                        FROM job as j INNER JOIN category as cat ON j.category = cat.id 
                        JOIN company as com ON j.company = com.id
                        ORDER BY ${orderby} ${order}
                        LIMIT ${itemPerPage} OFFSET ${(page - 1)*itemPerPage}`, (err, result) => {
                if(!err){
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getJob: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT j.name, cat.name as category, com.name as company, j.salary, j.location, j.description, j.date_added, date_updated 
                        FROM job as j INNER JOIN category as cat ON j.category = cat.id 
                        JOIN company as com ON j.company = com.id
                        WHERE j.id = '${id}'`, (err, result) => {

                if(!err){
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    addJob: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO job SET ?', data, (err, result) => {
                if(!err){
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
                if(!err){
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
                if(!err){
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
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
    }
}