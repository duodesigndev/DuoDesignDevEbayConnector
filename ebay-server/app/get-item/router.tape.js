var app = require('../test-app')
var test = require('tape')

// Bad request
test('POST /api/get-item should return response data JSON', function (assert) {
  var badRequest = `
  <?xml version="1.0" encoding="utf-8"?>
  <GetItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">
    <RequesterCredentials>
      <eBayAuthToken></eBayAuthToken>
    </RequesterCredentials>
    <ItemID>110043671232</ItemID>
  </GetItemRequest>
  `

  app.post('/api/get-item')
    .send(badRequest)
    .expect(500)
    .end(assert.end)
})

// Valid request
test('POST /api/get-item should return response data JSON', function (assert) {

  // TT. IMPORTANT! Make sure have a valid transactionID
  // Test with `curl` first
  var validRequest = `
  <?xml version="1.0" encoding="utf-8"?>
  <GetItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">
    <RequesterCredentials>
      <eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**NLqfWg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wFk4GoDJeDqA+dj6x9nY+seQ**G4IEAA**AAMAAA**/yrETOrGt8UjOckGRDG3to0EMWdrcp5V4Y6WoPnavaxelQkKsJ4rRmTIVL4jmnxCKp70ldDXycCnBaO2QRktWCZAxMc+g1ZP4W3/8J17XRjn9dWVHzq0UHsasPM6l6pPXRHGMphyZrLcWBnsGDLsCOQVaDSbyLOVahFq5yhQdkXtWzsbKkctlb+cKiU+f8tF2W6f8UoUkxaIca0jHTtam+BO8ooGncg7Zbt+uD+36ktlXd2kFsc7qSwE2BolFL0PxHPYPoLRxr5oB9ghiTT2o4dMfcKxhudlRJnpEuW2d+XXzfKckFzDhgcWdqhMUYzQiZRp7YXFr9RpJqtIoHfAa5axvP/uoiEVdzLruK3wc7HkgctGy3PN5ztseLqlF0xldXme9fmeQ7+ZI78dlT4JCOBdo5FoU7PuYWFi7MuRSih865Nf5NTbfTq61f96xmkPgOswlDdXiADunZePeHlnN0RTwNkxsr9zRxWcvA/W/R4JMAdaqdj9wcJHzD8F8y0e/nW6I+ueoDVrZ7G+uWIY7vuCA87piMW64I2/qZqBX1Po9Jrg+ORgDTpoYIK5efidoCN4B+zNfVStZelSTBdsWW+4wvNfN6PP7Y0bTkEh95LsbdTKg/C1G3JNivxJHGtZWm75jmHHWBkYhUGQStOLH2CWO7Hx1Yd4LEV3cWPbvdRowHt4o3p6DQAX3NoTj5Sb8ZngiIP6ThvDmutKSY8ebLShMxV6MbEd8bWlFgJ0Oh7oNpeMKILZDcUMzPgeupU6</eBayAuthToken>
    </RequesterCredentials>
    <ItemID>110043671232</ItemID>
  </GetItemRequest>
  `
  
  app.post('/api/get-item')
    .send(validRequest)
    .expect(200)
    .end(assert.end)
})
