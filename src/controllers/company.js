const companyModels = require('../models/company')

module.exports = {
    getCompanies: (req, res) => {
        companyModels.getCompanies()
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
    },
    getCompany: (req, res) => {
        const {id} = req.params
        companyModels.getCompany(id)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
    },
    addCompany: (req, res) => {
        const data = req.body

        companyModels.addCompany(data)
            .then(result => {
                res.json(data)
            })
            .catch(err => {
                console.log(err)
            })
    },
    updateCompany: (req, res) => {
        const {id} = req.params
        const data = req.body

        companyModels.updateCompany(id,data)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
    },
    deleteCompany: (req, res) => {
        const {id} = req.params

        companyModels.deleteCompany(id)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
    }
}