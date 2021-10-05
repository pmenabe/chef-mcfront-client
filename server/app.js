'use strict'

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const CONFIG = require('../config')
const app = express()
const router = express.Router()
const port = CONFIG.CHEF_CLIENT.port || 3000

/**
 * Get port from environment and store in Express.
 */
app.set('port', port)

/**
 * Create HTTP server.
 */
var server = http.createServer(app)
server.listen(port)

// view engine setup
let pathViews = [] 

pathViews.push(path.join(__dirname, 'views'))

app.set('views', pathViews)
app.set('view engine', 'pug')

app.use(bodyParser.json({limit: '1mb'}))
app.use(bodyParser.urlencoded({limit: '1mb', extended: false }))

app.use(express.static('public'))

router.get('/*', function(req, res, next) {
  res.render('index', {
    title: "Chef Mc Front"
  })
})

app.use('/', router)

module.exports = app