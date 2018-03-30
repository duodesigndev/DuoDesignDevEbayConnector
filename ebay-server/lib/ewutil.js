'use strict'

var rapid = require('eway-rapid')

/* 
 * queryTransactionHandler reveives handles response from eWay server
 *
 * @param { http response } response // from eWay server
 * @param { http response } res // original response to client request
 *
 * @return { http reponse } res // our server response to client request
 ************************************************ */
exports.queryTransactionWrapper = function(dat, callback) {
  if (dat.getErrors().length == 0) {
    var outcome = dat.get('Transactions[0]')
    // console.log(outcome)
    var result = {
      "transactionID": outcome.TransactionID,
      "transactionStatus": outcome.TransactionStatus,
      "transactionType": outcome.TransactionType,
      "totalAmount": outcome.TotalAmount,
      "customer": {
        "tokenCustomerID": outcome.Customer.TokenCustomerID,
        "reference": outcome.Customer.Reference,
        "title": outcome.Customer.Title,
        "firstName": outcome.Customer.FirstName,
        "lastName": outcome.Customer.LastName,
        "companyName": outcome.Customer.CompanyName,
        "jobDescription": outcome.Customer.JobDescription,
        "street1": outcome.Customer.Street1,
        "street2": outcome.Customer.Street2,
        "city": outcome.Customer.City,
        "state": outcome.Customer.State,
        "postalCode": outcome.Customer.PostalCode,
        "countryShort": outcome.Customer.Country,
        "email": outcome.Customer.Email,
        "phone": outcome.Customer.Phone,
        "mobile": outcome.Customer.Mobile
      },
      "shippingAddress": {
        "shippingMethod": outcome.ShippingAddress.ShippingMethod,
        "firstName": outcome.ShippingAddress.FirstName,
        "lastName": outcome.ShippingAddress.LastName,
        "companyName": outcome.ShippingAddress.CompanyName,
        "jobDescription": outcome.ShippingAddress.JobDescription,
        "street1": outcome.ShippingAddress.Street1,
        "street2": outcome.ShippingAddress.Street2,
        "city": outcome.ShippingAddress.City,
        "state": outcome.ShippingAddress.State,
        "postalCode": outcome.ShippingAddress.PostalCode,
        "countryShort": outcome.ShippingAddress.Country,
        "email": outcome.ShippingAddress.Email,
        "phone": outcome.ShippingAddress.Phone,
        "mobile": outcome.ShippingAddress.Mobile
      }
    }
    callback(null, result)
      
  } else {
    var errorMessage = ""
    dat.getErrors().forEach(function(error) {
      errorMessage = errorMessage + "; " + rapid.getMessage(error, "en")
    })

    callback(errorMessage, null)
  }
}

