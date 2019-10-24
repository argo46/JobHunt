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

    companyModels.addCompany(data)
      .then(() => {
        res.json({
          message: 'succes',
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
          message: 'succes',
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
          message: 'succes',
          result
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
