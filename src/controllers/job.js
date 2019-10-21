const jobModels = require('../models/job')
const DATE_FORMATER = require( 'dateformat' );

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
        const date = DATE_FORMATER( Date.now(), "yyyy-mm-dd HH:MM:ss" );
        data.date_added = date
        data.date_updated = date

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
        const date = DATE_FORMATER( Date.now(), "yyyy-mm-dd HH:MM:ss" );
        data.date_updated = date

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