const jobModels = require('../models/job')
const DATE_FORMATER = require( 'dateformat' );
const url = require('url');
const uuid4 = require('uuid/v4')

module.exports = {
    getJobs: (req, res) => {
        const {page} = req.params
        let {orderby, order} = req.query
        if(orderby === undefined) {
            orderby='date_updated'
        }
        if(order === undefined){
            order='ASC'
        }
        jobModels.getJobs(page, orderby, order)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
    },
    redirectFirstPage: (req,res) => {
        res.redirect(url.format({pathname:'../job/1',query:req.query}))
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
        data.id = uuid4()
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