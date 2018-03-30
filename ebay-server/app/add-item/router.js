var eBay = require('./add-item-model')
var log = require('bole')('./add-item/router')
var router = require('express').Router()

function addItem(req, res) {
  var _itemData = req.body
  
  eBay.addItem(_itemData, (error, result) => {

    if(error) {
      res.status(500).send({
        error: error,
        data: result
      })
      return
    } else {
      log.info(result)
      res.status(200).send({
        error: null,
        data: result
      })
    }

  })
}

router.get('/add-item', addItem)

module.exports = router

