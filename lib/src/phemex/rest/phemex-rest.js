const PublicCall = require('./calls/public-call');
const PrivateCall = require('./calls/private-call');

const BASE_URL = 'https://api.phemex.com';

module.exports = function BybitRest(apiKey, apiSecret) {
  const client = {};
  const publicCall = PublicCall(BASE_URL);
  const privateCall = PrivateCall(BASE_URL, apiKey, apiSecret);
  client.getMdTrade = function (params) {
    return publicCall('/md/trade', 'GET', params);
  };
  client.getMdTicker24h = function (params) {
    return publicCall('/md/ticker/24hr', 'GET', params);
  };
  client.deleteOrdersCancel = function (params) {
    return privateCall('/orders/cancel', 'DELETE', params);
  };
  client.deleteOrders = function (params) {
    return privateCall('/orders', 'DELETE', params);
  };
  client.deleteOrdersAll = function (params) {
    return privateCall('/orders/all', 'DELETE', params);
  };
  client.putOrdersCreate = function (params) {
    return privateCall('/orders/create', 'PUT', params);
  };
  client.putOrdersReplace = function (params) {
    return privateCall('/orders/replace', 'PUT', params);
  };
  client.getAccountsPositions = function (params) {
    return privateCall('/accounts/accountPositions', 'GET', params);
  };
  return client;
};
