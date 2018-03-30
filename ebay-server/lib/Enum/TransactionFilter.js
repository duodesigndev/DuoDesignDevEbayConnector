'use strict';

/**
 * Transaction Filter Enum.
 */

/**
 * @readonly
 * @enum {String}
 */
var TransactionFilter = {

  /**
   * @type {String}
   */
  ACCESS_CODE: 'AccessCode',

  TRANSACTION_ID: 'TransactionID',

  INVOICE_REFERENCE: 'InvoiceReference',

  INVOICE_NUMBERMATCH_TYPE: 'InvoiceNumberMatchType',

  INVOICE_NUMBER: 'InvoiceNumber'

};

Object.freeze(TransactionFilter);

module.exports = TransactionFilter;
