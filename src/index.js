const express = require('express')
const Route = express.Router()

const company = require('./routes/company')
const job = require('./routes/job')

Route
    .use('/company', company)
    .use('/job', job)
module.exports = Route