const conn = require('../configs/db')

module.exports = {
    getJobs: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM job', (err, result) => {
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
            conn.query('SELECT * FROM job WHERE id = ?', id, (err, result) => {
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