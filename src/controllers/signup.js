const signupModels = require('../models/signup')
const uuid4 = require('uuid/v4')
const bcrypt = require('../helpers/bcrypt')

module.exports = {
    
    //add user async/await for waiting password been hashed
    addUser: async (req,res) => {
        const data = req.body
        data.id = uuid4()

        await bcrypt(data.password)
            .then(result => {
                data.password = result
            })
            .catch(err => {
                console.log(err)
            })

        signupModels.addUser(data)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
    }
}