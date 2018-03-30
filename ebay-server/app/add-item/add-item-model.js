
var conf = require('../config')
const https = require('https')

var bole = require('bole')
var log = bole('./add-item-model')

var xml = `
<?xml version="1.0" encoding="utf-8"?>
<AddItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">
  <RequesterCredentials>
    <eBayAuthToken>${conf.EBAY_API_TOKEN}</eBayAuthToken>
  </RequesterCredentials>
	<ErrorLanguage>en_AU</ErrorLanguage>
	<WarningLevel>High</WarningLevel>
  <Item>
    <Title>Lucas Nascimento new book</Title>
    <Description>This is the first book in the Harry Potter series. In excellent condition!</Description>
    <PrimaryCategory>
      <CategoryID>377</CategoryID>
    </PrimaryCategory>
    <StartPrice>5.0</StartPrice>
    <CategoryMappingAllowed>true</CategoryMappingAllowed>
    <Country>AU</Country>
    <Currency>AUD</Currency>
    <ConditionID>1000</ConditionID>
    <DispatchTimeMax>3</DispatchTimeMax>
    <ListingDuration>Days_7</ListingDuration>
    <ListingType>Chinese</ListingType>
    <PaymentMethods>PayPal</PaymentMethods>
    <!--Enter your Paypal email address-->
    <PayPalEmailAddress>csalucasnascimento-facilitator@gmail.com</PayPalEmailAddress>
    <PictureDetails>
      <PictureURL>http://pics.ebay.com/aw/pics/dot_clear.gif</PictureURL>
    </PictureDetails>
    <PostalCode>2020</PostalCode>
    <Quantity>1</Quantity>
    <ReturnPolicy>
      <ReturnsAcceptedOption>ReturnsAccepted</ReturnsAcceptedOption>
      <RefundOption>MoneyBack</RefundOption>
      <ReturnsWithinOption>Days_30</ReturnsWithinOption>
      <Description>If you are not satisfied, return the book for refund.</Description>
      <ShippingCostPaidByOption>Buyer</ShippingCostPaidByOption>
    </ReturnPolicy>
    <ShippingDetails>
      <ShippingType>Flat</ShippingType>
      <ShippingServiceOptions>
        <ShippingServicePriority>1</ShippingServicePriority>
        <ShippingService>AU_Regular</ShippingService>
        <ShippingServiceCost>2.50</ShippingServiceCost>
      </ShippingServiceOptions>
    </ShippingDetails>
    <Site>Australia</Site>
      <!-- If the seller is subscribed to Business Policies, use the <SellerProfiles> Container
		     instead of the <ShippingDetails>, <PaymentMethods> and <ReturnPolicy> containers. 
         For help, see the API Reference for Business Policies:
		     http://developer.ebay.com/Devzone/business-policies/CallRef/index.html -->
       <!--<SellerProfiles>
      		<SellerShippingProfile>
       			 <ShippingProfileID>5001287000</ShippingProfileID>
    		  	</SellerShippingProfile>
      		<SellerReturnProfile>
        			<ReturnProfileID>5001288000</ReturnProfileID>
      		</SellerReturnProfile>
      		<SellerPaymentProfile>
        			<PaymentProfileID>5001286000</PaymentProfileID>
      		</SellerPaymentProfile>
    </SellerProfiles> -->
 </Item>
</AddItemRequest>
`
/*
 * Use this call to retrieve the data for a single item listed on an eBay site. 
 * GetItem returns the data in an Item object. 
 * http://developer.ebay.com/devzone/xml/docs/Reference/eBay/GetItem.html
 * @param { Object } data // lists all fields that could be included in the call request
 * @param { Callback Function } callback(error, result)
 * 
 *  <?xml version="1.0" encoding="utf-8"?>
 *  <AddItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">
 *    <!-- Call-specific Input Fields -->
 *    <Item> ItemType
 *      <ApplicationData> string </ApplicationData>
 *      <AutoPay> boolean </AutoPay>
 *      <BestOfferDetails> BestOfferDetailsType
 *        <BestOfferEnabled> boolean </BestOfferEnabled>
 *      </BestOfferDetails>
 *      <BuyerRequirementDetails> BuyerRequirementDetailsType
 *        <LinkedPayPalAccount> boolean </LinkedPayPalAccount>
 *        <MaximumBuyerPolicyViolations> MaximumBuyerPolicyViolationsType
 *          <Count> int </Count>
 *          <Period> PeriodCodeType </Period>
 *        </MaximumBuyerPolicyViolations>
 *        <MaximumItemRequirements> MaximumItemRequirementsType
 *          <MaximumItemCount> int </MaximumItemCount>
 *          <MinimumFeedbackScore> int </MinimumFeedbackScore>
 *        </MaximumItemRequirements>
 *        <MaximumUnpaidItemStrikesInfo> MaximumUnpaidItemStrikesInfoType
 *          <Count> int </Count>
 *          <Period> PeriodCodeType </Period>
 *        </MaximumUnpaidItemStrikesInfo>
 *        <MinimumFeedbackScore> int </MinimumFeedbackScore>
 *        <ShipToRegistrationCountry> boolean </ShipToRegistrationCountry>
 *        <VerifiedUserRequirements> VerifiedUserRequirementsType
 *          <MinimumFeedbackScore> int </MinimumFeedbackScore>
 *          <VerifiedUser> boolean </VerifiedUser>
 *        </VerifiedUserRequirements>
 *        <ZeroFeedbackScore> boolean </ZeroFeedbackScore>
 *      </BuyerRequirementDetails>
 *      <BuyerResponsibleForShipping> boolean </BuyerResponsibleForShipping>
 *      <BuyItNowPrice currencyID="CurrencyCodeType"> AmountType (double) </BuyItNowPrice>
 *      <CategoryBasedAttributesPrefill> boolean </CategoryBasedAttributesPrefill>
 *      <CategoryMappingAllowed> boolean </CategoryMappingAllowed>
 *      <Charity> CharityType
 *        <CharityID> string </CharityID>
 *        <CharityNumber> int </CharityNumber>
 *        <DonationPercent> float </DonationPercent>
 *      </Charity>
 *      <ConditionDescription> string </ConditionDescription>
 *      <ConditionID> int </ConditionID>
 *      <Country> CountryCodeType </Country>
 *      <CrossBorderTrade> string </CrossBorderTrade>
 *      <!-- ... more CrossBorderTrade values allowed here ... -->
 *      <Currency> CurrencyCodeType </Currency>
 *      <Description> string </Description>
 *      <DigitalGoodInfo> DigitalGoodInfoType
 *        <DigitalDelivery> boolean </DigitalDelivery>
 *      </DigitalGoodInfo>
 *      <DisableBuyerRequirements> boolean </DisableBuyerRequirements>
 *      <DiscountPriceInfo> DiscountPriceInfoType
 *        <MadeForOutletComparisonPrice currencyID="CurrencyCodeType"> AmountType (double) </MadeForOutletComparisonPrice>
 *        <MinimumAdvertisedPrice currencyID="CurrencyCodeType"> AmountType (double) </MinimumAdvertisedPrice>
 *        <MinimumAdvertisedPriceExposure> MinimumAdvertisedPriceExposureCodeType </MinimumAdvertisedPriceExposure>
 *        <OriginalRetailPrice currencyID="CurrencyCodeType"> AmountType (double) </OriginalRetailPrice>
 *        <SoldOffeBay> boolean </SoldOffeBay>
 *        <SoldOneBay> boolean </SoldOneBay>
 *      </DiscountPriceInfo>
 *      <DispatchTimeMax> int </DispatchTimeMax>
 *      <eBayNowEligible> boolean </eBayNowEligible>
 *      <eBayPlus> boolean </eBayPlus>
 *      <ExtendedSellerContactDetails> ExtendedContactDetailsType
 *        <ClassifiedAdContactByEmailEnabled> boolean </ClassifiedAdContactByEmailEnabled>
 *        <ContactHoursDetails> ContactHoursDetailsType
 *          <Hours1AnyTime> boolean </Hours1AnyTime>
 *          <Hours1Days> DaysCodeType </Hours1Days>
 *          <Hours1From> time </Hours1From>
 *          <Hours1To> time </Hours1To>
 *          <Hours2AnyTime> boolean </Hours2AnyTime>
 *          <Hours2Days> DaysCodeType </Hours2Days>
 *          <Hours2From> time </Hours2From>
 *          <Hours2To> time </Hours2To>
 *          <TimeZoneID> string </TimeZoneID>
 *        </ContactHoursDetails>
 *      </ExtendedSellerContactDetails>
 *      <HitCounter> HitCounterCodeType </HitCounter>
 *      <IncludeRecommendations> boolean </IncludeRecommendations>
 *      <ItemCompatibilityList> ItemCompatibilityListType
 *        <Compatibility> ItemCompatibilityType
 *          <CompatibilityNotes> string </CompatibilityNotes>
 *          <NameValueList> NameValueListType
 *            <Name> string </Name>
 *            <Value> string </Value>
 *            <!-- ... more Value values allowed here ... -->
 *          </NameValueList>
 *          <!-- ... more NameValueList nodes allowed here ... -->
 *        </Compatibility>
 *        <!-- ... more Compatibility nodes allowed here ... -->
 *      </ItemCompatibilityList>
 *      <ItemSpecifics> NameValueListArrayType
 *        <NameValueList> NameValueListType
 *          <Name> string </Name>
 *          <Value> string </Value>
 *          <!-- ... more Value values allowed here ... -->
 *        </NameValueList>
 *        <!-- ... more NameValueList nodes allowed here ... -->
 *      </ItemSpecifics>
 *      <ListingDesigner> ListingDesignerType
 *        <LayoutID> int </LayoutID>
 *        <OptimalPictureSize> boolean </OptimalPictureSize>
 *        <ThemeID> int </ThemeID>
 *      </ListingDesigner>
 *      <ListingDetails> ListingDetailsType
 *        <BestOfferAutoAcceptPrice currencyID="CurrencyCodeType"> AmountType (double) </BestOfferAutoAcceptPrice>
 *        <LocalListingDistance> string </LocalListingDistance>
 *        <MinimumBestOfferPrice currencyID="CurrencyCodeType"> AmountType (double) </MinimumBestOfferPrice>
 *      </ListingDetails>
 *      <ListingDuration> token </ListingDuration>
 *      <ListingEnhancement> ListingEnhancementsCodeType </ListingEnhancement>
 *      <!-- ... more ListingEnhancement values allowed here ... -->
 *      <ListingSubtype2> ListingSubtypeCodeType </ListingSubtype2>
 *      <ListingType> ListingTypeCodeType </ListingType>
 *      <LiveAuction> boolean </LiveAuction>
 *      <Location> string </Location>
 *      <LotSize> int </LotSize>
 *      <MotorsGermanySearchable> boolean </MotorsGermanySearchable>
 *      <PaymentDetails> PaymentDetailsType
 *        <DaysToFullPayment> int </DaysToFullPayment>
 *        <DepositAmount currencyID="CurrencyCodeType"> AmountType (double) </DepositAmount>
 *        <DepositType> DepositTypeCodeType </DepositType>
 *        <HoursToDeposit> int </HoursToDeposit>
 *      </PaymentDetails>
 *      <PaymentMethods> BuyerPaymentMethodCodeType </PaymentMethods>
 *      <!-- ... more PaymentMethods values allowed here ... -->
 *      <PayPalEmailAddress> string </PayPalEmailAddress>
 *      <PickupInStoreDetails> PickupInStoreDetailsType
 *        <EligibleForPickupDropOff> boolean </EligibleForPickupDropOff>
 *        <EligibleForPickupInStore> boolean </EligibleForPickupInStore>
 *      </PickupInStoreDetails>
 *      <PictureDetails> PictureDetailsType
 *        <GalleryDuration> token </GalleryDuration>
 *        <GalleryType> GalleryTypeCodeType </GalleryType>
 *        <PhotoDisplay> PhotoDisplayCodeType </PhotoDisplay>
 *        <PictureURL> anyURI </PictureURL>
 *        <!-- ... more PictureURL values allowed here ... -->
 *      </PictureDetails>
 *      <PostalCode> string </PostalCode>
 *      <PrimaryCategory> CategoryType
 *        <CategoryID> string </CategoryID>
 *      </PrimaryCategory>
 *      <ProductListingDetails> ProductListingDetailsType
 *        <BrandMPN> BrandMPNType
 *          <Brand> string </Brand>
 *          <MPN> string </MPN>
 *        </BrandMPN>
 *        <EAN> string </EAN>
 *        <IncludeeBayProductDetails> boolean </IncludeeBayProductDetails>
 *        <IncludeStockPhotoURL> boolean </IncludeStockPhotoURL>
 *        <ISBN> string </ISBN>
 *        <ProductReferenceID> string </ProductReferenceID>
 *        <ReturnSearchResultOnDuplicates> boolean </ReturnSearchResultOnDuplicates>
 *        <TicketListingDetails> TicketListingDetailsType
 *          <EventTitle> string </EventTitle>
 *          <PrintedDate> string </PrintedDate>
 *          <PrintedTime> string </PrintedTime>
 *          <Venue> string </Venue>
 *        </TicketListingDetails>
 *        <UPC> string </UPC>
 *        <UseFirstProduct> boolean </UseFirstProduct>
 *        <UseStockPhotoURLAsGallery> boolean </UseStockPhotoURLAsGallery>
 *      </ProductListingDetails>
 *      <Quantity> int </Quantity>
 *      <QuantityInfo> QuantityInfoType
 *        <MinimumRemnantSet> int </MinimumRemnantSet>
 *      </QuantityInfo>
 *      <QuantityRestrictionPerBuyer> QuantityRestrictionPerBuyerInfoType
 *        <MaximumQuantity> int </MaximumQuantity>
 *      </QuantityRestrictionPerBuyer>
 *      <ReservePrice currencyID="CurrencyCodeType"> AmountType (double) </ReservePrice>
 *      <ReturnPolicy> ReturnPolicyType
 *        <Description> string </Description>
 *        <ExtendedHolidayReturns> boolean </ExtendedHolidayReturns>
 *        <RefundOption> token </RefundOption>
 *        <RestockingFeeValueOption> token </RestockingFeeValueOption>
 *        <ReturnsAcceptedOption> token </ReturnsAcceptedOption>
 *        <ReturnsWithinOption> token </ReturnsWithinOption>
 *        <ShippingCostPaidByOption> token </ShippingCostPaidByOption>
 *        <WarrantyDurationOption> token </WarrantyDurationOption>
 *        <WarrantyOfferedOption> token </WarrantyOfferedOption>
 *        <WarrantyTypeOption> token </WarrantyTypeOption>
 *      </ReturnPolicy>
 *      <ScheduleTime> dateTime </ScheduleTime>
 *      <SecondaryCategory> CategoryType
 *        <CategoryID> string </CategoryID>
 *      </SecondaryCategory>
 *      <Seller> UserType
 *        <MotorsDealer> boolean </MotorsDealer>
 *      </Seller>
 *      <SellerContactDetails> AddressType
 *        <CompanyName> string </CompanyName>
 *        <County> string </County>
 *        <Phone2AreaOrCityCode> string </Phone2AreaOrCityCode>
 *        <Phone2CountryCode> CountryCodeType </Phone2CountryCode>
 *        <Phone2LocalNumber> string </Phone2LocalNumber>
 *        <PhoneAreaOrCityCode> string </PhoneAreaOrCityCode>
 *        <PhoneCountryCode> CountryCodeType </PhoneCountryCode>
 *        <PhoneLocalNumber> string </PhoneLocalNumber>
 *        <Street> string </Street>
 *        <Street2> string </Street2>
 *      </SellerContactDetails>
 *      <SellerProfiles> SellerProfilesType
 *        <SellerPaymentProfile> SellerPaymentProfileType
 *          <PaymentProfileID> long </PaymentProfileID>
 *          <PaymentProfileName> string </PaymentProfileName>
 *        </SellerPaymentProfile>
 *        <SellerReturnProfile> SellerReturnProfileType
 *          <ReturnProfileID> long </ReturnProfileID>
 *          <ReturnProfileName> string </ReturnProfileName>
 *        </SellerReturnProfile>
 *        <SellerShippingProfile> SellerShippingProfileType
 *          <ShippingProfileID> long </ShippingProfileID>
 *          <ShippingProfileName> string </ShippingProfileName>
 *        </SellerShippingProfile>
 *      </SellerProfiles>
 *      <SellerProvidedTitle> string </SellerProvidedTitle>
 *      <ShippingDetails> ShippingDetailsType
 *        <CalculatedShippingRate> CalculatedShippingRateType
 *          <InternationalPackagingHandlingCosts currencyID="CurrencyCodeType"> AmountType (double) </InternationalPackagingHandlingCosts>
 *          <MeasurementUnit> MeasurementSystemCodeType </MeasurementUnit>
 *          <OriginatingPostalCode> string </OriginatingPostalCode>
 *          <PackagingHandlingCosts currencyID="CurrencyCodeType"> AmountType (double) </PackagingHandlingCosts>
 *          <ShippingIrregular> boolean </ShippingIrregular>
 *        </CalculatedShippingRate>
 *        <CODCost currencyID="CurrencyCodeType"> AmountType (double) </CODCost>
 *        <ExcludeShipToLocation> string </ExcludeShipToLocation>
 *        <!-- ... more ExcludeShipToLocation values allowed here ... -->
 *        <GlobalShipping> boolean </GlobalShipping>
 *        <InternationalPromotionalShippingDiscount> boolean </InternationalPromotionalShippingDiscount>
 *        <InternationalShippingDiscountProfileID> string </InternationalShippingDiscountProfileID>
 *        <InternationalShippingServiceOption> InternationalShippingServiceOptionsType
 *          <ShippingService> token </ShippingService>
 *          <ShippingServiceAdditionalCost currencyID="CurrencyCodeType"> AmountType (double) </ShippingServiceAdditionalCost>
 *          <ShippingServiceCost currencyID="CurrencyCodeType"> AmountType (double) </ShippingServiceCost>
 *          <ShippingServicePriority> int </ShippingServicePriority>
 *          <ShipToLocation> string </ShipToLocation>
 *          <!-- ... more ShipToLocation values allowed here ... -->
 *        </InternationalShippingServiceOption>
 *        <!-- ... more InternationalShippingServiceOption nodes allowed here ... -->
 *        <PaymentInstructions> string </PaymentInstructions>
 *        <PromotionalShippingDiscount> boolean </PromotionalShippingDiscount>
 *        <RateTableDetails> RateTableDetailsType
 *          <DomesticRateTable> string </DomesticRateTable>
 *          <DomesticRateTableId> string </DomesticRateTableId>
 *          <InternationalRateTable> string </InternationalRateTable>
 *          <InternationalRateTableId> string </InternationalRateTableId>
 *        </RateTableDetails>
 *        <SalesTax> SalesTaxType
 *          <SalesTaxPercent> float </SalesTaxPercent>
 *          <SalesTaxState> string </SalesTaxState>
 *          <ShippingIncludedInTax> boolean </ShippingIncludedInTax>
 *        </SalesTax>
 *        <ShippingDiscountProfileID> string </ShippingDiscountProfileID>
 *        <ShippingServiceOptions> ShippingServiceOptionsType
 *          <FreeShipping> boolean </FreeShipping>
 *          <ShippingService> token </ShippingService>
 *          <ShippingServiceAdditionalCost currencyID="CurrencyCodeType"> AmountType (double) </ShippingServiceAdditionalCost>
 *          <ShippingServiceCost currencyID="CurrencyCodeType"> AmountType (double) </ShippingServiceCost>
 *          <ShippingServicePriority> int </ShippingServicePriority>
 *          <ShippingSurcharge currencyID="CurrencyCodeType"> AmountType (double) </ShippingSurcharge>
 *        </ShippingServiceOptions>
 *        <!-- ... more ShippingServiceOptions nodes allowed here ... -->
 *        <ShippingType> ShippingTypeCodeType </ShippingType>
 *      </ShippingDetails>
 *      <ShippingPackageDetails> ShipPackageDetailsType
 *        <MeasurementUnit> MeasurementSystemCodeType </MeasurementUnit>
 *        <PackageDepth unit="token" measurementSystem="MeasurementSystemCodeType"> MeasureType (decimal) </PackageDepth>
 *        <PackageLength unit="token" measurementSystem="MeasurementSystemCodeType"> MeasureType (decimal) </PackageLength>
 *        <PackageWidth unit="token" measurementSystem="MeasurementSystemCodeType"> MeasureType (decimal) </PackageWidth>
 *        <ShippingIrregular> boolean </ShippingIrregular>
 *        <ShippingPackage> ShippingPackageCodeType </ShippingPackage>
 *        <WeightMajor unit="token" measurementSystem="MeasurementSystemCodeType"> MeasureType (decimal) </WeightMajor>
 *        <WeightMinor unit="token" measurementSystem="MeasurementSystemCodeType"> MeasureType (decimal) </WeightMinor>
 *      </ShippingPackageDetails>
 *      <ShippingServiceCostOverrideList> ShippingServiceCostOverrideListType
 *        <ShippingServiceCostOverride> ShippingServiceCostOverrideType
 *          <ShippingServiceAdditionalCost currencyID="CurrencyCodeType"> AmountType (double) </ShippingServiceAdditionalCost>
 *          <ShippingServiceCost currencyID="CurrencyCodeType"> AmountType (double) </ShippingServiceCost>
 *          <ShippingServicePriority> int </ShippingServicePriority>
 *          <ShippingServiceType> ShippingServiceType </ShippingServiceType>
 *          <ShippingSurcharge currencyID="CurrencyCodeType"> AmountType (double) </ShippingSurcharge>
 *        </ShippingServiceCostOverride>
 *        <!-- ... more ShippingServiceCostOverride nodes allowed here ... -->
 *      </ShippingServiceCostOverrideList>
 *      <ShippingTermsInDescription> boolean </ShippingTermsInDescription>
 *      <ShipToLocations> string </ShipToLocations>
 *      <!-- ... more ShipToLocations values allowed here ... -->
 *      <Site> SiteCodeType </Site>
 *      <SKU> SKUType (string) </SKU>
 *      <StartPrice currencyID="CurrencyCodeType"> AmountType (double) </StartPrice>
 *      <Storefront> StorefrontType
 *        <StoreCategory2ID> long </StoreCategory2ID>
 *        <StoreCategory2Name> string </StoreCategory2Name>
 *        <StoreCategoryID> long </StoreCategoryID>
 *        <StoreCategoryName> string </StoreCategoryName>
 *      </Storefront>
 *      <SubTitle> string </SubTitle>
 *      <TaxCategory> string </TaxCategory>
 *      <Title> string </Title>
 *      <UseTaxTable> boolean </UseTaxTable>
 *      <UUID> UUIDType (string) </UUID>
 *      <VATDetails> VATDetailsType
 *        <BusinessSeller> boolean </BusinessSeller>
 *        <RestrictedToBusiness> boolean </RestrictedToBusiness>
 *        <VATPercent> float </VATPercent>
 *      </VATDetails>
 *      <VIN> string </VIN>
 *      <VRM> string </VRM>
 *    </Item>
 *    <!-- Standard Input Fields -->
 *    <ErrorHandling> ErrorHandlingCodeType </ErrorHandling>
 *    <ErrorLanguage> string </ErrorLanguage>
 *    <MessageID> string </MessageID>
 *    <Version> string </Version>
 *    <WarningLevel> WarningLevelCodeType </WarningLevel>
 *  </AddItemRequest>
 * 
 ************************************************  */
function addItem (data, callback) {

  const options = {
    protocol: 'https:',
    hostname: 'api.sandbox.ebay.com',
    port: 443,
    path: `/ws/api.dll`,
    method: 'POST',
    headers: {
      'X-EBAY-API-CALL-NAME':'AddItem',
      'X-EBAY-API-COMPATIBILITY-LEVEL': 967,
      'X-EBAY-API-SITEID': 15,
      'X-EBAY-API-APP-NAME': conf.EBAY_APP_ID,
      'X-EBAY-API-CERT-NAME': conf.EBAY_CERT_ID,
      'X-EBAY-API-DEV-NAME': conf.EBAY_DEV_ID
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

exports.addItem = addItem

