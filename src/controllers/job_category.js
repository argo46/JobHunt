const jobCategoryModels = require('../models/job_category')

module.exports = {
  getCategories: (req, res) => {
    jobCategoryModels.getCategories()
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        console.log(err)
      })
  },

  getCategory: (req, res) => {
    const { id } = req.params
    jobCategoryModels.getCategory(id)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        console.log(err)
      })
  },

  addCategory: (req, res) => {
    const data = req.body
    jobCategoryModels.addCategory(data)
      .then(() => {
        res.json({
          message: 'success',
          data
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },

  updateCategory: (req, res) => {
    const { id } = req.params
    const data = req.body

    jobCategoryModels.updateCategory(id, data)
      .then(() => {
        res.json({
          message: 'sucess',
          data
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },

  deleteCategory: (req, res) => {
    const { id } = req.params

    jobCategoryModels.deleteCategory(id)
      .then((result) => {
        res.json({
          message: 'success',
          result
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
