const publicCallCreator = require('./calls/public-call');
const privateCallCreator = require('./calls/private-call');

const BASE_URL = 'https://api.bitflyer.com';

/**
 * Main library wrapper for Binance REST API.
 *
 * @param {string} apiKey API Key created from the user account.
 * @param {string} apiSecret API Secret created from the user account.
 */
module.exports = function Binance(apiKey, apiSecret) {
  const publicCall = publicCallCreator(BASE_URL);
  const privateCall = privateCallCreator(BASE_URL, apiKey, apiSecret);

  return {

    /*
     * ==========================
     * PUBLIC ENDPOINTS
     * ==========================
     */

    /**
     * Get market list of instruments.
     *
     */
    getMarkets: function () {
      return publicCall('/v1/getmarkets', 'GET', {});
    },

    /**
     * Get order book depth for any instrument.
     *
     * @param {Object} params Params for getting order book depth for any instrument.
     */
    getBoard: function (params) {
      return publicCall('/v1/getboard', 'GET', params);
    },

    /**
     * Get ticker information for any instrument.
     *
     * @param {Object} params Params for getting ticker information for any instrument.
     */
    getTicker: function (params) {
      return publicCall('/v1/getticker', 'GET', params);
    },

    /**
     * Get trade execution history for any instrument.
     *
     * @param {Object} params Params for getting trade execution history for any instrument.
     */
    getExecutions: function (params) {
      return publicCall('/v1/getexecutions', 'GET', params);
    },

    /**
     * Get exchange operating status.
     *
     * @param {Object} params Params for getting exchange operating status.
     */
    getHealth: function (params) {
      return publicCall('/v1/gethealth', 'GET', params);
    },

    /**
     * Get chat conversations in exchange.
     *
     * @param {Object} params Params for getting chat conversations in exchange.
     */
    getChats: function (params) {
      return publicCall('/v1/getchats', 'GET', params);
    },
  }
}