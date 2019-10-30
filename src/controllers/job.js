const jobModels = require('../models/job')
const url = require('url')
const uuid4 = require('uuid/v4')
const redis = require('../helpers/redis')
const validator = require('../helpers/validation')
const queryString = require('querystring')

module.exports = {
  getJobs: async (req, res) => {
    /* get and set default value for orderby and order */
    let { orderby, order, page } = req.query

    orderby = validator.setDefaultValue(orderby, false, 'name' || 'date_updated' || 'category', 'date_updated')
    order = validator.setDefaultValue(order, false, 'ASC' || 'DESC', 'ASC')
    page = await validator.setDefaultValue(page, true, undefined, '1')

    /* get and set default value for search query(qname, qcompany) */
    let { qname, qcompany } = req.query

    if (qname === undefined) qname = '%'
    else qname = `%${qname}%`
    if (qcompany === undefined) qcompany = '%'
    else qcompany = `%${qcompany}%`
    // create redis key depends on the parameter
    const redisKey = req.url
    const host = req.hostname

    redis.client.get(redisKey, (error, result) => {
      if (error) {
        console.log(error)
      }
      if (result) {
        redis.client.get('/jobs/total_data', (err, total) => {
          if (err) {
            console.log(err)
            throw err
          } else if (total) {
            let totalPages = parseInt(total / 3)
            if (total % 3 > 0) { totalPages += 1 }
            result = JSON.parse(result)

            let nextPage = ''
            if (totalPages <= page) {
              nextPage = ''
            } else {
              let nextQueryData = { page: 1 }
              if (req.query.page) { nextQueryData = Object.assign({}, req.query) }
              nextQueryData.page = parseInt(nextQueryData.page) + 1
              nextPage = `${req.protocol}://${host}:${process.env.PORT}/job/?${queryString.stringify(nextQueryData)}`
            }

            let prevPage = ''
            if (page <= 1) {
              prevPage = ''
            } else {
              let prevQueryData = { page: 0 }
              if (req.query.page) { prevQueryData = Object.assign({}, req.query) }
              prevQueryData.page = parseInt(prevQueryData.page) - 1
              prevPage = `${req.protocol}://${host}:${process.env.PORT}/job/?${queryString.stringify(prevQueryData)}`
            }

            res.json({
              success: true,
              message: 'Data found',
              page,
              result,
              total_result: total,
              total_pages: totalPages,
              prev_page: prevPage,
              next_page: nextPage
            })
          }
        })
      } else {
        jobModels.getJobs(page, orderby, order, qname, qcompany)
          .then((result) => {
            jobModels.getTotalCountJobs(qname, qcompany)
              .then((totalJobs) => {
                redis.client.setex(redisKey, 3600, JSON.stringify(result))
                redis.client.setex('/jobs/total_data', 3600, String(totalJobs[0].total_data))

                let totalPages = parseInt(totalJobs[0].total_data / 3)
                if (totalJobs[0].total_data % 3 > 0) { totalPages += 1 }

                let nextPage = ''
                if (totalPages <= page) {
                  nextPage = ''
                } else {
                  let nextQueryData = { page: 1 }
                  if (req.query.page) { nextQueryData = Object.assign({}, req.query) }
                  nextQueryData.page = parseInt(nextQueryData.page) + 1
                  nextPage = `${req.protocol}://${host}:${process.env.PORT}/job/?${queryString.stringify(nextQueryData)}`
                }

                let prevPage = ''
                if (page <= 1) {
                  prevPage = ''
                } else {
                  let prevQueryData = { page: 0 }
                  if (req.query.page) { prevQueryData = Object.assign({}, req.query) }
                  prevQueryData.page = parseInt(prevQueryData.page) - 1
                  prevPage = `${req.protocol}://${host}:${process.env.PORT}/job/?${queryString.stringify(prevQueryData)}`
                }

                res.json({
                  success: true,
                  message: 'Data found',
                  page,
                  result,
                  total_result: totalJobs[0].total_data,
                  total_pages: totalPages,
                  prev_page: prevPage,
                  next_page: nextPage
                })
              })
              .catch((err) => {
                console.log(err)
              })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  },

  /**
  *method for redirecting endpoint{job/1, job/jobs/} to job/jobs/1
  */
  redirectFirstPage: (req, res) => {
    const data = req.query
    res.redirect(url.format({ pathname: '../../job/jobs/', query: data }))
  },

  // get single job
  getJob: (req, res) => {
    const { id } = req.params

    jobModels.getJob(id)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        console.log(err)
      })
  },

  addJob: (req, res) => {
    const data = req.body
    const date = new Date()
    data.id = uuid4()
    data.date_added = date
    data.date_updated = date

    /* Delete all job cache in redis because of job change */
    let keys
    redis.getKeys('/jobs/*')
      .then(result => {
        keys = result
        if (keys) {
          redis.client.del(keys)
        }
      })
      .catch(err => {
        console.log(err)
      })

    jobModels.addJob(data)
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

  updateJob: (req, res) => {
    const { id } = req.params
    const data = req.body
    const date = new Date()
    data.date_updated = date

    /* Delete all job cache in redis because of job change */
    let keys
    redis.getKeys('/jobs/*')
      .then(result => {
        keys = result
        if (keys) {
          redis.client.del(keys)
        }
      })
      .catch(err => {
        console.log(err)
      })

    jobModels.updateJob(id, data)
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

  deleteJob: (req, res) => {
    const { id } = req.params

    /* Delete all job cache in redis because of job change */
    // const keys = await redis.getKeys('/jobs/*')
    let keys
    redis.getKeys('/jobs/*')
      .then(result => {
        keys = result
        if (keys) {
          redis.client.del(keys)
        }
      })
      .catch(err => {
        console.log(err)
      })

    jobModels.deleteJob(id)
      .then((result) => {
        res.json({
          message: 'success',
          id
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  /* , searchJob: (req, res) => {
        let {qname, qcompany} = req.query
        if(qname === undefined) qname = '%'
        if(qcompany === undefined) qcompany = '%'

        jobModels.searchJob(qname, qcompany)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
    } */
}
