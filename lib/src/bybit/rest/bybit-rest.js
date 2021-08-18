const PublicCall = require('./calls/public-call');
const PrivateCall = require('./calls/private-call');

const BASE_URL = 'https://api.bybit.com';

module.exports = function BybitRest(apiKey, apiSecret) {
  const client = {};
  const publicCall = PublicCall(BASE_URL);
  const privateCall = PrivateCall(BASE_URL, apiKey, apiSecret);
  // MARKET DATA ENDPOINTS
  client.getPublicOrderBookL2 = function (params) {
    return publicCall('/v2/public/orderBook/L2', 'GET', params);
  };
  client.getPublicKlineList = function (params) {
    return publicCall('/v2/public/kline/list', 'GET', params);
  };
  client.getPublicTickers = function (params) {
    return publicCall('/v2/public/tickers', 'GET', params);
  };
  client.getPublicTradingRecords = function (params) {
    return publicCall('/v2/public/trading-records', 'GET', params);
  };
  client.getPublicSymbols = function (params) {
    return publicCall('/v2/public/symbols', 'GET', params);
  };
  client.getPublicLiqRecords = function (params) {
    return publicCall('/v2/public/liq-records', 'GET', params);
  };
  client.getPublicMarkPriceKline = function (params) {
    return publicCall('/v2/public/mark-price-kline', 'GET', params);
  };
  client.getPublicOpenInterest = function (params) {
    return publicCall('/v2/public/open-interest', 'GET', params);
  };
  client.getPublicBigDeal = function (params) {
    return publicCall('/v2/public/big-deal', 'GET', params);
  };
  client.getPublicAccountRatio = function (params) {
    return publicCall('/v2/public/account-ratio', 'GET', params);
  };
  // ACCOUNT DATA ENDPOINTS
  client.postPrivateOrderCreate = function (params) {
    return privateCall('/v2/private/order/create', 'POST', params);
  };
  client.getPrivateOrderList = function (params) {
    return privateCall('/v2/private/order/list', 'GET', params);
  };
  client.postPrivateOrderCancel = function (params) {
    return privateCall('/v2/private/order/cancel', 'POST', params);
  };
  client.postPrivateOrderCancelAll = function (params) {
    return privateCall('/v2/private/order/cancelAll', 'POST', params);
  };
  client.postPrivateOrderReplace = function (params) {
    return privateCall('/v2/private/order/replace', 'POST', params);
  };
  client.getPrivateOrder = function (params) {
    return privateCall('/v2/private/order', 'GET', params);
  };
  client.postPrivateStopOrderCreate = function (params) {
    return privateCall('/v2/private/stop-order/create', 'POST', params);
  };
  client.getPrivateStopOrderList = function (params) {
    return privateCall('/v2/private/stop-order/list', 'GET', params);
  };
  client.postPrivateStopOrderCancel = function (params) {
    return privateCall('/v2/private/stop-order/cancel', 'POST', params);
  };
  client.postPrivateStopOrderCancelAll = function (params) {
    return privateCall('/v2/private/stop-order/cancelAll', 'POST', params);
  };
  client.postPrivateStopOrderReplace = function (params) {
    return privateCall('/v2/private/stop-order/replace', 'POST', params);
  };
  client.getPrivateStopOrder = function (params) {
    return privateCall('/v2/private/stop-order', 'GET', params);
  };
  client.getPrivatePositionList = function (params) {
    return privateCall('/v2/private/position/list', 'GET', params);
  };
  client.postPositionChangePositionMargin = function (params) {
    return privateCall('/position/change-position-margin', 'POST', params);
  };
  client.postOpenApiPositionTradingStop = function (params) {
    return privateCall('/open-api/position/trading-stop', 'POST', params);
  };
  client.postUserLeverageSave = function (params) {
    return privateCall('/user/leverage/save', 'POST', params);
  };
  client.getPrivateExecutionList = function (params) {
    return privateCall('/v2/private/execution/list', 'GET', params);
  };
  client.getPrivateTradeClosedPnlList = function (params) {
    return privateCall('/v2/private/trade/closed-pnl/list', 'GET', params);
  };
  // WALLET DATA ENDPOINTS
  client.getOpenApiWalletRiskLimitList = function (params) {
    return privateCall('/open-api/wallet/risk-limit/list', 'GET', params);
  };
  client.postOpenApiWalletRiskLimit = function (params) {
    return privateCall('/open-api/wallet/risk-limit', 'POST', params);
  };
  client.getOpenApiFundingPrevFundingRate = function (params) {
    return privateCall('/open-api/funding/prev-funding-rate', 'GET', params);
  };
  client.getOpenApiFundingPrevFunding = function (params) {
    return privateCall('/open-api/funding/prev-funding', 'GET', params);
  };
  client.getOpenApiFundingPredictedFunding = function (params) {
    return privateCall('/open-api/funding/predicted-funding', 'GET', params);
  };
  client.getOpenApiApiKey = function (params) {
    return privateCall('/open-api/api-key', 'GET', params);
  };
  client.getPrivateAccountLcp = function (params) {
    return privateCall('/v2/private/account/lcp', 'GET', params);
  };
  client.getPrivateWalletBalance = function (params) {
    return privateCall('/v2/private/wallet/balance', 'GET', params);
  };
  client.getOpenApiWalletFundRecords = function (params) {
    return privateCall('/open-api/wallet/fund/records', 'GET', params);
  };
  client.getOpenApiWalletWithdrawList = function (params) {
    return privateCall('/open-api/wallet/withdraw/list', 'GET', params);
  };
  client.getPrivateExchangeOrderList = function (params) {
    return privateCall('/v2/private/exchange-order/list', 'GET', params);
  };
  // API DATA ENDPOINTS
  client.getPublicTime = function (params) {
    return privateCall('/v2/public/time', 'GET', params);
  };
  client.getPublicAnnouncement = function (params) {
    return privateCall('/v2/public/announcement', 'GET', params);
  };
  return client;
};
