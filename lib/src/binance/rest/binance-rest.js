const keyCallCreator = require('./calls/key-call');
const publicCallCreator = require('./calls/public-call');
const privateCallCreator = require('./calls/private-call');

const BASE_URL = 'https://api.binance.com';

module.exports = function Binance(apiKey, apiSecret) {
  const publicCall = publicCallCreator(BASE_URL);
  const keyCall = keyCallCreator(BASE_URL, apiKey, apiSecret);
  const privateCall = privateCallCreator(BASE_URL, apiKey, apiSecret);

  return {
    // WALLET ENDPOINTS
    getSystemStatus: function(){
      return publicCall('/wapi/v3/systemStatus.html', 'GET', {});
    },
    getCapitalConfigGetAll: function(){
      return privateCall('/sapi/v1/capital/config/getall', 'GET', {});
    },
    getAccountSnapshot: function(params){
      return privateCall('/sapi/v1/accountSnapshot', 'GET', params);
    },
    postAccountDisableFastWithdrawSwitch: function(){
      return privateCall('/sapi/v1/account/disableFastWithdrawSwitch', 'POST', {});
    },
    postAccountEnableFastWithdrawSwitch: function(){
      return privateCall('/sapi/v1/account/enableFastWithdrawSwitch', 'POST', {});
    },
    postCapitalWithdrawApply: function(params){
      return privateCall('/sapi/v1/capital/withdraw/apply', 'POST', params);
    },
    postWithdraw: function(params){
      return privateCall('/wapi/v3/withdraw.html', 'POST', params);
    },
    getCapitalDepositHisrec: function(params){
      return privateCall('/sapi/v1/capital/deposit/hisrec', 'GET', params);
    },
    getDepositHistory: function(params){
      return privateCall('/wapi/v3/depositHistory.html', 'GET', params);
    },
    getCapitalWithdrawHistory: function(params){
      return privateCall('/sapi/v1/capital/withdraw/history', 'GET', params);
    },
    getWithdrawHistory: function(params){
      return privateCall('/wapi/v3/withdrawHistory.html', 'GET', params);
    },
    getCapitalDepositAddress: function(params){
      return privateCall('/sapi/v1/capital/deposit/address', 'GET', params);
    },
    getDepositAddress: function(params){
      return privateCall('/wapi/v3/depositAddress.html', 'GET', params);
    },
    getAccountStatus: function(){
      return privateCall('/wapi/v3/accountStatus.html', 'GET', {});
    },
    getApiTradingStatus: function(){
      return privateCall('/wapi/v3/apiTradingStatus.html', 'GET', {});
    },
    getUserAssetDribbletLog: function(){
      return privateCall('/wapi/v3/userAssetDribbletLog.html', 'GET', {});
    },
    postAssetDust: function(params){
      return privateCall('/sapi/v1/asset/dust', 'POST', params);
    },
    getAssetDividend: function(params){
      return privateCall('/sapi/v1/asset/assetDividend', 'GET', params);
    },
    getAssetDetail: function(){
      return privateCall('/wapi/v3/assetDetail.html', 'GET', {});
    },
    getTradeFee: function(params){
      return privateCall('/wapi/v3/tradeFee.html', 'GET', params);
    },
    // MARKET DATA ENDPOINTS
    getPing: function () {
      return publicCall('/api/v1/ping', 'GET', {});
    },
    getTime: function () {
      return publicCall('/api/v1/time', 'GET', {});
    },
    getExchangeInfo: function () {
      return publicCall('/api/v1/exchangeInfo', 'GET', {});
    },
    getDepth: function (params) {
      return publicCall('/api/v1/depth', 'GET', params);
    },
    getTrades: function (params) {
      return publicCall('/api/v1/trades', 'GET', params);
    },
    getHistoricalTrades: function (params) {
      return keyCall('/api/v1/historicalTrades', 'GET', params);
    },
    getAggTrades: function (params) {
      return publicCall('/api/v1/aggTrades', 'GET', params);
    },
    getKlines: function (params) {
      return publicCall('/api/v1/klines', 'GET', params);
    },
    getAvgPrice: function (params) {
      return publicCall('/api/v3/avgPrice', 'GET', params);
    },
    getTicker24Hr: function (params) {
      return publicCall('/api/v1/ticker/24hr', 'GET', params);
    },
    getTickerPrice: function (params) {
      return publicCall('/api/v3/ticker/price', 'GET', params);
    },
    getTickerBookTicker: function (params) {
      return publicCall('/api/v3/ticker/bookTicker', 'GET', params);
    },
    // SPOT ACCOUNT/TRADE
    postOrder: function (params) {
      return privateCall('/api/v3/order', 'POST', params);
    },
    postOrderTest: function (params) {
      return privateCall('/api/v3/order/test', 'POST', params);
    },
    getOrder: function (params) {
      return privateCall('/api/v3/order', 'GET', params);
    },
    deleteOrder: function (params) {
      return privateCall('/api/v3/order', 'DELETE', params);
    },
    getOpenOrders: function (params) {
      return privateCall('/api/v3/openOrders', 'GET', params);
    },
    getAllOrders: function (params) {
      return privateCall('/api/v3/allOrders', 'GET', params);
    },
    getAccount: function () {
      return privateCall('/api/v3/account', 'GET', {});
    },
    getMyTrades: function (params) {
      return privateCall('/api/v3/myTrades', 'GET', params);
    },
    postUserDataStream: function () {
      return keyCall('/api/v1/userDataStream', 'POST', {});
    },
    putUserDataStream: function (params) {
      return keyCall('/api/v1/userDataStream', 'PUT', params);
    },
    deleteUserDataStream: function (params) {
      return keyCall('/api/v1/userDataStream', 'DELETE', params);
    },
  };
};
