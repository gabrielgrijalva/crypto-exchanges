const publicCallCreator = require('./calls/public-call');
const privateCallCreator = require('./calls/private-call');

const BASE_URL = 'https://api.hbdm.vn';
const BASE_URL_GLOBAL = 'https://api.huobi.vn';

/**
 * Main library wrapper for Huobi REST API.
 *
 * @param {string} apiKey API Key created from the user account.
 * @param {string} apiSecret API Secret created from the user account.
 */
module.exports = function HuobiDM(apiKey, apiSecret) {
  const publicCall = publicCallCreator(BASE_URL);
  const privateCall = privateCallCreator(BASE_URL, apiKey, apiSecret);
  const privateCallGlobal = privateCallCreator(BASE_URL_GLOBAL, apiKey,
    apiSecret);

  return {

    /*
     * ==========================
     * MARKET DATA INTERFACE
     * ==========================
     */

    /**
     * Get contracts information.
     *
     * @param {Object} params Params for getting contracts information.
     */
    getContractContractInfo: function (params) {
      return publicCall('/api/v1/contract_contract_info', 'GET', params);
    },

    /**
     * Get contracts index.
     *
     * @param {Object} params Params for getting contracts index.
     */
    getContractIndex: function (params) {
      return publicCall('/api/v1/contract_index', 'GET', params);
    },

    /**
     * Get contracts price limits.
     *
     * @param {Object} params Params for getting contracts price limits.
     */
    getContractPriceLimit: function (params) {
      return publicCall('/api/v1/contract_price_limit', 'GET', params);
    },

    /**
     * Get contracts open interest.
     *
     * @param {Object} params Params for getting contracts open interest.
     */
    getContractOpenInterest: function (params) {
      return publicCall('/api/v1/contract_open_interest', 'GET', params);
    },

    /**
     * Get markets depth.
     *
     * @param {Object} params Params for getting markets depth.
     */
    getMarketDepth: function (params) {
      return publicCall('/market/depth', 'GET', params);
    },

    /**
     * Get markets history klines.
     *
     * @param {Object} params Params for getting markets history klines.
     */
    getMarketHistoryKline: function (params) {
      return publicCall('/market/history/kline', 'GET', params);
    },

    /**
     * Get markets detail information.
     *
     * @param {Object} params Params for getting markets detail information.
     */
    getMarketDetailMerged: function (params) {
      return publicCall('/market/detail/merged', 'GET', params);
    },

    /**
     * Get markets last trades.
     *
     * @param {Object} params Params for getting markets last trades.
     */
    getMarketTrade: function (params) {
      return publicCall('/market/trade', 'GET', params);
    },

    /**
     * Get markets history last trades.
     *
     * @param {Object} params Params for getting markets history last trades.
     */
    getMarketHistoryTrade: function (params) {
      return publicCall('/market/history/trade', 'GET', params);
    },

    /*
     * ==========================
     * ACCOUNT INTERFACE
     * ==========================
     */

    /**
     * Get user's account information.
     *
     * @param {Object} params Params for getting user's account information.
     */
    postContractAccountInfo: function (params) {
      return privateCall('/api/v1/contract_account_info', 'POST', null, params);
    },

    /**
     * Get a contract position information.
     *
     * @param {Object} params Params for getting a contract position information.
     */
    postContractPositionInfo: function (params) {
      return privateCall('/api/v1/contract_position_info', 'POST',
        null, params);
    },

    /**
     * Get assets information of all sub-accounts under the master account.
     *
     * @param {Object} params Params for getting assets information of all sub-accounts under the master account.
     */
    postContractSubAccountList: function (params) {
      return privateCall('/api/v1/contract_sub_account_list', 'POST',
        null, params);
    },

    /**
     * Get assets from a single sub-account.
     *
     * @param {Object} params Params for getting assets from a single sub-account.
     */
    postContractSubAccountInfo: function (params) {
      return privateCall('/api/v1/contract_sub_account_info', 'POST',
        null, params);
    },

    /**
     * Get contract position information from a single sub-account.
     *
     * @param {Object} params Params for getting contract position information from a single sub-account.
     */
    postContractSubPositionInfo: function (params) {
      return privateCall('/api/v1/contract_sub_position_info', 'POST',
        null, params);
    },

    /**
     * Get account financial records.
     *
     * @param {Object} params Params for getting account financial records.
     */
    postContractFinancialRecord: function (params) {
      return privateCall('/api/v1/contract_financial_record', 'POST',
        null, params);
    },

    /*
     * ==========================
     * TRADE INTERFACE
     * ==========================
     */

    /**
     * Post new contract order.
     *
     * @param {Object} params Params for posting new contract order.
     */
    postContractOrder: function (params) {
      return privateCall('/api/v1/contract_order', 'POST', null, params);
    },

    /**
     * Post multiple new contract orders.
     *
     * @param {Object} params Params for posting multiple new contract orders.
     */
    postContractBatchOrder: function (params) {
      return privateCall('/api/v1/contract_batchorder', 'POST', null, params);
    },

    /**
     * Post contract cancel order.
     *
     * @param {Object} params Params for posting contract cancel order.
     */
    postContractCancel: function (params) {
      return privateCall('/api/v1/contract_cancel', 'POST', null, params);
    },

    /**
     * Post contract cancel all orders.
     *
     * @param {Object} params Params for posting contract cancel all orders.
     */
    postContractCancelAll: function (params) {
      return privateCall('/api/v1/contract_cancelall', 'POST', null, params);
    },

    /**
     * Get contract order information.
     *
     * @param {Object} params Params for getting contract order information.
     */
    postContractOrderInfo: function (params) {
      return privateCall('/api/v1/contract_order_info', 'POST', null, params);
    },

    /**
     * Get contract order details.
     *
     * @param {Object} params Params for getting contract order details.
     */
    postContractOrderDetail: function (params) {
      return privateCall('/api/v1/contract_order_detail', 'POST', null, params);
    },

    /**
     * Get contract open orders.
     *
     * @param {Object} params Params for getting contract open orders.
     */
    postContractOpenOrders: function (params) {
      return privateCall('/api/v1/contract_openorders', 'POST', null, params);
    },

    /**
     * Get contract historic orders.
     *
     * @param {Object} params Params for getting contract historic orders.
     */
    postContractHisOrders: function (params) {
      return privateCall('/api/v1/contract_hisorders', 'POST', null, params);
    },

    /**
     * Get contract historic match results.
     *
     * @param {Object} params Params for getting contract historic match results.
     */
    postContractMatchResults: function (params) {
      return privateCall('/api/v1/contract_matchresults', 'POST', null, params);
    },

    /*
     * ==========================
     * TRANSFERING INTERFACE
     * ==========================
     */

    /**
     * Post transfer margin between spot account and futures account.
     *
     * @param {Object} params Params for posting transfer margin between spot account and futures account.
     */
    postFuturesTransfer: function (params) {
      return privateCallGlobal('/v1/futures/transfer', 'POST', null, params);
    },

  };
};
