const express = require('express')
const Route = express.Router()

const jobController = require('../controllers/job')

Route
    .get('/', jobController.redirectFirstPage)
    .get('/jobs', jobController.redirectFirstPage)
    .get('/jobs/:page', jobController.getJobs)
    .get('/id/:id', jobController.getJob)
    .get('/search/', jobController.searchJob)
    .post('/', jobController.addJob)
    .patch('/:id', jobController.updateJob)
    .delete('/:id', jobController.deleteJob)

module.exports = Route