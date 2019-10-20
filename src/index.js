const express = require('express')
const Route = express.Router()

const company = require('./routes/company')

Route
    .use('/company', company)

module.exports = Route