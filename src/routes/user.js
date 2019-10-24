const express = require('express')
const Route = express.Router()

const userController = require('../controllers/user')

Route
  .post('/login', userController.login)
  .post('/signup', userController.addUser)

module.exports = Route
