# eWay nodejs/express server

A nodejs/express to handle payment between merchant database, client site, admin site and eWay payment gateway. 

## How to run server

```bash
git clone ...

# run server locally
cd eway-server
npm install
npm start

# run client locally
cd client
npm install
ng serve --open

# run test
npm test
```

## API

An instance of the server can be available at `https://intense-waters-58293.herokuapp.com`

### Create new transaction `api/new-transaction`

To initiate a new transaction and return URL to submit payment. 
It requires customer and order data but **NOT card information**

```bash
curl -XPOST -H 'Content-Type: application/json' \
-d '{
      "Customer": {
         "TokenCustomerID": "918527253686",
         "Reference": "A12345",
         "Title": "Mr.",
         "FirstName": "Nick",
         "LastName": "Spencer",
         "CompanyName": "Tapit Now",
         "JobDescription": "Developer",
         "Street1": "Level 5",
         "Street2": "1 King Street",
         "City": "Sydney",
         "State": "NSW",
         "PostalCode": "2000",
         "Country": "au",
         "Phone": "09 889 0986",
         "Mobile": "09 889 6542",
         "Email": "adam.smith@example.org",
         "Url": "http://www.ewaypayments.com"
      },
      "ShippingAddress": {
         "ShippingMethod": "NextDay",
         "FirstName": "John",
         "LastName": "Smith",
         "Street1": "Level 5",
         "Street2": "369 Queen Street",
         "City": "Sydney",
         "State": "NSW",
         "Country": "au",
         "PostalCode": "2000",
         "Phone": "09 889 0986"
      },
      "Items": [
       {
         "SKU": "12345678901234567890",
         "Description": "Item Description 1",
         "Quantity": 1,
         "UnitCost": 300,
         "Tax": 100,
         "Total": 400
       },
       {
         "SKU": "123456789012",
         "Description": "Item Description 2",
         "Quantity": 1,
         "UnitCost": 400,
         "Tax": 100,
         "Total": 500
       }
      ],
      "Options": [
       {
         "Value": "Option1"
       },
       {
         "Value": "Option2"
       }
      ],
      "Payment": {
         "TotalAmount": 900,
         "InvoiceNumber": "123456",
         "InvoiceDescription": "Individual Invoice Description",
         "InvoiceReference": "654321",
         "CurrencyCode": "AUD"
      },
      "RedirectUrl": "http://localhost:4200/checkout/outcome",
      "CancelUrl": "http://localhost:4200/checkout/outcome",
      "Method": "TokenPayment",
      "DeviceID": "D6789",
      "CustomerIP": "127.0.0.1",
      "PartnerID": "ID007",
      "TransactionType": "Purchase",
      "LogoUrl": "https://firebasestorage.googleapis.com/v0/b/spacenow-bca9c.appspot.com/o/eway-test%2FEFF-logo.png?alt=media&token=e8c033da-b3b9-4588-bf23-a86ca9ab8bd5",
      "HeaderText": "Eat Fit Food",
      "Language": "EN",
      "CustomerReadOnly": true,
      "CustomView": "bootstrap",
      "VerifyCustomerPhone": false,
      "VerifyCustomerEmail": false,
      "SaveCustomer": true
        }' \
"https://intense-waters-58293.herokuapp.com/api/new-transaction" 
```

## Refund `api/refunds`

It should be used at Admin Site ONLY to refund partially or totally amount based on Transaction ID. 

```bash
curl -XPOST -H 'Content-Type: application/json' \
-d '{
      "transactionID": "17614856",
      "totalAmount": "1"
}' \
"https://intense-waters-58293.herokuapp.com/api/refunds" 
```

## Token charge `api/token-charge`

It should be used at Admin Site ONLY to charge a customer if the customer has a token. When customer pay for the first time, a customer profile will create with a **tokenCustomerID** which will be used to look up for credit card information that customer has used. This tokenCustomerID should be saved to merchant database for admin use later. 

At Admin Site, we can look up for this tokenCustomerID and charge customer manually later for example for recurring bill or extra-charge, ...

To make `api/token-charge` request, it requires a tokenCustomerID and a amount to be charged. 

```bash
curl -H 'Content-Type: application/json' \
-d '{
      "tokenCustomerID": "918527253686",
      "totalAmount": "400"
}' \
"https://intense-waters-58293.herokuapp.com/api/token-charge" 
```
## Query token customer `api/query-token-customer`

It should be used at Admin Site ONLY to look up customer payment profile e.g. customer address, masked credit information, ...

It requires a tokenCustomerID. 

```bash
curl -H 'Content-Type: application/json' \
-d '{
      "tokenCustomerID": "918527253686"
}' \
"https://intense-waters-58293.herokuapp.com/api/query-token-customer" 
```

## Query transaction `api/transactions` 

It should be used at Admin Site ONLY to look up transaction(s) by different methods:
1. `AccessCode`
2. `TransactionID`
3. `InvoiceReference`
4. `InvoiceNumber`

Every request to `api/transactions` requires
* `queryFilter` to specify which *method* to be used for query
* `queryTerm` to provide corresponding data

### Query transaction by `AccessCode`

**IMPORTANT NOTE**: `AccessCode` just lasts for **01 week**, so it is mainly used to check instantly whether a customer has successfully submitted a payment before displaying *payment status* on client site. 

To verify that the transaction is successful, on the response data, `TransactionStatus` field should be TRUE. 

`TransactionID` on the response data should be saved to merchant database to look transaction up later as AccessCode just lasts for 1 week. 

```bash
curl -H 'Content-Type: application/json' \
-d '{
      "queryFilter": "AccessCode",
      "queryTerm": "60CF3JV5g-LM1yqaTSXC0MePvdkxWnOv2_v0jD0pCMXAo6cXm2ReDhI2WJ0A7D4IgXVvs6Ub02huGbwVOSJbXM1L4hfjg8319NYlBp3cE6WorpqEpa_6ZIM1uK0rEZNyJsUeISL8LO4POif5OeWT9xfs2Aw=="
}' \
"https://intense-waters-58293.herokuapp.com/api/transactions" 
```

### Query transaction by `TransactionID`

It should be used at Admin Site ONLY to look up detail of a transaction.  

```bash
curl -H 'Content-Type: application/json' \
-d '{
      "queryFilter": "TransactionID",
      "queryTerm": "17625343"
}' \
"https://intense-waters-58293.herokuapp.com/api/transactions" 
```

### Query transaction by `InvoiceReference`

**NOTE**: Make sure you create an **unique** invoice reference in a new transaction otherwise the server will response with an error of non-unique invoice reference. 

```bash
curl -H 'Content-Type: application/json' \
-d '{
      "queryFilter": "InvoiceReference",
      "queryTerm": "unique reference"
}' \
"https://intense-waters-58293.herokuapp.com/api/transactions" 
```

### Query transaction by `InvoiceNumber`

**NOTE**: Make sure you create an **unique** invoice number in a new transaction otherwise the server will response with an error of non-unique invoice number. 

```bash
curl -H 'Content-Type: application/json' \
-d '{
      "queryFilter": "InvoiceNumber",
      "queryTerm": "unique number"
}' \
"https://intense-waters-58293.herokuapp.com/api/transactions" 
```

