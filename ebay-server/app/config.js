// (TT): load environment variables from .env
require('dotenv').config()

exports.PORT = process.env.EXPRESS_PORT || 8080
exports.IP = '127.0.0.1'

/* eBay settings
 ************************************************  */
exports.EBAY_APP_ID = process.env.EBAY_APP_ID || 'LucasNas-DuoDesig-SBX-0df74c2ae-36f1c6dc'
exports.EBAY_DEV_ID = process.env.EBAY_DEV_ID || '7707f98c-1811-4175-9057-beb4619e3b27'
exports.EBAY_CERT_ID = process.env.EBAY_CERT_ID || 'SBX-df74c2ae2414-cfd7-4f88-84d1-0a29'
exports.EBAY_API_TOKEN = process.env.EBAY_API_TOKEN || 'AgAAAA**AQAAAA**aAAAAA**NLqfWg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wFk4GoDJeDqA+dj6x9nY+seQ**G4IEAA**AAMAAA**/yrETOrGt8UjOckGRDG3to0EMWdrcp5V4Y6WoPnavaxelQkKsJ4rRmTIVL4jmnxCKp70ldDXycCnBaO2QRktWCZAxMc+g1ZP4W3/8J17XRjn9dWVHzq0UHsasPM6l6pPXRHGMphyZrLcWBnsGDLsCOQVaDSbyLOVahFq5yhQdkXtWzsbKkctlb+cKiU+f8tF2W6f8UoUkxaIca0jHTtam+BO8ooGncg7Zbt+uD+36ktlXd2kFsc7qSwE2BolFL0PxHPYPoLRxr5oB9ghiTT2o4dMfcKxhudlRJnpEuW2d+XXzfKckFzDhgcWdqhMUYzQiZRp7YXFr9RpJqtIoHfAa5axvP/uoiEVdzLruK3wc7HkgctGy3PN5ztseLqlF0xldXme9fmeQ7+ZI78dlT4JCOBdo5FoU7PuYWFi7MuRSih865Nf5NTbfTq61f96xmkPgOswlDdXiADunZePeHlnN0RTwNkxsr9zRxWcvA/W/R4JMAdaqdj9wcJHzD8F8y0e/nW6I+ueoDVrZ7G+uWIY7vuCA87piMW64I2/qZqBX1Po9Jrg+ORgDTpoYIK5efidoCN4B+zNfVStZelSTBdsWW+4wvNfN6PP7Y0bTkEh95LsbdTKg/C1G3JNivxJHGtZWm75jmHHWBkYhUGQStOLH2CWO7Hx1Yd4LEV3cWPbvdRowHt4o3p6DQAX3NoTj5Sb8ZngiIP6ThvDmutKSY8ebLShMxV6MbEd8bWlFgJ0Oh7oNpeMKILZDcUMzPgeupU6'

exports.SANDBOX = true

