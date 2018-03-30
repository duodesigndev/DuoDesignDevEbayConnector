
var conf = require('../config')
const https = require('https')

var bole = require('bole')
var log = bole('./get-categories-model')

var xml = `
  <?xml version="1.0" encoding="utf-8"?>
  <GetCategoriesRequest xmlns="urn:ebay:apis:eBLBaseComponents">
    <RequesterCredentials>
      <eBayAuthToken>${conf.EBAY_API_TOKEN}</eBayAuthToken>
    </RequesterCredentials>
    <ErrorLanguage>en_AU</ErrorLanguage>
    <WarningLevel>High</WarningLevel>
    <DetailLevel>ReturnAll</DetailLevel>
    <ViewAllNodes>true</ViewAllNodes>
    <LevelLimit>1</LevelLimit>
  </GetCategoriesRequest>
`
/*
 * Use this call to retrieve the latest category hierarchy for the eBay site specified in the CategorySiteID property. 
 * By default, this is the site to which you submit the request. 
 * You can retrieve all categories on the site, or you can use CategoryParent to retrieve one particular category and its subcategories. 
 * The returned category list is contained in the CategoryArray property.
 * http://developer.ebay.com/devzone/XML/docs/Reference/eBay/GetCategories.html
 * @param { Object } data // lists all fields that could be included in the call request
 * @param { Callback Function } callback(error, result)
 * 
 *  <?xml version="1.0" encoding="utf-8"?>
 *  <GetCategoriesRequest xmlns="urn:ebay:apis:eBLBaseComponents">
 *    <!-- Call-specific Input Fields -->
 *    <CategoryParent> string </CategoryParent>
 *    <!-- ... more CategoryParent values allowed here ... -->
 *    <CategorySiteID> string </CategorySiteID>
 *    <LevelLimit> int </LevelLimit>
 *    <ViewAllNodes> boolean </ViewAllNodes>
 *    <!-- Standard Input Fields -->
 *    <DetailLevel> DetailLevelCodeType </DetailLevel>
 *    <!-- ... more DetailLevel values allowed here ... -->
 *    <ErrorLanguage> string </ErrorLanguage>
 *    <MessageID> string </MessageID>
 *    <OutputSelector> string </OutputSelector>
 *    <!-- ... more OutputSelector values allowed here ... -->
 *    <Version> string </Version>
 *    <WarningLevel> WarningLevelCodeType </WarningLevel>
 *  </GetCategoriesRequest>
 * 
 ************************************************  */
function getCategories (data, callback) {

  const options = {
    protocol: 'https:',
    hostname: 'api.sandbox.ebay.com',
    port: 443,
    path: `/ws/api.dll`,
    method: 'POST',
    headers: {
      'X-EBAY-API-SITEID': 15,
      'X-EBAY-API-COMPATIBILITY-LEVEL': 967,
      'X-EBAY-API-CALL-NAME':'GetCategories'
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
      callback(null, data)
    })
  })
  
  req.on('error', (e) => {
    callback(e.message, null)
  });
  
  // write data to request body
  req.write(xml || data);
  req.end();

}

exports.getCategories = getCategories

