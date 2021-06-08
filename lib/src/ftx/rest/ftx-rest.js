const publicCallCreator = require('./calls/public-call');
const privateCallCreator = require('./calls/private-call');

const BASE_URL = 'https://ftx.com';

/**
 * Main library wrapper for FTX REST API.
 *
 * @param {string} apiKey API Key created from the user account.
 * @param {string} apiSecret API Secret created from the user account.
 */
module.exports = function Ftx(apiKey, apiSecret, apiSubaccount) {
  const client = {};
  const publicCall = publicCallCreator(BASE_URL);
  const privateCall = privateCallCreator(BASE_URL, apiKey, apiSecret, apiSubaccount);
  // SUBACCOUNTS
  client.getSubaccounts = function () {
    return privateCall(`/api/subaccounts`, 'GET', null, null);
  };
  client.postSubaccounts = function (params) {
    return privateCall(`/api/subaccounts`, 'POST', null, params);
  };
  client.postSubaccountsUpdateName = function (params) {
    return privateCall(`/api/subaccounts/update_name`, 'POST', null, params);
  };
  client.deleteSubaccounts = function (params) {
    return privateCall(`/api/subaccounts`, 'DELETE', null, params);
  };
  client.getSubaccountsNicknameBalances = function (params) {
    return privateCall(`/api/subaccounts/${params.nickname}/balances`, 'GET', null, null);
  };
  client.postSubaccountsTransfer = function (params) {
    return privateCall(`/api/subaccounts/transfer`, 'POST', null, params);
  };
  // MARKETS
  client.getMarkets = function () {
    return publicCall(`/api/markets`, 'GET', null, null);
  };
  client.getMarketsMarketName = function (params) {
    return publicCall(`/api/markets/${params.market_name}`, 'GET', null, null);
  };
  client.getMarketsMarketNameOrderBook = function (params) {
    return publicCall(`/api/markets/${params.market_name}/orderbook`, 'GET', params, null);
  };
  client.getMarketsMarketNameTrades = function (params) {
    return publicCall(`/api/markets/${params.market_name}/trades`, 'GET', params, null);
  };
  client.getMarketsMarketNameCandles = function (params) {
    return publicCall(`/api/markets/${params.market_name}/candles`, 'GET', params, null);
  };
  // FUTURES
  client.getFutures = function () {
    return publicCall(`/api/futures`, 'GET', null, null);
  };
  client.getFuturesFutureName = function (params) {
    return publicCall(`/api/futures/${params.future_name}`, 'GET', null, null);
  };
  client.getFuturesFutureNameStats = function (params) {
    return publicCall(`/api/futures/${params.future_name}/stats`, 'GET', null, null);
  };
  client.getFundingRates = function (params) {
    return publicCall(`/api/funding_rates`, 'GET', params, null);
  };
  client.getIndexesIndexNameWeights = function (params) {
    return publicCall(`/api/indexes/${params.index_name}/weights`, 'GET', null, null);
  };
  client.getExpiredFutures = function () {
    return publicCall(`/api/expired_futures`, 'GET', null, null);
  };
  client.getIndexesMarketNameCandles = function (params) {
    return publicCall(`/api/indexes/${params.market_name}/candles`, 'GET', params, null);
  };
  // ACCOUNT
  client.getAccount = function () {
    return privateCall(`/api/account`, 'GET', null, null);
  };
  client.getPositions = function (params) {
    return privateCall(`/api/positions`, 'GET', params, null);
  };
  client.postAccountLeverage = function (params) {
    return privateCall(`/api/account/leverage`, 'POST', null, params);
  };
  // WALLET
  client.getWalletCoins = function () {
    return privateCall(`/api/wallet/coins`, 'GET', null, null);
  };
  client.getWalletBalances = function () {
    return privateCall(`/api/wallet/balances`, 'GET', null, null);
  };
  client.getWalletAllBalances = function () {
    return privateCall(`/api/wallet/all_balances`, 'GET', null, null);
  };
  client.getWalletDepositAddressCoin = function (params) {
    return privateCall(`/api/wallet/deposit_address/${params.coin}`, 'GET', params, null);
  };
  client.getWalletDeposits = function (params) {
    return privateCall(`/api/wallet/deposits`, 'GET', params, null);
  };
  client.getWalletWithdrawals = function (params) {
    return privateCall(`/api/wallet/withdrawals`, 'GET', params, null);
  };
  client.postWalletWithdrawals = function (params) {
    return privateCall(`/api/wallet/withdrawals`, 'POST', null, params);
  };
  client.getWalletAirdrops = function (params) {
    return privateCall(`/api/wallet/airdrops`, 'GET', params, null);
  };
  client.getWalletWithdrawalFee = function (params) {
    return privateCall(`/api/wallet/withdrawal_fee`, 'GET', params, null);
  };
  client.getWalletSavedAddresses = function (params) {
    return privateCall(`/api/wallet/saved_addresses`, 'GET', params, null);
  };
  client.postWalletSavedAddresses = function (params) {
    return privateCall(`/api/wallet/saved_addresses`, 'POST', null, params);
  };
  client.deleteWalletSavedAddresses = function (params) {
    return privateCall(`/api/wallet/saved_addresses/${params.saved_address_id}`, 'DELETE', null, null);
  };
  // ORDERS
  client.getOrders = function (params) {
    return privateCall(`/api/orders`, 'GET', null, null);
  };
  client.getOrdersHistory = function (params) {
    return privateCall(`/api/orders/history`, 'GET', null, null);
  };
  client.getConditionalOrders = function (params) {
    return privateCall(`/api/conditional_orders`, 'GET', null, null);
  };
  client.getConditionalOrdersConditionalOrderIdTriggers = function (params) {
    return privateCall(`/api/conditional_orders/${params.conditional_order_id}/triggers`, 'GET', null, null);
  };
  client.getConditionalOrdersHistory = function (params) {
    return privateCall(`/api/conditional_orders/history`, 'GET', params, null);
  };
  client.postOrders = function (params) {
    return privateCall(`/api/orders`, 'POST', null, params);
  };
  client.postConditionalOrders = function (params) {
    return privateCall(`/api/conditional_orders`, 'POST', null, params);
  };
  client.postOrdersOrderIdModify = function (params) {
    return privateCall(`/api/orders/${params.order_id}/modify`, 'POST', null, params);
  };
  client.postOrdersByClientIdClientOrderIdModify = function (params) {
    return privateCall(`/api/orders/by_client_id/${params.client_order_id}/modify`, 'POST', null, params);
  };
  client.postConditionalOrdersOrderIdModify = function (params) {
    return privateCall(`/api/conditional_orders/${params.order_id}/modify`, 'POST', null, params);
  };
  client.getOrdersOrderId = function (params) {
    return privateCall(`/api/orders/${params.order_id}`, 'GET', null, null);
  };
  client.getOrdersByClientIdCLientOrderId = function (params) {
    return privateCall(`/api/orders/by_client_id/${params.client_order_id}`, 'GET', null, null);
  };
  client.deleteOrdersOrderId = function (params) {
    return privateCall(`/api/orders/${params.order_id}`, 'DELETE', null, null);
  };
  client.deleteOrdersByClientIdClientOrderId = function (params) {
    return privateCall(`/api/orders/by_client_id/${params.client_order_id}`, 'DELETE', null);
  };
  client.deleteConditionalOrdersConditionalOrderId = function (params) {
    return privateCall(`/api/conditional_orders/${params.conditional_order_id}`, 'DELETE', null);
  };
  client.deleteOrders = function (params) {
    return privateCall(`/api/orders`, 'DELETE', null, params);
  };
  // CONVERT
  client.postOtcQuotes = function (params) {
    return privateCall(`/api/otc/quotes`, 'POST', null, params);
  };
  client.getOtcQuotesQuoteId = function (params) {
    return privateCall(`/api/otc/quotes/${params.quote_id}`, 'GET', null, null);
  };
  client.postOtcQuotesQuoteIdAccept = function (params) {
    return privateCall(`/api/otc/quotes/${params.quote_id}/accept`, 'POST', null, null);
  };
  // SPOT MARGIN
  client.getSpotMarginHistory = function () {
    return privateCall(`/api/spot_margin/history`, 'GET', null, null);
  };
  client.getSpotMarginBorrowRates = function () {
    return privateCall(`/api/spot_margin/borrow_rates`, 'GET', null, null);
  };
  client.getSpotMarginLendingRates = function () {
    return privateCall(`/api/spot_margin/lending_rates`, 'GET', null, null);
  };
  client.getSpotMarginBorrowSummary = function () {
    return privateCall(`/api/spot_margin/borrow_summary`, 'GET', null, null);
  };
  client.getSpotMarginMarketInfo = function (params) {
    return privateCall(`/api/spot_margin/market_info`, 'GET', params, null);
  };
  client.getSpotMarginBorrowHistory = function (params) {
    return privateCall(`/api/spot_margin/borrow_history`, 'GET', params, null);
  };
  client.getSpotMarginLendingHistory = function (params) {
    return privateCall(`/api/spot_margin/lending_history`, 'GET', params, null);
  };
  client.getSpotMarginOffers = function () {
    return privateCall(`/api/spot_margin/offers`, 'GET', null, null);
  };
  client.getSpotMarginLendingInfo = function () {
    return privateCall(`/api/spot_margin/lending_info`, 'GET', null, null);
  };
  client.postSpotMarginOffers = function (params) {
    return privateCall(`/api/spot_margin/offers`, 'POST', null, params);
  };
  // FILLS
  client.getFills = function (params) {
    return privateCall(`/api/fills`, 'GET', params, null);
  };
  // FUNDING PAYMENTS
  client.getFundingPayments = function (params) {
    return privateCall(`/api/funding_payments`, 'GET', params, null);
  };
  // LEVERAGED TOKENS
  client.getLtTokens = function () {
    return privateCall(`/api/lt/tokens`, 'GET', null, null);
  };
  client.getLtTokesTokenName = function (params) {
    return privateCall(`/api/lt/${params.token_name}`, 'GET', null, null);
  };
  client.getLtBalances = function () {
    return privateCall(`/api/lt/balances`, 'GET', null, null);
  };
  client.getLtCreations = function () {
    return privateCall(`/api/lt/creations`, 'GET', null, null);
  };
  client.postLtTokenNameCreate = function (params) {
    return privateCall(`/api/lt/${params.token_name}/create`, 'POST', null, params);
  };
  client.getLtRedemptions = function () {
    return privateCall(`/api/lt/redemptions`, 'GET', null, null);
  };
  client.getLtTokenNameRedeem = function (params) {
    return privateCall(`/api/lt/${params.token_name}/redeem`, 'POST', null, params);
  };
  client.getEtfsRebalanceInfo = function () {
    return privateCall(`/api/etfs/rebalance_info`, 'GET', null, null);
  };
  // OPTIONS
  client.getOptionsRequests = function () {
    return privateCall(`/api/options/requests`, 'GET', null, null);
  };
  client.getOptionsMyRequests = function () {
    return privateCall(`/api/options/my_requests`, 'GET', null, null);
  };
  client.postOptionsRequests = function (params) {
    return privateCall(`/api/options/requests`, 'POST', null, params);
  };
  client.deleteOptionsRequestsRequestId = function (params) {
    return privateCall(`/api/options/requests/${params.request_id}`, 'DELETE', null, null);
  };
  client.getOptionsRequestsRequestIdQuotes = function (params) {
    return privateCall(`/api/options/requests/${params.request_id}/quotes`, 'GET', null, null);
  };
  client.postOptionsRequestsRequestIdQuotes = function (params) {
    return privateCall(`/api/options/requests/${params.request_id}/quotes`, 'POST', null, params);
  };
  client.getOptionsMyQuotes = function () {
    return privateCall(`/api/options/my_quotes`, 'GET', null, null);
  };
  client.deleteOptionsQuotesQuoteId = function (params) {
    return privateCall(`/api/options/quotes/${params.quote_id}`, 'DELETE', null, null);
  };
  client.postOptionsQuotesQuoteIdAccept = function (params) {
    return privateCall(`/api/options/quotes/${params.quote_id}/accept`, 'POST', null, null);
  };
  client.getOptionsAccountInfo = function () {
    return privateCall(`/api/options/account_info`, 'GET', null, null);
  };
  client.getOptionsPositions = function () {
    return privateCall(`/api/options/positions`, 'GET', null, null);
  };
  client.getOptionsTrades = function (params) {
    return publicCall(`/api/options/trades`, 'GET', params, null);
  };
  client.getOptionsFills = function (params) {
    return privateCall(`/api/options/fills`, 'GET', params, null);
  };
  client.getStats24HOptionsVolume = function () {
    return publicCall(`/api/stats/24h_options_volume`, 'GET', null, null);
  };
  client.getOptionsHistoricalVolumesBtc = function (params) {
    return privateCall(`/api/options/historical_volumes/BTC`, 'GET', params, null);
  };
  client.getOptionsOpenInterestBtc = function () {
    return privateCall(`/api/options/open_interest/BTC`, 'GET', null, null);
  };
  client.getOptionsHistoricalOpenInterestBtc = function (params) {
    return privateCall(`/api/options/historical_open_interest/BTC`, 'GET', params, null);
  };
  // STAKING
  client.getStakes = function () {
    return privateCall(`/api/staking/stakes`, 'GET', null, null);
  };
  client.getStakingUnstakeRequests = function () {
    return privateCall(`/api/staking/unstake_requests`, 'GET', null, null);
  };
  client.getStakingBalances = function () {
    return privateCall(`/api/staking/balances`, 'GET', null, null);
  };
  client.postStakingUnstakeRequests = function (params) {
    return privateCall(`/api/staking/unstake_requests`, 'POST', null, params);
  };
  client.delteStakingUnstakeRequestsRequestId = function (params) {
    return privateCall(`/api/staking/unstake_requests/${params.request_id}`, 'DELETE', null, null);
  };
  client.getStakingStakingRewards = function () {
    return privateCall(`/api/staking/staking_rewards`, 'GET', null, null);
  };
  client.postSrmStakesStakes = function (params) {
    return privateCall(`/api/srm_stakes/stakes`, 'POST', null, params);
  };
  // FTX PAY
  client.getFtxPayAppsUserSpecificIdDetails = function (params) {
    return privateCall(`/api/ftxpay/apps/${params.user_specific_id}/details`, 'GET', params, null);
  };
  return client;
};
