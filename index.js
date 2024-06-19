// import express
const express = require('express')

// import CORS
const CORS = require('cors')

// import body-parser
const bodyParser = require('body-parser')

// init app
const router = require('./routes')

// init app
const app = express()

// set timezone default
process.env.TZ = "Asia/Jakarta";

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
    const waktu = new Date().toString();
    res.send(waktu)

})

// define routes
app.use('/api', router);

console.log(new Date().toString());

// start server
app.listen(port, ()=> {
    console.log(`Server started on port ${port}`)
});