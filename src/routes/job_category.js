const express = require('express')
const Route = express.Router()

const jobCategoryController = require('../controllers/job_category')

Route
  .get('/', jobCategoryController.getCategories)
  .get('/:id', jobCategoryController.getCategory)
  .post('/', jobCategoryController.addCategory)
  .patch('/:id', jobCategoryController.updateCategory)
  .delete('/:id', jobCategoryController.deleteCategory)

module.exports = Route
