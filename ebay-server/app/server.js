#!/usr/bin/env node
var app = require('./index')
var config = require('./config')

// (TT) Logging system
var bole = require('bole')

bole.output({level: 'debug', stream: process.stdout})
var log = bole('server')

log.info('server process starting')

// (TT) server just connects all components and listens to serve
app.listen(config.PORT, config.IP, function (error) {
  if (error) {
    log.error('Unable to listen for connections', error)
    process.exit(10)
  }
  log.info('express is listening on http://' +
    config.IP + ':' + config.PORT)
})

