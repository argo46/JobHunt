const express = require('express')
const Route = express.Router()

const signupController = require('../controllers/signup')

Route
  .post('/', signupController.addUser)

module.exports = Route
