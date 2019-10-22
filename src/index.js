const express = require('express')
const Route = express.Router()

const company = require('./routes/company')
const job = require('./routes/job')
const signup = require('./routes/signup')

Route
    .use('/company', company)
    .use('/job', job)
    .use('/signup', signup)
module.exports = Route