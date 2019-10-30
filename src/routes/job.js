const express = require('express')
const Route = express.Router()

const jobController = require('../controllers/job')

const passport = require('../helpers/passport')

const isAuthenticated = passport.authenticate('jwt', { session: false })

Route
  .get('/', jobController.redirectFirstPage)
  .get('/jobs', jobController.getJobs)
  // .get('/jobs/:page', jobController.getJobs)
  .get('/id/:id', jobController.getJob)
// .get('/search/', jobController.searchJob)
  .post('/', isAuthenticated, jobController.addJob)
  .patch('/:id', jobController.updateJob)
  .delete('/:id', jobController.deleteJob)

module.exports = Route
