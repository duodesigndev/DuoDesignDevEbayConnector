function notFound (req, res) {
  res.status(404).send('Oops! NOT FOUND WHAT YOU WANT... We wish it exists BUT IT DOES NOT actually. :(' + '\n')
}

module.exports = notFound
