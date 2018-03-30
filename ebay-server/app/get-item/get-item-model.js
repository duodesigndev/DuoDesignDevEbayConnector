
var conf = require('../config')
var parser = require('xml2json');
const https = require('https')

var bole = require('bole')
var log = bole('./get-item-model')

var xml = `
  <?xml version="1.0" encoding="utf-8"?>
  <GetItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">
    <RequesterCredentials>
      <eBayAuthToken>${conf.EBAY_API_TOKEN}</eBayAuthToken>
    </RequesterCredentials>
    <ItemID>110283558447</ItemID>
  </GetItemRequest>
`
/*
 * Use this call to retrieve the data for a single item listed on an eBay site. 
 * GetItem returns the data in an Item object. 
 * http://developer.ebay.com/devzone/xml/docs/Reference/eBay/GetItem.html
 * @param { Object } data // lists all fields that could be included in the call request
 * @param { Callback Function } callback(error, result)
 * 
 *  <?xml version="1.0" encoding="utf-8"?>
 *  <GetItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">
 *    <!-- Call-specific Input Fields -->
 *    <IncludeItemCompatibilityList> boolean </IncludeItemCompatibilityList>
 *    <IncludeItemSpecifics> boolean </IncludeItemSpecifics>
 *    <IncludeTaxTable> boolean </IncludeTaxTable>
 *    <IncludeWatchCount> boolean </IncludeWatchCount>
 *    <ItemID> ItemIDType (string) </ItemID>
 *    <SKU> SKUType (string) </SKU>
 *    <TransactionID> string </TransactionID>
 *    <VariationSKU> SKUType (string) </VariationSKU>
 *    <VariationSpecifics> NameValueListArrayType
 *      <NameValueList> NameValueListType
 *        <Name> string </Name>
 *        <Value> string </Value>
 *        <!-- ... more Value values allowed here ... -->
 *      </NameValueList>
 *      <!-- ... more NameValueList nodes allowed here ... -->
 *    </VariationSpecifics>
 *    <!-- Standard Input Fields -->
 *    <DetailLevel> DetailLevelCodeType </DetailLevel>
 *    <!-- ... more DetailLevel values allowed here ... -->
 *    <ErrorLanguage> string </ErrorLanguage>
 *    <MessageID> string </MessageID>
 *    <OutputSelector> string </OutputSelector>
 *    <!-- ... more OutputSelector values allowed here ... -->
 *    <Version> string </Version>
 *    <WarningLevel> WarningLevelCodeType </WarningLevel>
 *  </GetItemRequest>
 * 
 ************************************************  */
function getItem (data, callback) {

  const options = {
    protocol: 'https:',
    hostname: 'api.sandbox.ebay.com',
    port: 443,
    path: `/ws/api.dll`,
    method: 'POST',
    headers: {
      'X-EBAY-API-SITEID': 15,
      'X-EBAY-API-COMPATIBILITY-LEVEL': 967,
      'X-EBAY-API-CALL-NAME':'GetItem'
    }
  }
  
  const req = https.request(options, (res) => {
    let data = '';
    res.setEncoding('utf8');

    // A chunk of data has been recieved.
    res.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Log the result.
    res.on('end', () => {
      log.info(data)
      callback(null, parser.toJson(data, {object: true}))
    })
  })
  
  req.on('error', (e) => {
    callback(e.message, null)
  });
  
  // write data to request body
  req.write(xml || data);
  req.end();

}

exports.getItem = getItem

