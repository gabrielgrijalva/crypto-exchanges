const PublicCall = require('./calls/public-call');
const PrivateCall = require('./calls/private-call');


const BASE_URL = 'https://api.hbdm.vn';
const BASE_URL_MAIN = 'https://www.hbdm.vn';
const BASE_URL_GLOBAL = 'https://api.huobi.vn';

module.exports = function HuobiDMSwap(apiKey, apiSecret) {
  const client = {};
  const publicCall = PublicCall(BASE_URL);
  const publicCallM = PublicCall(BASE_URL_MAIN);
  const privateCall = PrivateCall(BASE_URL, apiKey, apiSecret);
  const privateCallG = PrivateCall(BASE_URL_GLOBAL, apiKey, apiSecret);
  client.getSwapHeartbeat = function () {
    return publicCallM('/heartbeat', 'GET', {});
  };
  // SWAP MARKET DATA INTERFACE
  client.getSwapContractInfo = function (params) {
    return publicCall('/swap-api/v1/swap_contract_info', 'GET', params);
  };
  client.getSwapIndex = function (params) {
    return publicCall('/swap-api/v1/swap_index', 'GET', params);
  };
  client.getSwapPriceLimit = function (params) {
    return publicCall('/swap-api/v1/swap_price_limit', 'GET', params);
  };
  client.getSwapOpenInterest = function (params) {
    return publicCall('/swap-api/v1/swap_open_interest', 'GET', params);
  };
  client.getSwapMarketDepth = function (params) {
    return publicCall('/swap-ex/market/depth', 'GET', params);
  };
  client.getSwapMarketHistoryKline = function (params) {
    return publicCall('/swap-ex/market/history/kline', 'GET', params)
  };
  client.getSwapMarketDetailMerged = function (params) {
    return publicCall('/swap-ex/market/detail/merged', 'GET', params);
  };
  client.getSwapMarketTrade = function (params) {
    return publicCall('/swap-ex/market/trade', 'GET', params);
  };
  client.getSwapMarketHistoryTrade = function (params) {
    return publicCall('/swap-ex/market/history/trade', 'GET', params);
  };
  client.getSwapRiskInfo = function (params) {
    return publicCall('/swap-api/v1/swap_risk_info', 'GET', params);
  };
  client.getSwapInsuranceFund = function (params) {
    return publicCall('/swap-api/v1/swap_insurance_fund', 'GET', params);
  };
  client.getSwapAdjustFactor = function (params) {
    return publicCall('/swap-api/v1/swap_adjustfactor', 'GET', params);
  };
  client.getSwapHisOpenInterest = function (params) {
    return publicCall('/swap-api/v1/swap_his_open_interest', 'GET', params);
  };
  client.getSwapApiState = function (params) {
    return publicCall('/swap-api/v1/swap_api_state', 'GET', params);
  };
  client.getSwapEliteAccountRatio = function (params) {
    return publicCall('/swap-api/v1/swap_elite_account_ratio', 'GET', params);
  };
  client.getSwapElitePositionRatio = function (params) {
    return publicCall('/swap-api/v1/swap_elite_position_ratio', 'GET', params);
  };
  client.getSwapLiquidationOrders = function (params) {
    return publicCall('/swap-api/v1/swap_liquidation_orders', 'GET', params);
  };
  client.getSwapFundingRate = function (params) {
    return publicCall('/swap-api/v1/swap_funding_rate', 'GET', params);
  };
  client.getSwapHistoricalFundingRate = function (params) {
    return publicCall('/swap-api/v1/swap_historical_funding_rate', 'GET', params);
  };
  // SWAP ACCOUNT INTERFACE
  client.postSwapAccountInfo = function (params) {
    return privateCall('/swap-api/v1/swap_account_info', 'POST', null, params);
  };
  client.postSwapPositionInfo = function (params) {
    return privateCall('/swap-api/v1/swap_position_info', 'POST', null, params);
  };
  client.postSwapSubAccountList = function (params) {
    return privateCall('/swap-api/v1/swap_sub_account_list', 'POST', null, params);
  };
  client.postSwapSubAccountInfo = function (params) {
    return privateCall('/swap-api/v1/swap_sub_account_info', 'POST', null, params);
  };
  client.postSwapSubPositionInfo = function (params) {
    return privateCall('/swap-api/v1/swap_sub_position_info', 'POST', null, params);
  };
  client.postSwapFinancialRecord = function (params) {
    return privateCall('/swap-api/v1/swap_financial_record', 'POST', null, params);
  };
  client.postSwapOrderLimit = function (params) {
    return privateCall('/swap-api/v1/swap_order_limit', 'POST', null, params);
  };
  client.postSwapFee = function (params) {
    return privateCall('/swap-api/v1/swap_fee', 'POST', null, params);
  };
  client.postSwapTransferLimit = function (params) {
    return privateCall('/swap-api/v1/swap_transfer_limit', 'POST', null, params);
  };
  client.postSwapPositionLimit = function (params) {
    return privateCall('/swap-api/v1/swap_position_limit', 'POST', null, params);
  };
  client.postSwapMasterSubTransfer = function (params) {
    return privateCall('/swap-api/v1/swap_master_sub_transfer', 'POST', null, params);
  };
  client.postSwapMasterSubTransferRecord = function (params) {
    return privateCall('/swap-api/v1/swap_master_sub_transfer_record', 'POST', null, params);
  };
  client.getSwapApiTradingStatus = function () {
    return privateCall('/swap-api/v1/swap_api_trading_status', 'GET', null, null);
  };
  // SWAP TRADE INTERFACE
  client.postSwapOrder = function (params) {
    return privateCall('/swap-api/v1/swap_order', 'POST', null, params);
  };
  client.postSwapBatchOrder = function (params) {
    return privateCall('/swap-api/v1/swap_batchorder', 'POST', null, params);
  };
  client.postSwapCancel = function (params) {
    return privateCall('/swap-api/v1/swap_cancel', 'POST', null, params);
  };
  client.postSwapCancelAll = function (params) {
    return privateCall('/swap-api/v1/swap_cancelall', 'POST', null, params);
  };
  client.postSwapLightningClosePosition = function (params) {
    return privateCall('/swap-api/v1/swap_lightning_close_position', 'POST', null, params);
  };
  client.postSwapOrderInfo = function (params) {
    return privateCall('/swap-api/v1/swap_order_info', 'POST', null, params);
  };
  client.postSwapOrderDetail = function (params) {
    return privateCall('/swap-api/v1/swap_order_detail', 'POST', null, params);
  };
  client.postSwapOpenOrders = function (params) {
    return privateCall('/swap-api/v1/swap_openorders', 'POST', null, params);
  };
  client.postSwapHisOrders = function (params) {
    return privateCall('/swap-api/v1/swap_hisorders', 'POST', null, params);
  };
  client.postSwapMatchResults = function (params) {
    return privateCall('/swap-api/v1/swap_matchresults', 'POST', null, params);
  };
  // SWAP TRANSFERRING INTERFACE
  client.postAccountTransfer = function (params) {
    return privateCallG('/v2/account/transfer', 'POST', params);
  };
  return client;
};
