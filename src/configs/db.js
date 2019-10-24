// Setup DB
const mysql = require('mysql')
const config = require('./configs')

const connection = mysql.createConnection(config.database.mysql)

connection.connect((err) => {
  if (err) {
    console.log(`DB Error: ${err}`)
  } else {
    console.log('\n DB Connected \n')
  }
})

module.exports = connection
