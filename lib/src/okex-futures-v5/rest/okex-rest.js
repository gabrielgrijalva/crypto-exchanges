const publicCallCreator = require('./calls/public-call');
const privateCallCreator = require('./calls/private-call');

const BASE_URL = 'https://www.okex.com';

/**
 * Main library wrapper for Okex REST API.
 *
 * @param {string} apiKey API Key created from the user account.
 * @param {string} apiSecret API Secret created from the user account.
 * @param {string} apiPassphrase API Passphrase created from the user account.
 */
module.exports = function OkexRest(apiKey, apiSecret, apiPassphrase) {
  const publicCall = publicCallCreator(BASE_URL);
  const privateCall = privateCallCreator(BASE_URL, apiKey, apiSecret,
    apiPassphrase);
  return {
    postTradeOrder: function (params) {
      return privateCall('POST', '/api/v5/trade/order', null, params);
    },
    postTradeBatchOrders: function (params) {
      return privateCall('POST', '/api/v5/trade/batch-orders', null, params);
    },
    postTradeCancelOrder: function (params) {
      return privateCall('POST', '/api/v5/trade/cancel-order', null, params);
    },
    postTradeCancelBatchOrders: function (params) {
      return privateCall('POST', '/api/v5/trade/cancel-batch-orders', null, params);
    },
    getTradeOrdersPending: function (params) {
      return privateCall('GET', '/api/v5/trade/orders-pending', params, null);
    },
    postTradeAmendOrder: function (params) {
      return privateCall('POST', '/api/v5/trade/amend-order', null, params);
    },
    postTradeAmendBatchOrders: function (params) {
      return privateCall('POST', '/api/v5/trade/amend-batch-orders', null, params);
    },
    getAccountBalance: function (params) {
      return privateCall('GET', '/api/v5/account/balance', params, null);
    },
    getMarketHistoryCandles: function (params) {
      return public('GET', '/api/v5/market/history-candles', params, null);
    },
    getAccountPositions: function (params) {
      return privateCall('GET', '/api/v5/account/positions', params, null);
    },
    getMarketTicker: function (params) {
      return publicCall('GET', '/api/v5/market/ticker', params, null);
    },
    getPublicMarkPrice: function (params) {
      return publicCall('GET', '/api/v5/public/mark-price', params, null);
    },
    getPublicFundingRate: function (params) {
      return publicCall('GET', '/api/v5/public/funding-rate', params, null);
    },
  };
};
