const publicCallCreator = require('./calls/public-call');
const privateCallCreator = require('./calls/private-call');

const BASE_URL = 'https://api.bitflyer.com';

/**
 * Main library wrapper for Bitflyer REST API.
 *
 * @param {string} apiKey API Key created from the user account.
 * @param {string} apiSecret API Secret created from the user account.
 */
module.exports = function BitflyerRest(apiKey, apiSecret) {
  const publicCall = publicCallCreator(BASE_URL);
  const privateCall = privateCallCreator(BASE_URL, apiKey, apiSecret);

  return {

    /*
     * ==========================
     * PUBLIC ENDPOINTS
     * ==========================
     */

    /**
     * Get market list of instruments.
     *
     */
    getMarkets: function () {
      return publicCall('/v1/getmarkets', 'GET', {});
    },

    /**
     * Get order book depth for any instrument.
     *
     * @param {Object} params Params for getting order book depth for any instrument.
     */
    getBoard: function (params) {
      return publicCall('/v1/getboard', 'GET', params);
    },

    /**
     * Get ticker information for any instrument.
     *
     * @param {Object} params Params for getting ticker information for any instrument.
     */
    getTicker: function (params) {
      return publicCall('/v1/getticker', 'GET', params);
    },

    /**
     * Get trade execution history for any instrument.
     *
     * @param {Object} params Params for getting trade execution history for any instrument.
     */
    getExecutions: function (params) {
      return publicCall('/v1/getexecutions', 'GET', params, null);
    },

    /**
     * Get exchange operating status.
     *
     * @param {Object} params Params for getting exchange operating status.
     */
    getHealth: function (params) {
      return publicCall('/v1/gethealth', 'GET', params);
    },

    /**
     * Get chat conversations in exchange.
     *
     * @param {Object} params Params for getting chat conversations in exchange.
     */
    getChats: function (params) {
      return publicCall('/v1/getchats', 'GET', params);
    },

    /*
     * ==========================
     * PRIVATE ENDPOINTS
     * ==========================
     */

    /**
     * Get API key permissions.
     *
     */
    getMePermissions: function () {
      return privateCall('/v1/me/getpermissions', 'GET', null, null);
    },

    /**
     * Get account balances.
     *
     */
    getMeBalance: function () {
      return privateCall('/v1/me/getbalance', 'GET', null, null);
    },

    /**
     * Get margin status information.
     *
     */
    getMeCollateral: function () {
      return privateCall('/v1/me/getcollateral', 'GET', null, null);
    },

    /**
     * Get cryptocurrencies deposit addresses.
     *
     */
    getMeAddresses: function () {
      return privateCall('/v1/me/getaddresses', 'GET', null, null);
    },

    /**
     * Get cryptocurrencies deposit history.
     *
     * @param {Object} params Params for getting cryptocurrencies deposit history.
     */
    getMeCoinIns: function (params) {
      return privateCall('/v1/me/getcoinins', 'GET', params, null);
    },

    /**
     * Get cryptocurrencies transaction history.
     *
     * @param {Object} params Params for getting cryptocurrencies transaction history.
     */
    getMeCoinOuts: function (params) {
      return privateCall('/v1/me/getcoinouts', 'GET', params, null);
    },

    /**
     * Get summary of registered bank accounts.
     *
     */
    getMeBankAccounts: function () {
      return privateCall('/v1/me/getbankaccounts', 'GET', null, null);
    },

    /**
     * Get cash deposit history.
     *
     * @param {Object} params Params for getting cash deposit history.
     */
    getMeDeposits: function (params) {
      return privateCall('/v1/me/getdeposits', 'GET', params, null);
    },

    /**
     * Post withdrawal of fund.
     *
     * @param {Object} params Params for posting withdrawal of fund.
     */
    postMeWithdrawal: function (params) {
      return privateCall('/v1/me/withdraw', 'POST', null, params);
    },

    /**
     * Get withdrawal history.
     *
     * @param {Object} params Params for getting withdrawal history.
     */
    getMeWithdrawals: function (params) {
      return privateCall('/v1/me/getwithdrawals', 'GET', params, null);
    },

    /**
     * Post a new child order.
     *
     * @param {Object} params Params for posting a new child order.
     */
    postMeSendChildOrder: function (params) {
      return privateCall('/v1/me/sendchildorder', 'POST', null, params);
    },

    /**
     * Post a cancelation of child order.
     *
     * @param {Object} params Params for posting a cancelation of child order.
     */
    postMeCancelChildOrder: function (params) {
      return privateCall('/v1/me/cancelchildorder', 'POST', null, params);
    },

    /**
     * Post a new parent or special order.
     *
     * @param {Object} params Params for posting a new parent or special order.
     */
    postMeSendParentOrder: function (params) {
      return privateCall('/v1/me/sendparentorder', 'POST', null, params);
    },

    /**
     * Post a cancelation of parent or special order.
     *
     * @param {Object} params Params for posting a cancelation of parent or special order.
     */
    postMeCancelParentOrder: function (params) {
      return privateCall('/v1/me/cancelparentorder', 'POST', null, params);
    },

    /**
     * Post a cancelation of all orders.
     *
     * @param {Object} params Params for posting a cancelation of all orders.
     */
    postMeCancelAllChildOrders: function (params) {
      return privateCall('/v1/me/cancelallchildorders', 'POST', null, params);
    },

    /**
     * Get list of orders history.
     *
     * @param {Object} params Params for getting list of orders history.
     */
    getMeChildOrders: function (params) {
      return privateCall('/v1/me/getchildorders', 'GET', params, null);
    },

    /**
     * Get parent order details.
     *
     * @param {Object} params Params for getting parent order details.
     */
    getMeParentOrder: function (params) {
      return privateCall('/v1/me/getparentorder', 'GET', params, null);
    },

    /**
     * Get parent orders history.
     *
     * @param {Object} params Params for getting parent orders history.
     */
    getMeParentOrders: function (params) {
      return privateCall('/v1/me/getparentorders', 'GET', params, null);
    },

    /**
     * Get list of trades executions.
     *
     * @param {Object} params Params for getting list of trades executions.
     */
    getMeExecutions: function (params) {
      return privateCall('/v1/me/getexecutions', 'GET', params, null);
    },

    /**
     * Get balance history.
     *
     * @param {Object} params Params for getting balance history.
     */
    getMeBalanceHistory: function (params) {
      return privateCall('/v1/me/getbalancehistory', 'GET', params, null);
    },

    /**
     * Get open positions.
     *
     * @param {Object} params Params for getting open positions.
     */
    getMePositions: function (params) {
      return privateCall('/v1/me/getpositions', 'GET', params, null);
    },

    /**
     * Get margin change history.
     *
     * @param {Object} params Params for getting margin change history.
     */
    getMeCollateralHistory: function (params) {
      return privateCall('/v1/me/getcollateralhistory', 'GET', params, null);
    },

    /**
     * Get account trading commission.
     *
     * @param {Object} params Params for getting account trading commission.
     */
    getMeTradingCommission: function (params) {
      return privateCall('/v1/me/gettradingcommission', 'GET', params, null);
    },
  };
};
