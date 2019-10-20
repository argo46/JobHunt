const jobModels = require('../models/job')

module.exports = {
    getJobs: (req, res) => {
        jobModels.getJobs()
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
    },
    getJob: (req, res) => {
        const {id} = req.params

        jobModels.getJob(id)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
    },
    addJob: (req, res) => {
        const data = req.body

        jobModels.addJob(data)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
    },
    updateJob: (req, res) => {
        const {id} = req.params
        const data = req.body

        jobModels.updateJob(id, data)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
    },
    deleteJob: (req, res) => {
        const {id} = req.params

        jobModels.deleteJob(id)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
    }
}