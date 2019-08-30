const publicCallCreator = require('./calls/public-call');
const privateCallCreator = require('./calls/private-call');

const BASE_URL = 'https://www.okex.com';

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

    /*
     * ==========================
     * FUNDING ACCOUNT API
     * ==========================
     */

    /**
     * Get account wallet information.
     *
     */
    getAccountWallet: function () {
      return privateCall('/api/account/v3/wallet', 'GET', null, null);
    },

    /**
     * Get account wallet currency information.
     *
     * @param {string} currency Currency for getting account wallet currency information.
     */
    getAccountWalletCurrency: function (currency) {
      return privateCall(`/api/account/v3/wallet/${currency}`, 'GET', null, null);
    },

    /**
     * Post account transfer.
     *
     * @param {Object} params Params for posting account transfer.
     */
    postAccountTransfer: function (params) {
      return privateCall('/api/account/v3/transfer', 'POST', null, params);
    },

    /**
     * Post account withdrawal.
     *
     * @param {Object} params Params for posting account withdrawal.
     */
    postAccountWithdrawal: function (params) {
      return privateCall('/api/account/v3/withdrawal', 'POST', null, params);
    },

    /**
     * Get recent withdrawal history.
     *
     */
    getAccountWithdrawalHistory: function () {
      return privateCall('/api/account/v3/withdrawal/history', 'GET',
        null, null);
    },

    /**
     * Get recent withdrawal history of a currency.
     * 
     * @param {string} currency Currency for getting recent withdawal history of a currency.
     */
    getAccountWithdrawalHistoryCurrency: function (currency) {
      return privateCall(`/api/account/v3/withdrawal/history/${currency}`, 'GET',
        null, null);
    },

    /**
     * Get account ledger information.
     * 
     * @param {Object} params Params for getting account ledger information.
     */
    getAccountLedger: function (params) {
      return privateCall('/api/account/v3/ledger', 'GET', params, null);
    },

    /**
     * Get account deposit address.
     * 
     * @param {Object} params Params for getting account deposit address.
     */
    getAccountDepositAddress: function (params) {
      return privateCall('/api/account/v3/deposit/address', 'GET', params,
        null);
    },

    /**
     * Get account deposit address history.
     * 
     */
    getAccountDepositHistory: function () {
      return privateCall('/api/account/v3/deposit/history', 'GET', null, null);
    },

    /**
     * Get account deposit address history of currency.
     * 
     * @param {string} params Params for getting account deposit address history of currency.
     */
    getAccountDepositHistoryCurrency: function (params) {
      return privateCall(`/api/account/v3/deposit/address/${params}`, 'GET',
        null, null);
    },

    /**
     * Get list of currencies and funding information.
     * 
     */
    getAccountCurrencies: function () {
      return privateCall('/api/account/v3/currencies', 'GET', null, null);
    },

    /**
     * Get account withdrawal fees.
     * 
     * @param {Object} params Params for getting account withdrawal fees.
     */
    getAccountWithdrawalFee: function (params) {
      return privateCall('/api/account/v3/withdrawal/fee', 'GET', params,
        null);
    },

    /*
     * ==========================
     * TOKEN TRADING API
     * ==========================
     */

    /**
     * Get list of asset information in spot account.
     * 
     */
    getSpotAccounts: function () {
      return privateCall('/api/spot/v3/accounts', 'GET', null, null);
    },

    /**
     * Get list of asset information for currency in spot account.
     * 
     * @param {string} currency Currency for getting a list of asset information for currency in spot account.
     */
    getSpotAccountsCurrency: function (currency) {
      return privateCall(`/api/spot/v3/accounts/${currency}`, 'GET', null, null);
    },

    /**
     * Get spot account currency ledger information.
     * 
     * @param {string} currency Currency for getting spot account currency ledger information.
     * @param {Object} params Params for getting spot account currency ledger information.
     */
    getSpotAccountsCurrencyLedger: function (currency, params) {
      return privateCall(`/api/spot/v3/accounts/${currency}/ledger`, 'GET', params, null);
    },

    /**
     * Post an order in the spot market.
     * 
     * @param {Object} params Params for posting an order in the spot market.
     */
    postSpotOrders: function (params) {
      return privateCall('/api/spot/v3/orders', 'POST', null, params);
    },

    /**
     * Post multiple orders in the spot market.
     * 
     * @param {Object} params Params for posting multiple orders in the spot market.
     */
    postSpotBatchOrders: function (params) {
      return privateCall('/api/spot/v3/batch_orders', 'POST', null, params);
    },

    /**
     * Post cancel spot order.
     * 
     * @param {Object} orderId Spot order id for posting cancel order.
     */
    postSpotCancelOrdersOrderId: function (orderId) {
      return privateCall(`/api/spot/v3/cancel_orders/${orderId}`, 'POST', null, null);
    },

    /**
     * Post cancel all orders for single or multiple instruments.
     * 
     * @param {Object} params Params for posting cancel all orders for singel or multiple instruments.
     */
    postSpotCancelBatchOrders: function (params) {
      return privateCall('/api/spot/v3/cancel_batch_orders', 'POST', null, params);
    },

    /**
     * Get spot orders list.
     * 
     * @param {Object} params Params for getting spot orders list.
     */
    getSpotOrders: function (params) {
      return privateCall('/api/spot/v3/orders', 'GET', params, null);
    },

    /**
     * Get open spot orders list.
     * 
     * @param {Object} params Params for getting open spot orders list.
     */
    getSpotOrdersPending: function (params) {
      return privateCall('/api/spot/v3/orders_pending', 'GET', params, null);
    },

    /**
     * Get spot order details.
     * 
     * @param {string} orderId Order id for getting order details.
     * @param {Object} params Params for getting spot order details.
     */
    getSpotOrdersOrderId: function (orderId, params) {
      return privateCall(`/api/spot/v3/orders/${orderId}`, 'GET', params, null);
    },

    /**
     * Get spot transaction details from filled orders.
     * 
     * @param {Object} params Params for getting spot transaction details from filled orders.
     */
    getSpotFills: function (params) {
      return privateCall('/api/spot/v3/fills', 'GET', params, null);
    },

    /**
     * Get market data.
     * 
     */
    getSpotInstruments: function () {
      return publicCall('/api/spot/v3/instruments', 'GET', null);
    },

    /**
     * Get order book data of an instrument.
     * 
     * @param {string} instrumentId Instrument id for getting order book data.
     * @param {Object} params Params for getting order book data of an instrument.
     */
    getSpotInstrumentsInstrumentIdBook: function (instrumentId, params) {
      return publicCall(`/api/spot/v3/instruments/${instrumentId}/book`,
        'GET', params);
    },

    /**
     * Get last traded price information.
     * 
     */
    getSpotInstrumentsTicker: function () {
      return publicCall('/api/spot/v3/instruments/ticker', 'GET', null);
    },

    /**
     * Get last traded price information of an instrument.
     * 
     * @param {string} instrumentId Instrument id for getting last traded price information.
     */
    getSpotInstrumentsInstrumentIdTicker: function (instrumentId) {
      return publicCall(`/api/spot/v3/instruments/${instrumentId}/ticker`, 'GET', null);
    },

    /**
     * Get last 60 trades from an instrument.
     * 
     * @param {string} instrumentId Instrument id for getting last 60 trades.
     * @param {Object} params Params for getting last 60 trades from an instrument.
     */
    getSpotInstrumentsInstrumentIdTrades: function (instrumentId, params) {
      return publicCall(`/api/spot/v3/instruments/${instrumentId}/trades`, 'GET', params);
    },

    /**
     * Get market charts of a trading instrument.
     * 
     * @param {string} instrumentId Instrument id for getting market charts.
     * @param {Object} params Params for getting market charts of a trading instrument.
     */
    getSpotInstrumentsInstrumentIdTrades: function (instrumentId, params) {
      return publicCall(`/api/spot/v3/instruments/${instrumentId}/candles`, 'GET', params);
    },

    /*
     * ==========================
     * MARGIN TRADING API
     * ==========================
     */

    /**
     * Gets user margin account information.
     * 
     */
    getMarginAccounts: function () {
      return privateCall('/api/margin/v3/accounts', 'GET', null, null);
    },

    /**
     * Gets user margin account information for a currency.
     * 
     * @param {string} instrumentId Instrument id for getting user margin account information for a currency.
     */
    getMarginAccountsInstrumentId: function (instrumentId) {
      return privateCall(`/api/margin/v3/accounts/${instrumentId}`, 'GET', null, null);
    },

    /**
     * Get user margin account ledger information.
     * 
     * @param {string} instrumentId Instrument id for getting user margin account ledger information.
     * @param {Object} params Params for getting user margin account ledger information.
     */
    getMarginAccountsInstrumentIdLedger: function (instrumentId, params) {
      return privateCall(`/api/margin/v3/accounts/${instrumentId}/ledger`,
        'GET', params, null);
    },

    /**
     * Gets all user margin account information.
     * 
     */
    getMarginAccountsAvailability: function () {
      return privateCall('/api/margin/v3/accounts/availability', 'GET', null, null);
    },

    /**
     * Get all user margin account information for a currency.
     * 
     * @param {string} instrumentId Instrument id for getting all user margin account information for a currency.
     */
    getMarginAccountsAvailabilityInstrumentId: function (instrumentId) {
      return privateCall(`/api/margin/v3/accounts/${instrumentId}`
        + '/availability', 'GET', null, null);
    },

    /**
     * Gets margin account loan history.
     * 
     * @param {Object} params Params for getting margin account loan history.
     */
    getMarginAccountsBorrowed: function (params) {
      return privateCall('/api/margin/v3/accounts/borrowed', 'GET', params, null);
    },

    /**
     * Gets margin account loan history for a currency.
     * 
     * @param {string} instrumentId Instrument id for getting margin account loan history for a currency.
     * @param {Object} params Params for getting margin account loan history for a currency.
     */
    getMarginAccountsInstrumentIdBorrowed: function (instrumentId, params) {
      return privateCall(`/api/margin/v3/accounts/${instrumentId}/borrowed`,
        'GET', params, null);
    },

    /**
     * Posts a loan for a currency.
     * 
     * @param {Object} params Params for posting a loan for a currency.
     */
    postMarginAccountsBorrow: function (params) {
      return privateCall('/api/margin/v3/accounts/borrow', 'POST', null, params);
    },

    /**
     * Post a repay of loans in a margin account.
     * 
     * @param {Object} params Params for posting a repay of loans in a margin account.
     */
    postMarginAcccountRepayment: function (params) {
      return privateCall('/api/margin/v3/accounts/repayment', 'POST', null, params);
    },

    /**
     * Post a new margin order.
     * 
     * @param {Object} params Params for posting a new margin order.
     */
    postMarginOrders: function (params) {
      return privateCall('/api/margin/v3/orders', 'POST', null, params);
    },

    /**
     * Post a new multiple margin orders.
     * 
     * @param {Object} params Params for posting a new multiple margin orders.
     */
    postMarginBatchOrders: function (params) {
      return privateCall('/api/margin/v3/batch_orders', 'POST', null, params);
    },

    /**
     * Post a cancelation for a margin open order.
     * 
     * @param {string} orderId Order id of margin open order.
     * @param {Object} params Params for posting a cancelation for a margin open order.
     */
    getMarginCancelOrders: function (orderId, params) {
      return privateCall(`/api/margin/v3/cancel_orders/${orderId}`, 'GET',
        null, params);
    },

    /**
     * Post a cancelation for multiple margin open orders.
     * 
     * @param {Object} params Params for posting a cancelation for multiple margin open orders.
     */
    postMarginCancelBatchOrders: function (params) {
      return privateCall('/api/margin/v3/cancel_batch_orders', 'POST',
        null, params);
    },

    /**
     * Get margin orders list.
     * 
     * @param {Object} params Params for getting margin orders list.
     */
    getMarginOrders: function (params) {
      return privateCall('/api/margin/v3/orders', 'GET', params, null);
    },

    /**
     * Get margin order details.
     * 
     * @param {Object} orderId Margin order id for getting details.
     * @param {Object} params Params for getting margin order details.
     */
    getMarginOrdersOrderId: function (orderId, params) {
      return privateCall(`/api/margin/v3/orders/${orderId}`, 'GET',
        params, null);
    },

    /**
     * Get all margin open orders.
     * 
     * @param {Object} params Params for getting all margin open orders.
     */
    getMarginOrdersPending: function (params) {
      return privateCall('/api/margin/v3/orders_pending', 'GET', params, null);
    },

    /**
     * Get details for recently filled margin orders.
     * 
     * @param {Object} params Params for getting details for recently filled margin orders.
     */
    getMarginFills: function (params) {
      return privateCall('/api/margin/v3/fills', 'GET', params, null);
    },

    /*
     * ==========================
     * FUTURES TRADING API
     * ==========================
     */

    /**
     * Get information of all open positions.
     * 
     */
    getFuturesPosition: function () {
      return privateCall('/api/futures/v3/position', 'GET', null, null);
    },

    /**
     * Get information of open positions for a contract.
     * 
     * @param {string} instrumentId Instrument id for getting information of open position.
     */
    getFuturesInstrumentIdPosition: function (instrumentId) {
      return privateCall(`/api/futures/v3/${instrumentId}/position`,
        'GET', null, null);
    },

    /**
     * Get future account information of all currencies.
     * 
     */
    getFuturesAccounts: function () {
      return privateCall(`/api/futures/v3/accounts`, 'GET', null, null);
    },

    /**
     * Get future account information of a currency.
     * 
     * @param {string} currency Currency for getting account information.
     */
    getFuturesAccountsInstrumentId: function (currency) {
      return privateCall(`/api/futures/v3/accounts/${currency}`,
        'GET', null, null);
    },

    /**
     * Get leverage of the futures account.
     * 
     * @param {string} currency Currency to get leverage of the futures account.
     */
    getFuturesAccountsCurrencyLeverage: function (currency) {
      return privateCall(`/api/futures/v3/accounts/${currency}/leverage`,
        'GET', null, null);
    },

    /**
     * Get leverage of the futures account.
     * 
     * @param {string} currency Currency to get leverage of the futures account.
     */
    getFuturesAccountsCurrencyLeverage: function (currency) {
      return privateCall(`/api/futures/v3/accounts/${currency}/leverage`,
        'GET', null, null);
    },

    /**
     * Post leverage of the futures account.
     * 
     * @param {string} currency Currency to post leverage of the futures account.
     * @param {Object} params Params for posting leverage of the furures account.
     */
    postFuturesAccountsCurrencyLeverage: function (currency, params) {
      return privateCall(`/api/futures/v3/accounts/${currency}/leverage`,
        'POST', null, params);
    },

    /**
     * Get account historical ledger information.
     * 
     * @param {string} currency Currency for getting account historical ledger information.
     * @param {Object} params Params for getting account historical ledger information.
     */
    getFuturesAccountsCurrencyLedger: function (currency, params) {
      return privateCall(`/api/futures/v3/accounts/${currency}/ledger`, 'GET', params, null);
    },

    /**
     * Post a futures order.
     * 
     * @param {Object} params Params for posting a futures order.
     */
    postFuturesOrder: function (params) {
      return privateCall('/api/futures/v3/order', 'POST', null, params);
    },

    /**
     * Post multiple futures orders.
     * 
     * @param {Object} params Params for posting multiple futures orders.
     */
    postFuturesOrders: function (params) {
      return privateCall('/api/futures/v3/orders', 'POST', null, params);
    },

    /**
     * Post cancel a futures open order.
     * 
     * @param {string} instrumentId Instrument id of the futures order to be cancelled.
     * @param {string} orderId Order id of the futures order to be cancelled.
     */
    postFuturesCancelOrderInstrumentIdOrderId: function (instrumentId,
      orderId) {
      return privateCall(`/api/futures/v3/cancel_order/${instrumentId}/${orderId}`,
        'POST', null, null);
    },

    /**
     * Post cancel multiple futures open orders.
     * 
     * @param {string} instrumentId Instrument id of the multiple futures open order to be cancelled.
     * @param {Object} params Params for posting cancel multiple futures open orders.
     */
    postFuturesCancelBatchOrdersInstrumentId: function (instrumentId, params) {
      return privateCall(`/api/futures/v3/cancel_batch_orders/${instrumentId}`,
        'POST', null, params);
    },

    /**
     * Get list of futures orders.
     * 
     * @param {string} instrumentId Instrument id for getting list of futures orders.
     * @param {Object} params Params for getting listo of future orders.
     */
    getFuturesOrdersInstrumentId: function (instrumentId, params) {
      return privateCall(`/api/futures/v3/orders/${instrumentId}`, 'GET',
        null, params);
    },

    /**
     * Get futures order details.
     * 
     * @param {string} instrumentId Instrument id of the futures order to get details.
     * @param {string} orderId Order id of the futures order to get details.
     */
    getFuturesInstrumentIdOrderId: function (instrumentId, orderId) {
      return privateCall(`/api/futures/v3/orders/${instrumentId}/${orderId}`,
        'GET', null, null);
    },

    /**
     * Get details of recent filled orders.
     * 
     * @param {Object} params Params for getting details of recent filled orders.
     */
    getFuturesFills: function (params) {
      return privateCall('/api/futures/v3/fills', 'GET', params, null);
    },

    /**
     * Get futures contract market information.
     * 
     */
    getFuturesInstruments: function () {
      return privateCall('/api/futures/v3/instruments', 'GET', null, null);
    },

    /**
     * Post contract token account mode.
     * 
     * @param {Object} params Params for posting contract token account mode.
     */
    postFuturesAccountsMarginMode: function (params) {
      return privateCall('/api/futures/v3/accounts/margin_mode', 'POST',
        null, params);
    },

    /**
     * Post market close all open positions for BTC.
     * 
     * @param {Object} params Params for posting market close all open positions for BTC.
     */
    postFuturesClosePosition: function (params) {
      return privateCall('/api/futures/v3/close_position', 'POST',
        null, params);
    },

    /**
     * Post cancel all close futures orders.
     * 
     * @param {Object} params Params for posting cancel all close futures orders.
     */
    postFuturesCancelAll: function (params) {
      return privateCall('/api/futures/v3/cancel_all', 'POST', null, params);
    },

    /**
     * Get futures open position.
     * 
     * @param {string} instrumentId Instrument id for getting open position.
     */
    getFuturesAccountsInstrumentIdHolds: function (instrumentId) {
      return privateCall(`/api/futures/v3/accounts/${instrumentId}/holds`,
        'POST', null, null);
    },

    /**
     * Get full order book for an instrument id.
     * 
     * @param {string} instrumentId Instrument id to get full order book.
     * @param {Object} params Params for getting full order book for an instrument id.
     */
    postFuturesInstrumentsInstrumentIdBook: function (instrumentId, params) {
      return publicCall(`/api/futures/v3/instruments/${instrumentId}/book`,
        'GET', params);
    },

    /**
     * Get last traded information for all futures contracts.
     * 
     */
    getFuturesInstrumentsTicker: function () {
      return publicCall('/api/futures/v3/instruments/ticker', 'GET', null);
    },

    /**
     * Get last traded information for a futures contract.
     * 
     * @param {string} instrumentId Instrument id to get last traded information.
     */
    getFuturesInstrumentsInstrumentIdTicker: function (instrumentId) {
      return publicCall(`/api/futures/v3/instruments/${instrumentId}/ticker`, 'GET', null);
    },

    /**
     * Get the most recent 300 transactions of a contract.
     * 
     * @param {string} instrumentId Instrument id to get most recent 300 transactions.
     * @param {Object} params Params for getting the most recent 300 transactions of a contract.
     */
    getFuturesInstrumentsInstrumentIdTrades: function (instrumentId, params) {
      return publicCall(`/api/futures/v3/instruments/${instrumentId}/trades`,
        'GET', params);
    },

    /**
     * Get the trading charts of a trading contract.
     * 
     * @param {string} instrumentId Instrument id for getting the trading charts.
     * @param {Object} params Params for getting the trading charts of a trading contract.
     */
    getFuturesInstrumentsInstrumentIdCandles: function (instrumentId, params) {
      return publicCall(`/api/futures/v3/instruments/${instrumentId}/candles`,
        'GET', params);
    },

    /**
     * Get futures market indices.
     * 
     * @param {string} instrumentId Instrument id to get futures market indices.
     */
    getFuturesInstrumentsInstrumentIdIndex: function (instrumentId) {
      return publicCall(`/api/futures/v3/instruments/${instrumentId}/index`,
        'GET', params);
    },

    /**
     * Get fiat exchange rates.
     * 
     */
    getFuturesRate: function () {
      return publicCall('/api/futures/v3/rate', 'GET', params);
    },

    /**
     * Get futures estimated delivery price.
     * 
     * @param {string} instrumentId Instrument id to get futures estimated delivery price.
     */
    getFuturesInstrumentsInstrumentIdEstimatedPrice: function (instrumentId) {
      return publicCall(`/api/futures/v3/instruments/${instrumentId}`
        + '/estimated_price', 'GET', null);
    },

    /**
     * Get open interest of a futures contract.
     * 
     * @param {string} instrumentId Instrument id to get open insterest.
     */
    getFuturesInstrumentsInstrumentIdOpenInterest: function (instrumentId) {
      return publicCall(`/api/futures/v3/instruments/${instrumentId}/open_interest`, 'GET', null);
    },

    /**
     * Get minimum selling price and maximum buying price of a futures contract.
     * 
     * @param {string} instrumentId Instrument id to get minimum selling price and maximum buying price.
     */
    getFuturesInstrumentsInstrumentIdPriceLimit: function (instrumentId) {
      return publicCall(`/api/futures/v3/instruments/${instrumentId}`
        + '/price_limit', 'GET', null);
    },

    /**
     * Get force liquidated futures orders.
     * 
     * @param {string} instrumentId Instrument id to get liquidated futures orders.
     * @param {Object} params Params for getting force liquidated futures orders.
     */
    getFuturesInstrumentsInstrumentIdLiquidation: function (instrumentId, params) {
      return publicCall(`/api/futures/v3/instruments/${instrumentId}`
        + '/liquidation', 'GET', params);
    },

    /**
     * Get tag price of a futures contract.
     * 
     * @param {string} instrumentId Instrument id to get tag price.
     */
    getFuturesInstrumentsInstrumentIdMarkPrice: function (instrumentId) {
      return publicCall(`/api/futures/v3/instruments/${instrumentId}`
        + '/mark_price', 'GET', null);
    },

    /*
     * ==========================
     * PERPETUAL SWAP API
     * ==========================
     */


    /**
     * Get information of all trading positions from the Perpetual SWAP contract.
     * 
     */
    getSwapPosition: function () {
      return privateCall('/api/swap/v3/position', 'GET', null);
    },

    /**
     * Get information of all trading positions from a currency from the Perpetual SWAP contract.
     * 
     * @param {string} instrumentId Instrument id fot getting information of all trading positions from Perpetual SWAP contract.
     */
    getSwapInstrumentIdPosition: function (instrumentId) {
      return privateCall(`/api/swap/v3/${instrumentId}/position`, 'GET', null);
    },

    /**
     * Get accounts information from the Perpetual SWAP contract.
     * 
     */
    getSwapAccounts: function () {
      return privateCall('/api/swap/v3/accounts', 'GET', null);
    },

    /**
     * Get accounts information from the Perpetual SWAP contract from a currency.
     * 
     * @param {string} instrumentId Instrument id fot getting accounts information from the Pertual SWAP.
     */
    getSwapInstrumentIdAccounts: function (instrumentId) {
      return privateCall(`/api/swap/v3/${instrumentId}/accounts`, 'GET', null);
    },

    /**
     * Get the leverage ratio and margin of the Perpetual SWAP contract.
     * 
     * @param {string} instrumentId .
     */
    getSwapInstrumentIdAccounts: function (instrumentId) {
      return privateCall(`/api/swap/v3/${instrumentId}/accounts`, 'GET', null);
    },
  };
};
