const loginModels = require('../models/login')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    login: (req, res) => {

        let {email, username} = req.body
        if(email === undefined) email = '%'
        if(username === undefined) username = '%'
        loginModels.login(email, username)
            .then (result => {
                bcrypt.compare(req.body.password, result[0].password)
                    .then(bresult => {
                        console.log(typeof result[0])
                        let token = jwt.sign(JSON.stringify(result[0]),process.env.JWT_SECRET_KEY)
                        res.json({
                            message : "succes",
                            token : token
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
                
            })
            .catch(err => {
                console.log(err)
            })
    }
}