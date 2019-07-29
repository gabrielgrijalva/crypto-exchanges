const privateCallCreator = require('./calls/private-call');

const BASE_URL = 'https://forex.1forge.com/1.0.3';

/**
 * Main library wrapper for OneForge REST API.
 *
 * @param {string} apiKey API Key created from the user account.
 */
module.exports = function OneForgerRest(apiKey) {
  const privateCall = privateCallCreator(BASE_URL, apiKey);

  return {
    /**
     * Gets market quotes from specific currencies.
     *
     * @param {Object} params Params for getting quotes for specific currency.
     */
    getQuotes: function (params) {
      return privateCall('/quotes', 'GET', params);
    },

    /**
     * Get list of all symbols pairs.
     *
     */
    getSymbols: function () {
      return privateCall('/symbols', 'GET', null);
    },

    /**
     * Converts from one currency value to another.
     *
     * @param {Object} params Params for converting from one currency to another.
     */
    getConvert: function (params) {
      return privateCall('/convert', 'GET', params);
    },

    /**
     * Gets current market status.
     *
     */
    getMarketStatus: function () {
      return privateCall('/market_status', 'GET', null);
    },

    /**
     * Checks your current account quota information.
     *
     */
    getQuota: function () {
      return privateCall('/quota', 'GET', null);
    },
  };
};
