const express = require('express')
const bodyParser = require('body-parser')
const configs = require('./src/configs/configs')
const logger = require('morgan')
const cors = require('cors')

const app = express()
const port= configs.port
const routerNav = require('./src/index')

//Enable All CORS Requests
app.use(cors())

app.listen(port, () => {
    console.log(`\n Server listening on port ${port} \n`)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'))

app.use('/', routerNav)

module.exports = app