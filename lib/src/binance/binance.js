const keyCallCreator = require('./calls/key-call');
const publicCallCreator = require('./calls/public-call');
const privateCallCreator = require('./calls/private-call');

const BASE_URL = 'https://api.binance.com';

/**
 * Main library wrapper for Binance REST API.
 *
 * @param {string} apiKey API Key created from the user account.
 * @param {string} apiSecret API Secret created from the user account.
 */
module.exports = function Binance(apiKey, apiSecret) {
  const publicCall = publicCallCreator(BASE_URL);
  const keyCall = keyCallCreator(BASE_URL, apiKey, apiSecret);
  const privateCall = privateCallCreator(BASE_URL, apiKey, apiSecret);

  return {

    /*
     * ==========================
     * GENERAL ENDPOINTS
     * ==========================
     */

    /**
     * Send ping to test REST API.
     *
     */
    getPing: async function () {
      return publicCall('/api/v1/ping', 'GET', {});
    },

    /**
     * Get server time.
     *
     */
    getTime: async function () {
      return publicCall('/api/v1/time', 'GET', {});
    },

    /**
     * Get exchange information.
     *
     */
    getExchangeInfo: async function () {
      return publicCall('/api/v1/exchangeInfo', 'GET', {});
    },

    /*
     * ==========================
     * MARKET DATA ENDPOINTS
     * ==========================
     */

    /**
    * Get order book depth for any instrument.
    *
    * @param {Object} params Params for getting order depth for any instrument.
    */
    getDepth: async function (params) {
      return publicCall('/api/v1/depth', 'GET', params);
    },

    /**
     * Get recent trades for any instrument.
     *
     * @param {Object} params Params for getting recent trades for any instrument.
     */
    getTrades: async function (params) {
      return publicCall('/api/v1/trades', 'GET', params);
    },

    /**
     * Get historical trades for any instrument.
     *
     * @param {Object} params Params for getting historical trades for any instrument.
     */
    getHistoricalTrades: async function (params) {
      return keyCall('/api/v1/historicalTrades', 'GET', params);
    },

    /**
     * Get compressed/aggregated trades for any instrument.
     *
     * @param {Object} params Params for getting compressed/aggregated trades for any instrument.
     */
    getAggTrades: async function (params) {
      return publicCall('/api/v1/aggTrades', 'GET', params);
    },

    /**
     * Get candles for any instrument.
     *
     * @param {Object} params Params for getting candles for any instrument.
     */
    getKlines: async function (params) {
      return publicCall('/api/v1/klines', 'GET', params);
    },

    /**
     * Get average price for any instrument.
     *
     * @param {Object} params Params for getting average price for any instrument.
     */
    getAvgPrice: async function (params) {
      return publicCall('/api/v3/avgPrice', 'GET', params);
    },

    /**
     * Get price change statistics/information for any instrument.
     *
     * @param {Object} params Params for getting price change statistics/information for any instrument.
     */
    getTicker24Hr: async function (params) {
      return publicCall('/api/v1/ticker/24hr', 'GET', params);
    },

    /**
     * Get lastest price for any instrument.
     *
     * @param {Object} params Params for getting the lastest price for any instrument.
     */
    getTickerPrice: async function (params) {
      return publicCall('/api/v3/ticker/price', 'GET', params);
    },

    /**
     * Get best price and quantity on the order book for any instrument.
     *
     * @param {Object} params Params for getting the best price and quantity on the order book for any instrument.
     */
    getTickerBookTicker: async function (params) {
      return publicCall('/api/v3/ticker/bookTicker', 'GET', params);
    },

    /*
     * ==========================
     * ACCOUNT ENDPOINTS
     * ==========================
     */

    /**
     * Create new order for any instrument.
     *
     * @param {Object} params Params for creating new order for any instrument.
     */
    postOrder: async function (params) {
      return privateCall('/api/v3/order', 'POST', params);
    },

    /**
     * Create new test order for any instrument.
     *
     * @param {Object} params Params for creating new test order for any instrument.
     */
    postOrderTest: async function (params) {
      return privateCall('/api/v3/order/test', 'POST', params);
    },

    /**
     * Get an order's information.
     *
     * @param {Object} params Params for getting an order's information.
     */
    getOrder: async function (params) {
      return privateCall('/api/v3/order', 'GET', params);
    },

    /**
     * Cancel an open order for any instrument.
     *
     * @param {Object} params Params for canceling an open order for any instrument.
     */
    deleteOrder: async function (params) {
      return privateCall('/api/v3/order', 'DELETE', params);
    },

    /**
     * Get open orders in user's account.
     *
     * @param {Object} params Params for getting open orders in user's account.
     */
    getOpenOrders: async function (params) {
      return privateCall('/api/v3/openOrders', 'GET', params);
    },

    /**
     * Get all orders in user's account.
     *
     * @param {Object} params Params for getting all orders in user's account.
     */
    getAllOrders: async function (params) {
      return privateCall('/api/v3/allOrders', 'GET', params);
    },

    /**
     * Get user's account information.
     *
     */
    getAccount: async function () {
      return privateCall('/api/v3/account', 'GET', {});
    },

    /**
     * Get executed trades from account and symbol.
     *
     * @param {Object} params Params for getting executed trades from account and symbol.
     */
    getMyTrades: async function (params) {
      return privateCall('/api/v3/myTrades', 'GET', params);
    },

    /*
     * ==========================
     * USER DATA STREAM ENDPOINTS
     * ==========================
     */

    /**
     * Create a new user data stream listen key.
     *
     */
    postUserDataStream: async function () {
      return keyCall('/api/v1/userDataStream', 'POST', {});
    },

    /**
     * Keep alive user data stream listen key by sending a ping.
     *
     * @param {Object} params Params for keeping alive user data stream listen key.
     */
    putUserDataStream: async function (params) {
      return keyCall('/api/v1/userDataStream', 'PUT', params);
    },

    /**
     * Close a user data stream listen key.
     *
     * @param {Object} params Params for closing a user data stream listen key.
     */
    deleteUserDataStream: async function (params) {
      return keyCall('/api/v1/userDataStream', 'DELETE', params);
    },

  };
};
