var eBay = require('./get-categories-model')
var log = require('bole')('./get-categories/router')
var router = require('express').Router()

function getCategories(req, res) {
  var _categoriesData = req.body
  
  eBay.getCategories(_categoriesData, (error, result) => {

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

router.get('/get-categories', getCategories)

module.exports = router

