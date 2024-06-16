// import express
const express = require('express')

// import CORS
const CORS = require('cors')

// import body-parser
const bodyParser = require('body-parser')

// init app
const app = express()

// use cors middle
app.use(CORS());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// define port
const port = 3000;

// routes
app.get('/', (req, res) => {
    res.send('Hello World')
})

// start server
app.listen(port, ()=> {
    console.log(`Server started on port ${port}`)
});