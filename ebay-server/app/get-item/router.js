var eBay = require('./get-item-model')
var log = require('bole')('./get-item/router')
var router = require('express').Router()

function getItem(req, res) {
  var _itemData = req.body
  
  eBay.getItem(_itemData, (error, result) => {

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

router.get('/get-item', getItem)

module.exports = router

