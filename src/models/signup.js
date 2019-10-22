const conn = require('../configs/db')

module.exports = {
    addUser: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO user SET ?`, data, (err, result) => {
                if(!err){
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}