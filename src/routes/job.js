const express = require('express')
const Route = express.Router()

const jobController = require('../controllers/job')

Route
    .get('/', jobController.redirectFirstPage)
    .get('/:page', jobController.getJobs)
    .get('/:id', jobController.getJob)
    .post('/', jobController.addJob)
    .patch('/:id', jobController.updateJob)
    .delete('/:id', jobController.deleteJob)

module.exports = Route