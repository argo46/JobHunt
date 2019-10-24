const express = require('express')
const Route = express.Router()

const company = require('./routes/company')
const job = require('./routes/job')
const signup = require('./routes/signup')
const login = require('./routes/login')

Route
  .use('/company', company)
  .use('/job', job)
  .use('/signup', signup)
  .use('/login', login)

module.exports = Route
