const conn = require('../configs/db')

module.exports = {
    getJobs: () => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT j.name, cat.name as category, com.name as company, j.salary, j.location, j.description, j.date_added, date_updated 
                        FROM job as j INNER JOIN category as cat ON j.category = cat.id 
                        JOIN company as com ON j.company = com.id`, (err, result) => {
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
                        WHERE j.id = ?`, id, (err, result) => {
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
    }
}