function notFound (req, res) {
  res.status(404).render('errors/not-found')
}

//middleware: run in all requests
function routeMiddleWare(req, res, next) {
    console.warn(req.method + ' ' + req.url + ' with ' + JSON.stringify(req.body))
    next()
}

module.exports = {
  notFound: notFound,
  routeMiddleWare: routeMiddleWare
}
