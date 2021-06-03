const express = require('express')
const { Pool, Client } = require('pg')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('API do Recyclo')
})


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

//   pool.query('SELECT NOW()', (err, res) => {
//     console.log(err, res) 
//     pool.end() 
//   })

// Rota usuarios
app.get('/users', (req, res) => {

  pool.query(`select firstname , lastname from persons where personid >2;`, (err, res) => {
    if (err) {
        console.log("Error - Failed to select all from Users");
        console.log(err);
    }
    else{
        console.log(res.rows);
        res.json(res);
    }
  });

});


app.listen(port, () => {
  console.log(`Servidor na porta http://localhost:${port}`)
})