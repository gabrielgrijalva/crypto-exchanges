const publicCallCreator = require('./calls/public-call');
const privateCallCreator = require('./calls/private-call');

const BASE_URL = 'https://aws.okex.com';

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
      return privateCall('/api/v5/trade/order', 'POST', null, params);
    },
    postTradeBatchOrders: function (params) {
      return privateCall('/api/v5/trade/batch-orders', 'POST', null, params);
    },
    postTradeCancelOrder: function (params) {
      return privateCall('/api/v5/trade/cancel-order', 'POST', null, params);
    },
    postTradeCancelBatchOrders: function (params) {
      return privateCall('/api/v5/trade/cancel-batch-orders', 'POST', null, params);
    },
    getTradeOrdersPending: function (params) {
      return privateCall('/api/v5/trade/orders-pending', 'GET', params, null);
    },
    postTradeAmendOrder: function (params) {
      return privateCall('/api/v5/trade/amend-order', 'POST', null, params);
    },
    postTradeAmendBatchOrders: function (params) {
      return privateCall('/api/v5/trade/amend-batch-orders', 'POST', null, params);
    },
    getAccountBalance: function (params) {
      return privateCall('/api/v5/account/balance', 'GET', params, null);
    },
    getMarketHistoryCandles: function (params) {
      return publicCall('/api/v5/market/history-candles', 'GET', params, null);
    },
    getAccountPositions: function (params) {
      return privateCall('/api/v5/account/positions', 'GET', params, null);
    },
    getMarketTicker: function (params) {
      return publicCall('/api/v5/market/ticker', 'GET', params, null);
    },
    getPublicMarkPrice: function (params) {
      return publicCall('/api/v5/public/mark-price', 'GET', params, null);
    },
    getPublicFundingRate: function (params) {
      return publicCall('/api/v5/public/funding-rate', 'GET', params, null);
    },
  };
};
