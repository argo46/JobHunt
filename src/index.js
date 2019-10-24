const express = require('express')
const Route = express.Router()

const company = require('./routes/company')
const job = require('./routes/job')
const user = require('./routes/user')
const jobCategory = require('./routes/job_category')

Route
  .use('/company', company)
  .use('/job', job)
  .use('/user', user)
  .use('/category', jobCategory)

module.exports = Route
