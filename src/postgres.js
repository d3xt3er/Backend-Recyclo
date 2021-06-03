const { Pool, Client } = require('pg')

const pool = new Pool({
    user: 'zozpujqxeubpha',
      host: 'ec2-54-197-100-79.compute-1.amazonaws.com',
      database: 'dct8nq053j6k6d',
      password: 'a61992ba0d8f928b5f77c6b69943eb716ff3de0bc8188675a76c84727a44fa9f',
      port: 5432,
      ssl: {
              rejectUnauthorized: false
          }
    })

module.exports = pool;