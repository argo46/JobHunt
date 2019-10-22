const express = require('express')
const Route = express.Router()

const loginController = require('../controllers/login')

Route
    .post('/', loginController.login)

module.exports = Route