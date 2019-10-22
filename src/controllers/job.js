const jobModels = require('../models/job')
const url = require('url');
const uuid4 = require('uuid/v4')

// TODO : add validation to variable for error handling

module.exports = {
    getJobs: (req, res) => {
        const {page} = req.params
        
        /* get and set default value for orderby and order */
        let {orderby, order} = req.query
        if(orderby === undefined) orderby='date_updated'
        if(order === undefined) order='ASC'

        /* get and set default value for search query(qname, qcompany) */
        let {qname, qcompany} = req.query
        
        if(qname === undefined) qname = '%'
            else qname = `%${qname}%`
        if(qcompany === undefined) qcompany = '%'
            else qcompany = `%${qcompany}%`

        jobModels.getJobs(page, orderby, order, qname, qcompany)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
    },
    redirectFirstPage: (req,res) => {
        const data = req.query
        res.redirect(url.format({pathname:'../../job/jobs/1',query:data}))
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
        const date = new Date()
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
        const date = new Date()
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
    /*, searchJob: (req, res) => {
        let {qname, qcompany} = req.query
        if(qname === undefined) qname = '%'
        if(qcompany === undefined) qcompany = '%'

        jobModels.searchJob(qname, qcompany)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
    } */
}