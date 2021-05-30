const mysql = require('mysql')

const pool = mysql.createPool(process.env.DATABASE_URL)

module.exports = pool
