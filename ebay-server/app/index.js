var fallback = require('express-history-api-fallback')
var bodyParser = require('body-parser')
// var querystring = require('querystring')
var request = require('request')

var conf = require('./config') // environment variables

// console.log(conf.EWAY_API_KEY)

var cors = require('cors')
var express = require('express')

var app = express()
// enable cors
// Note(TT): Need to use immediately after declaring `app = express()`
app.use(cors())
// app.set('views', __dirname)
var staticRoot = __dirname
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

// Gzip
const compression = require('compression')
app.use(compression())

// Load the routes
app.use('/api', require('./get-categories/router'))
app.use('/api', require('./get-item/router'))
app.use('/api', require('./add-item/router'))

// (TT) Lastly, error handling
app.use(require('./errors/not-found'))

var cacheTime = 86400000*40     // 40 days
app.use(express.static(__dirname,{ maxAge: cacheTime }))
app.use(express.static(staticRoot))

// (TT) Export the app instance for unit testing via supertest
module.exports = app



