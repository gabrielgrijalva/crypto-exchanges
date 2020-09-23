const PublicCall = require('./calls/public-call');
const PrivateCall = require('./calls/private-call');

const BASE_URL = 'https://futures.kraken.com/derivatives';

module.exports = function BinanceFuturesRest(apiKey, apiSecret) {
  const client = {};
  const publicCall = PublicCall(BASE_URL);
  const privateCall = PrivateCall(BASE_URL, apiKey, apiSecret);
  // PUBLIC ENDPOINTS
  client.getFeeSchedules = function () {
    return publicCall('/api/v3/feeschedules', 'GET', null);
  };
  client.getOrderBook = function (params) {
    return publicCall('/api/v3/orderbook', 'GET', params);
  };
  client.getTickers = function () {
    return publicCall('/api/v3/tickers', 'GET', null);
  };
  client.getInstruments = function () {
    return publicCall('/api/v3/instruments', 'GET', null);
  };
  client.getHistory = function (params) {
    return publicCall('/api/v3/history', 'GET', params);
  };
  client.getChartsTrade = function (params) {
    return publicCall(`/api/v4/charts/trade/${params
      .symbol}/${params.interval}`, 'GET', params);
  };
  // PRIVATE ENDPOINTS
  client.postEditOrder = function (params) {
    return privateCall('/api/v3/editorder', 'POST', params);
  };
  client.postSendOrder = function (params) {
    return privateCall('/api/v3/sendorder', 'POST', params);
  };
  client.postCancelOrder = function (params) {
    return privateCall('/api/v3/cancelorder', 'POST', params);
  };
  client.getFills = function (params) {
    return privateCall('/api/v3/fills', 'GET', params);
  };
  client.postTransfer = function (params) {
    return privateCall('/api/v3/transfer', 'POST', params);
  };
  client.getOpenPositions = function () {
    return privateCall('/api/v3/openpositions', 'GET', {});
  };
  client.postBatchOrder = function (params) {
    return privateCall('/api/v3/batchorder', 'POST', params);
  };
  client.getNotifications = function () {
    return privateCall('/api/v3/notifications', 'GET', {});
  };
  client.getNotifications = function () {
    return privateCall('/api/v3/notifications', 'GET', {});
  };
  client.getAccounts = function () {
    return privateCall('/api/v3/accounts', 'GET', {});
  };
  client.postCancelAllOrders = function (params) {
    return privateCall('/api/v3/cancelallorders', 'POST', params);
  };
  client.postCancelAllOrdersAfter = function (params) {
    return privateCall('/api/v3/cancelallordersafter', 'POST', params);
  };
  client.getOpenOrders = function () {
    return privateCall('/api/v3/openorders', 'GET', {});
  };
  client.getRecentOrders = function (params) {
    return privateCall('/api/v3/recentorders', 'GET', params);
  };
  client.postWithdrawal = function (params) {
    return privateCall('/api/v3/withdrawal', 'POST', params);
  };
  client.getTransfers = function (params) {
    return privateCall('/api/v3/transfers', 'GET', params);
  };
  client.getFeeSchedulesVolumes = function () {
    return privateCall('/api/v3/feeschedules/volumes', 'GET', {});
  };
  return client;
};
