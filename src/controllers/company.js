const companyModels = require('../models/company')
const uuid4 = require('uuid/v4')

module.exports = {
  getCompanies: (req, res) => {
    companyModels.getCompanies()
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getCompany: (req, res) => {
    const { id } = req.params
    companyModels.getCompany(id)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  addCompany: (req, res) => {
    const data = req.body
    data.id = uuid4()

    if (!req.file) {
      res.json({
        success: false,
        message: 'No company logo uploaded'
      })
    } else {
      const host = req.hostname
      req.file.filename = data.name + req.file.filename
      const filePath = req.protocol + '://' + host + ':3000' + '/' + req.file.path
      data.logo = filePath
    }

    companyModels.addCompany(data)
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
  updateCompany: (req, res) => {
    const { id } = req.params
    const data = req.body

    companyModels.updateCompany(id, data)
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
  deleteCompany: (req, res) => {
    const { id } = req.params

    companyModels.deleteCompany(id)
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
