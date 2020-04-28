const KeyCall = require('./calls/key-call');
const PublicCall = require('./calls/public-call');
const PrivateCall = require('./calls/private-call');

const BASE_URL = 'https://fapi.binance.com';
const BASE_URL_SPOT = 'https://api.binance.com';

module.exports = function BinanceFuturesRest(apiKey, apiSecret) {
  const client = {};
  const keyCall = KeyCall(BASE_URL, apiKey);
  const publicCall = PublicCall(BASE_URL);
  const privateCall = PrivateCall(BASE_URL, apiKey, apiSecret);
  const privateCallSpot = PrivateCall(BASE_URL_SPOT, apiKey, apiSecret);
  // MARKET DATA ENDPOINTS
  client.getPing = function () {
    return publicCall('/fapi/v1/ping', 'GET', null);
  };
  client.getTime = function () {
    return publicCall('/fapi/v1/time', 'GET', null);
  };
  client.getExchangeInfo = function () {
    return publicCall('/fapi/v1/exchangeInfo', 'GET', null);
  };
  client.getDepth = function (params) {
    return publicCall('/fapi/v1/depth', 'GET', params);
  };
  client.getTrades = function (params) {
    return publicCall('/fapi/v1/trades', 'GET', params);
  };
  client.getHistoricalTrades = function (params) {
    return keyCall('/fapi/v1/historicalTrades', 'GET', params);
  };
  client.getAggTrades = function (params) {
    return publicCall('/fapi/v1/aggTrades', 'GET', params);
  };
  client.getKlines = function (params) {
    return publicCall('/fapi/v1/klines', 'GET', params);
  };
  client.getPremiumIndex = function (params) {
    return publicCall('/fapi/v1/premiumIndex', 'GET', params);
  };
  client.getFundingRate = function (params) {
    return keyCall('/fapi/v1/fundingRate', 'GET', params);
  };
  client.getTicker24Hr = function (params) {
    return publicCall('/fapi/v1/ticker/24hr', 'GET', params);
  };
  client.getTickerPrice = function (params) {
    return publicCall('/fapi/v1/ticker/price', 'GET', params);
  };
  client.getTickerBookTicker = function (params) {
    return publicCall('/fapi/v1/ticker/bookTicker', 'GET', params);
  };
  client.getAllForceOrders = function (params) {
    return publicCall('/fapi/v1/allForceOrders', 'GET', params);
  };
  client.getOpenInterest = function (params) {
    return publicCall('/fapi/v1/openInterest', 'GET', params);
  };
  client.getLeverageBracket = function (params) {
    return keyCall('/fapi/v1/leverageBracket', 'GET', params);
  };
  client.getOpenInterestHist = function (params) {
    return keyCall('/futures/data/openInterestHist', 'GET', params);
  };
  client.getTopLongShortAccountRatio = function (params) {
    return keyCall('/futures/data/topLongShortAccountRatio', 'GET', params);
  };
  client.getTopLongShortPositionRatio = function (params) {
    return keyCall('/futures/data/topLongShortPositionRatio', 'GET', params);
  };
  client.getGlobalLongShortAccountRatio = function (params) {
    return keyCall('/futures/data/globalLongShortAccountRatio', 'GET', params);
  };
  client.getTakerLongShortRatio = function (params) {
    return keyCall('/futures/data/takerlongshortRatio', 'GET', params);
  };
  // ACCOUNT/TRADES ENDPOINTS
  client.postTransfer = function (params) {
    return privateCallSpot('/sapi/v1/futures/transfer', 'POST', params);
  };
  client.getTransfer = function (params) {
    return privateCallSpot('/sapi/v1/futures/transfer', 'GET', params);
  };
  client.postPositionSideDual = function (params) {
    return privateCall('/fapi/v1/positionSide/dual', 'POST', params);
  };
  client.getPositionSideDual = function (params) {
    return privateCall('/fapi/v1/positionSide/dual', 'GET', params);
  };
  client.postOrder = function (params) {
    return privateCall('/fapi/v1/order', 'POST', params);
  };
  client.postBatchOrders = function (params) {
    return privateCall('/fapi/v1/batchOrders', 'POST', params);
  };
  client.getOrder = function (params) {
    return privateCall('/fapi/v1/order', 'GET', params);
  };
  client.deleteOrder = function (params) {
    return privateCall('/fapi/v1/order', 'DELETE', params);
  };
  client.deleteAllOpenOrders = function (params) {
    return privateCall('/fapi/v1/allOpenOrders', 'DELETE', params);
  };
  client.deleteBatchOrders = function (params) {
    return privateCall('/fapi/v1/batchOrders', 'DELETE', params);
  };
  client.getOpenOrder = function (params) {
    return privateCall('/fapi/v1/openOrder', 'GET', params);
  };
  client.getOpenOrders = function (params) {
    return privateCall('/fapi/v1/openOrders', 'GET', params);
  };
  client.getAllOrders = function (params) {
    return privateCall('/fapi/v1/allOrders', 'GET', params);
  };
  client.getBalance = function (params) {
    return privateCall('/fapi/v1/balance', 'GET', params);
  };
  client.getAccount = function (params) {
    return privateCall('/fapi/v1/account', 'GET', params);
  };
  client.postLeverage = function (params) {
    return privateCall('/fapi/v1/leverage', 'POST', params);
  };
  client.postMarginType = function (params) {
    return privateCall('/fapi/v1/marginType', 'POST', params);
  };
  client.postPositionMargin = function (params) {
    return privateCall('/fapi/v1/positionMargin', 'POST', params);
  };
  client.getPositionMarginHistory = function (params) {
    return privateCall('/fapi/v1/positionMargin/history', 'POST', params);
  };
  client.getPositionRisk = function (params) {
    return privateCall('/fapi/v1/positionRisk', 'GET', params);
  };
  client.getUserTrades = function (params) {
    return privateCall('/fapi/v1/userTrades', 'GET', params);
  };
  client.getIncome = function (params) {
    return privateCall('/fapi/v1/income', 'GET', params);
  };
  // USER DATA STREAMS
  client.postListenKey = function (params) {
    return keyCall('/fapi/v1/listenKey', 'POST', params);
  };
  client.putListenKey = function (params) {
    return keyCall('/fapi/v1/listenKey', 'PUT', params);
  };
  client.deleteListenKey = function (params) {
    return keyCall('/fapi/v1/listenKey', 'DELETE', params);
  };
  return client;
};
