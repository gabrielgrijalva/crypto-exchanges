const privateCallCreator = require('./calls/private-call');

const BASE_URL = 'https://www.bitmex.com';

/**
 * Main library wrapper for Bitmex REST API.
 *
 * @param {string} apiKey API Key created from the user account.
 * @param {string} apiSecret API Secret created from the user account.
 */
module.exports = function BitmexRest(apiKey, apiSecret) {
  const privateCall = privateCallCreator(BASE_URL, apiKey, apiSecret);

  return {

    /*
     * ==========================
     * UDF API
     * ==========================
     */

    getUDFHistory: function (params) {
      return privateCall('/api/udf/history', 'GET', params);
    },

    /*
     * ==========================
     * ANNOUNCEMENT
     * ==========================
     */

    /**
     * Get announcements.
     *
     * @param {Object} params Params for getting announcements.
     */
    getAnnouncement: function (params) {
      return privateCall('/api/v1/announcement', 'GET', params);
    },

    /**
     * Get urgent announcements.
     *
     */
    getAnnouncementUrgent: function () {
      return privateCall('/api/v1/announcement/urgent', 'GET', {});
    },

    /*
     * ==========================
     * API KEY
     * ==========================
     */

    /**
     * Get API keys.
     *
     * @param {Object} params Params for getting API keys.
     */
    getApiKey: function (params) {
      return privateCall('/api/v1/apiKey', 'GET', params);
    },

    /**
     * Post API keys.
     *
     * @param {Object} params Params for posting API keys.
     */
    postApiKey: function (params) {
      return privateCall('/api/v1/apiKey', 'POST', params);
    },

    /**
     * Delete API keys.
     *
     * @param {Object} params Params for deleting API keys.
     */
    deleteApiKey: function (params) {
      return privateCall('/api/v1/apiKey', 'DELETE', params);
    },

    /**
     * Post disable API keys.
     *
     * @param {Object} params Params for posting disable API keys.
     */
    postApiKeyDisable: function (params) {
      return privateCall('/api/v1/apiKey/disable', 'POST', params);
    },

    /**
     * Post enable API keys.
     *
     * @param {Object} params Params for posting enable API keys.
     */
    postApiKeyEnable: function (params) {
      return privateCall('/api/v1/apiKey/enable', 'POST', params);
    },

    /*
     * ==========================
     * CHAT
     * ==========================
     */

    /**
     * Get chat.
     *
     * @param {Object} params Params for getting chat.
     */
    getChat: function (params) {
      return privateCall('/api/v1/chat', 'GET', params);
    },

    /**
     * Post chat message.
     *
     * @param {Object} params Params for posting chat message.
     */
    postChat: function (params) {
      return privateCall('/api/v1/chat', 'POST', params);
    },

    /**
     * Get chat channels message.
     *
     */
    getChatChannels: function () {
      return privateCall('/api/v1/chat/channels', 'GET', {});
    },

    /**
     * Get chat channels message.
     *
     */
    getChatConnected: function () {
      return privateCall('/api/v1/chat/connected', 'GET', {});
    },

    /*
     * ==========================
     * EXECUTION
     * ==========================
     */

    /**
     * Get raw executions history from account.
     *
     * @param {Object} params Params for getting raw executions history from account.
     */
    getExecution: function (params) {
      return privateCall('/api/v1/execution', 'GET', params);
    },

    /**
     * Get executions trade history.
     *
     * @param {Object} params Params for getting executions trade history.
     */
    getExecutionTradeHistory: function (params) {
      return privateCall('/api/v1/execution/tradeHistory', 'GET', params);
    },

    /*
     * ==========================
     * FUNDING
     * ==========================
     */

    /**
     * Get funding history.
     *
     * @param {Object} params Params for getting funding history.
     */
    getFunding: function (params) {
      return privateCall('/api/v1/funding', 'GET', params);
    },

    /*
     * ==========================
     * GLOBAL NOTIFICATION
     * ==========================
     */

    /**
    * Get global notification.
    *
    */
    getGlobalNotification: function () {
      return privateCall('/api/v1/globalNotification', 'GET', {});
    },

    /*
     * ==========================
     * INSTRUMENT
     * ==========================
     */

    /**
     * Get instruments and indices.
     *
     * @param {Object} params Params for getting instruments and indices.
     */
    getInstrument: function (params) {
      return privateCall('/api/v1/instrument', 'GET', params);
    },

    /**
     * Get active instruments.
     *
     */
    getInstrumentActive: function () {
      return privateCall('/api/v1/instrument/active', 'GET', {});
    },

    /**
     * Get active instruments and indices.
     *
     */
    getInstrumentActiveAndIndices: function () {
      return privateCall('/api/v1/instrument/activeAndIndices', 'GET', {});
    },

    /**
     * Get which pairs are live.
     *
     */
    getInstrumentActiveIntervals: function () {
      return privateCall('/api/v1/instrument/activeIntervals', 'GET', {});
    },

    /**
     * Get composite indices from external prices.
     *
     * @param {Object} params Params for getting composite indices from external prices.
     */
    getInstrumentCompositeIndex: function (params) {
      return privateCall('/api/v1/instrument/compositeIndex', 'GET', params);
    },

    /**
     * Get instrument indices.
     *
     */
    getInstrumentIndices: function () {
      return privateCall('/api/v1/instrument/indices', 'GET', {});
    },

    /*
     * ==========================
     * INSURANCE
     * ==========================
     */

    /**
     * Get insurance.
     *
     * @param {Object} params Params for getting insurance.
     */
    getInsurance: function (params) {
      return privateCall('/api/v1/insurance', 'GET', params);
    },

    /*
     * ==========================
     * LEADERBOARD
     * ==========================
     */

    /**
     * Get leaderboard.
     *
     * @param {Object} params Params for getting leaderboard.
     */
    getLeaderboard: function (params) {
      return privateCall('/api/v1/leaderboard', 'GET', params);
    },

    /**
     * Get leaderboard name.
     *
     * @param {Object} params Params for getting leaderboard name.
     */
    getLeaderboardName: function (params) {
      return privateCall('/api/v1/leaderboard/name', 'GET', params);
    },

    /*
     * ==========================
     * LIQUIDATION
     * ==========================
     */

    /**
     * Get liquidation.
     *
     * @param {Object} params Params for getting liquidation.
     */
    getLiquidation: function (params) {
      return privateCall('/api/v1/liquidation', 'GET', params);
    },

    /*
     * ==========================
     * ORDER
     * ==========================
     */

    /**
     * Get orders.
     *
     * @param {Object} params Params for getting orders.
     */
    getOrder: function (params) {
      return privateCall('/api/v1/order', 'GET', params);
    },

    /**
     * Put amend orders.
     *
     * @param {Object} params Params for putting amend orders.
     */
    putOrder: function (params) {
      return privateCall('/api/v1/order', 'PUT', params);
    },

    /**
     * Post new orders.
     *
     * @param {Object} params Params for posting new orders.
     */
    postOrder: function (params) {
      return privateCall('/api/v1/order', 'POST', params);
    },

    /**
     * Delete orders.
     *
     * @param {Object} params Params for deleting orders.
     */
    deleteOrder: function (params) {
      return privateCall('/api/v1/order', 'DELETE', params);
    },

    /**
     * Delete all orders.
     *
     * @param {Object} params Params for deleting all orders.
     */
    deleteOrderAll: function (params) {
      return privateCall('/api/v1/order/all', 'DELETE', params);
    },

    /**
     * Put amend bulk orders.
     *
     * @param {Object} params Params for putting amend bulk orders.
     */
    putOrderBulk: function (params) {
      return privateCall('/api/v1/order/bulk', 'PUT', params);
    },

    /**
     * Post new bulk orders.
     *
     * @param {Object} params Params for posting new bulk orders.
     */
    postOrderBulk: function (params) {
      return privateCall('/api/v1/order/bulk', 'POST', params);
    },

    /**
     * Post cancel all orders after.
     *
     * @param {Object} params Params for posting cancel all orders after.
     */
    postOrderCancelAllAfter: function (params) {
      return privateCall('/api/v1/order/cancelAllAfter', 'POST', params);
    },

    /**
     * Post close position order.
     *
     * @param {Object} params Params for posting close position orders.
     */
    postOrderClosePosition: function (params) {
      return privateCall('/api/v1/order/closePosition', 'POST', params);
    },

    /*
     * ==========================
     * ORDER BOOK
     * ==========================
     */

    /**
     * Get order book depth.
     *
     * @param {Object} params Params for getting order book depth.
     */
    getOrderBookL2: function (params) {
      return privateCall('/api/v1/orderBook/L2', 'GET', params);
    },

    /*
     * ==========================
     * POSITION
     * ==========================
     */

    /**
     * Get position information.
     *
     * @param {Object} params Params for getting position information.
     */
    getPosition: function (params) {
      return privateCall('/api/v1/position', 'GET', params);
    },

    /**
     * Post position isolate margin.
     *
     * @param {Object} params Params for posting position isolate margin.
     */
    postPositionIsolate: function (params) {
      return privateCall('/api/v1/position/isolate', 'POST', params);
    },

    /**
     * Post position leverage.
     *
     * @param {Object} params Params for posting position leverage.
     */
    postPositionLeverage: function (params) {
      return privateCall('/api/v1/position/leverage', 'POST', params);
    },

    /**
     * Post position risk limit.
     *
     * @param {Object} params Params for posting position risk limit.
     */
    postPositionRiskLimit: function (params) {
      return privateCall('/api/v1/position/riskLimit', 'POST', params);
    },

    /**
     * Post position transfer margin.
     *
     * @param {Object} params Params for posting position transfer margin.
     */
    postPositionTransferMargin: function (params) {
      return privateCall('/api/v1/position/transferMargin', 'POST', params);
    },

    /*
     * ==========================
     * QUOTE
     * ==========================
     */

    /**
     * Get quote.
     *
     * @param {Object} params Params for getting quote.
     */
    getQuote: function (params) {
      return privateCall('/api/v1/quote', 'GET', params);
    },

    /**
     * Get quote bucketed by timestamps.
     *
     * @param {Object} params Params for getting quote bucketed by timestamps.
     */
    getQuoteBucketed: function (params) {
      return privateCall('/api/v1/quote/bucketed', 'GET', params);
    },

    /*
     * ==========================
     * SCHEMA
     * ==========================
     */

    /**
     * Get schema models.
     *
     * @param {Object} params Params for getting schema models.
     */
    getSchema: function (params) {
      return privateCall('/api/v1/schema', 'GET', params);
    },

    /**
     * Get websocket schema help.
     *
     */
    getSchemaWebsocketHelp: function () {
      return privateCall('/api/v1/schema/websocketHelp', 'GET', {});
    },

    /*
     * ==========================
     * SETTLEMENT
     * ==========================
     */

    /**
     * Get instrument settlement.
     *
     * @param {Object} params Params for getting instrument settlement.
     */
    getSettlement: function (params) {
      return privateCall('/api/v1/settlement', 'GET', params);
    },

    /*
     * ==========================
     * STATS
     * ==========================
     */

    /**
     * Get exchange statistics.
     *
     */
    getStats: function () {
      return privateCall('/api/v1/stats', 'GET', {});
    },

    /**
     * Get stats history.
     *
     */
    getStatsHistory: function () {
      return privateCall('/api/v1/stats/history', 'GET', {});
    },

    /**
     * Get stats history USD.
     *
     */
    getStatsHistoryUsd: function () {
      return privateCall('/api/v1/stats/historyUSD', 'GET', {});
    },

    /*
     * ==========================
     * TRADE
     * ==========================
     */

    /**
     * Get execution trades.
     *
     * @param {Object} params Params for getting execution trades.
     */
    getTrade: function (params) {
      return privateCall('/api/v1/trade', 'GET', params);
    },

    /**
     * Get bucketed execution trades.
     *
     * @param {Object} params Params for getting bucketed execution trades.
     */
    getTradeBucketed: function (params) {
      return privateCall('/api/v1/trade/bucketed', 'GET', params);
    },

    /*
     * ==========================
     * USER
     * ==========================
     */

    /**
     * Get user account information.
     *
     */
    getUser: function () {
      return privateCall('/api/v1/user', 'GET', {});
    },

    /**
     * Get user affiliate status.
     *
     */
    getUserAffiliateStatus: function () {
      return privateCall('/api/v1/user/affiliateStatus', 'GET', {});
    },

    /**
     * Post user cancel withdrawal.
     *
     * @param {Object} params Params for posting user cancel withdrawal.
     */
    postUserCancelWithdrawal: function (params) {
      return privateCall('/api/v1/user/cancelWithdrawal', 'POST', params);
    },

    /**
     * Get if referral code is valid.
     *
     * @param {Object} params Params for getting if referral code is valid.
     */
    getUserCheckReferralCode: function (params) {
      return privateCall('/api/v1/user/checkReferralCode', 'GET', params);
    },

    /**
     * Get user commission.
     *
     */
    getUserCommission: function () {
      return privateCall('/api/v1/user/commission', 'GET', {});
    },

    /**
     * Post user communication token.
     *
     * @param {Object} params Params for posting user communication token.
     */
    postUserCommunicationToken: function (params) {
      return privateCall('/api/v1/user/communicationToken', 'POST', params);
    },

    /**
     * Post confirm user email.
     *
     * @param {Object} params Params for posting confirm user email.
     */
    postUserConfirmEmail: function (params) {
      return privateCall('/api/v1/user/confirmEmail', 'POST', params);
    },

    /**
     * Post confirm account withdrawal.
     *
     * @param {Object} params Params for posting confirm account withdrawal.
     */
    postUserConfirmWithdrawal: function (params) {
      return privateCall('/api/v1/user/confirmWithdrawal', 'POST', params);
    },

    /**
     * Get user deposit address.
     *
     * @param {Object} params Params for getting user deposit address.
     */
    getUserDepositAddress: function (params) {
      return privateCall('/api/v1/user/depositAddress', 'GET', params);
    },

    /**
     * Get user execution history.
     *
     * @param {Object} params Params for getting user execution history.
     */
    getUserExecutionHistory: function (params) {
      return privateCall('/api/v1/user/executionHistory', 'GET', params);
    },

    /**
     * Post user logout.
     *
     */
    postUserLogout: function () {
      return privateCall('/api/v1/user/logout', 'POST', {});
    },

    /**
     * Get user margin.
     *
     * @param {Object} params Params for getting user margin.
     */
    getUserMargin: function (params) {
      return privateCall('/api/v1/user/margin', 'GET', params);
    },

    /**
     * Get user minimum withdrawal fee.
     *
     * @param {Object} params Params for getting user minimum withdrawal fee.
     */
    getUserMinWithdrawalFee: function (params) {
      return privateCall('/api/v1/user/minWithdrawalFee', 'GET', params);
    },

    /**
     * Post user preferences settings.
     *
     * @param {Object} params Params for posting user preferences settings.
     */
    postUserPreferences: function (params) {
      return privateCall('/api/v1/user/preferences', 'POST', params);
    },

    /**
     * Post request for withdrawal.
     *
     * @param {Object} params Params for posting request for withdrawal.
     */
    postUserRequestWithdrawal: function (params) {
      return privateCall('/api/v1/user/requestWithdrawal', 'POST', params);
    },

    /**
     * Get user wallet.
     *
     * @param {Object} params Params for getting user wallet.
     */
    getUserWallet: function (params) {
      return privateCall('/api/v1/user/wallet', 'GET', params);
    },

    /**
     * Get user wallet history.
     *
     * @param {Object} params Params for getting user wallet history.
     */
    getUserWalletHistory: function (params) {
      return privateCall('/api/v1/user/walletHistory', 'GET', params);
    },

    /**
     * Get user wallet summary.
     *
     * @param {Object} params Params for getting user wallet summary.
     */
    getUserWalletSummary: function (params) {
      return privateCall('/api/v1/user/walletSummary', 'GET', params);
    },

    /*
     * ==========================
     * USER EVENT
     * ==========================
     */

    /**
     * Get user event.
     *
     * @param {Object} params Params for getting user event.
     */
    getUserEvent: function (params) {
      return privateCall('/api/v1/userEvent', 'GET', params);
    },

  };
};
