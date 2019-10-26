const jobModels = require('../models/job')
const url = require('url')
const uuid4 = require('uuid/v4')
const redis = require('../helpers/redis')

module.exports = {
  getJobs: (req, res) => {
    const { page } = req.params

    /* get and set default value for orderby and order */
    let { orderby, order } = req.query
    if (orderby === undefined) orderby = 'date_updated'
    if (order === undefined) order = 'ASC'

    /* get and set default value for search query(qname, qcompany) */
    let { qname, qcompany } = req.query

    if (qname === undefined) qname = '%'
    else qname = `%${qname}%`
    if (qcompany === undefined) qcompany = '%'
    else qcompany = `%${qcompany}%`
    // create redis key depends on the parameter
    const redisKey = req.url

    redis.client.get(redisKey, (error, result) => {
      if (error) {
        console.log(error)
        throw error
      } else if (result) {
        result = JSON.parse(result)
        res.json({
          page,
          result
        })
      } else {
        jobModels.getJobs(page, orderby, order, qname, qcompany)
          .then((result) => {
            redis.client.setex(redisKey, 3600, JSON.stringify(result))
            res.json({
              page,
              result
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
    res.redirect(url.format({ pathname: '../../job/jobs/1', query: data }))
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
        redis.client.del(keys)
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
        redis.client.del(keys)
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

  deleteJob: async (req, res) => {
    const { id } = req.params

    /* Delete all job cache in redis because of job change */
    // const keys = await redis.getKeys('/jobs/*')
    let keys
    redis.getKeys('/jobs/*')
      .then(result => {
        keys = result
        redis.client.del(keys)
      })
      .catch(err => {
        console.log(err)
      })

    jobModels.deleteJob(id)
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
