const publicCallCreator = require('./calls/public-call');
const privateCallCreator = require('./calls/private-call');

const BASE_URL = 'https://www.deribit.com';
const BASE_PATH = '/api/v2';

/**
 * Main library wrapper for Deribit REST API.
 *
 * @param {string} apiKey API Key created from the user account.
 * @param {string} apiSecret API Secret created from the user account.
 */
module.exports = function Deribit(apiKey, apiSecret) {
  const client = {};
  const publicCall = publicCallCreator(BASE_URL);
  const privateCall = privateCallCreator(BASE_URL, apiKey, apiSecret);
  // AUTHENTICATION
  client.publicAuth = function (params) {
    return publicCall(`${BASE_PATH}/public/auth`, 'GET', params);
  };
  client.publicExchangeToken = function (params) {
    return publicCall(`${BASE_PATH}/public/exchange_token`, 'GET', params);
  };
  client.publicForkToken = function (params) {
    return publicCall(`${BASE_PATH}/public/fork_token`, 'GET', params);
  };
  client.privateLogout = function () {
    return privateCall(`${BASE_PATH}/private/logout`, 'GET', null);
  };
  // SESSION MANAGEMENT
  client.publicSetHeartbeat = function (params) {
    return publicCall(`${BASE_PATH}/public/set_heartbeat`, 'GET', params);
  };
  client.publicDisableHeartbeat = function () {
    return publicCall(`${BASE_PATH}/public/disable_heartbeat`, 'GET', null);
  };
  client.privateEnableCancelOnDisconnect = function (params) {
    return privateCall(`${BASE_PATH}/private/enable_cancel_on_disconnect`, 'GET', params);
  };
  client.privateDisableCancelOnDisconnect = function (params) {
    return privateCall(`${BASE_PATH}/private/disable_cancel_on_disconnect`, 'GET', params);
  };
  client.privateGetCancelOnDisconnect = function (params) {
    return privateCall(`${BASE_PATH}/private/get_cancel_on_disconnect`, 'GET', params);
  };
  // SUPPORTING
  client.publicGetTime = function () {
    return publicCall(`${BASE_PATH}/public/get_time`, 'GET', null);
  };
  client.publicHello = function (params) {
    return publicCall(`${BASE_PATH}/public/hello`, 'GET', params);
  };
  client.publicTest = function (params) {
    return publicCall(`${BASE_PATH}/public/test`, 'GET', params);
  };
  // SUBSCRIPTION MANAGEMENT
  client.publicSubscribe = function (params) {
    return publicCall(`${BASE_PATH}/public/subscribe`, 'GET', params);
  };
  client.publicUnsubscribe = function (params) {
    return publicCall(`${BASE_PATH}/public/unsubscribe`, 'GET', params);
  };
  client.privateSubscribe = function (params) {
    return privateCall(`${BASE_PATH}/private/subscribe`, 'GET', params);
  };
  client.privateUnsubscribe = function (params) {
    return privateCall(`${BASE_PATH}/private/unsubscribe`, 'GET', params);
  };
  // ACCOUNT MANAGEMENT
  client.publicGetAnnouncements = function (params) {
    return publicCall(`${BASE_PATH}/public/get_announcements`, 'GET', params);
  };
  client.privateChangeApiKeyName = function (params) {
    return privateCall(`${BASE_PATH}/private/change_api_key_name`, 'GET', params);
  };
  client.privateChangeScopeInApiKey = function (params) {
    return privateCall(`${BASE_PATH}/private/change_scope_in_api_key`, 'GET', params);
  };
  client.privateChangeSubaccountName = function (params) {
    return privateCall(`${BASE_PATH}/private/change_subaccount_name`, 'GET', params);
  };
  client.privateCreateApiKey = function (params) {
    return privateCall(`${BASE_PATH}/private/create_api_key`, 'GET', params);
  };
  client.privateCreateSubaccount = function () {
    return privateCall(`${BASE_PATH}/private/create_subaccount`, 'GET', null);
  };
  client.privateDisableApiKey = function (params) {
    return privateCall(`${BASE_PATH}/private/disable_api_key`, 'GET', params);
  };
  client.privateDisableTfaForSubaccount = function (params) {
    return privateCall(`${BASE_PATH}/private/disable_tfa_for_subaccount`, 'GET', params);
  };
  client.privateEnableAffiliateProgram = function () {
    return privateCall(`${BASE_PATH}/private/enable_affiliate_program`, 'GET', null);
  };
  client.privateEnableApiKey = function (params) {
    return privateCall(`${BASE_PATH}/private/enable_api_key`, 'GET', params);
  };
  client.privateGetAccountSummary = function (params) {
    return privateCall(`${BASE_PATH}/private/get_account_summary`, 'GET', params);
  };
  client.privateGetAffiliateProgramInfo = function () {
    return privateCall(`${BASE_PATH}/private/get_affiliate_program_info`, 'GET', null);
  };
  client.privateGetEmailLanguage = function () {
    return privateCall(`${BASE_PATH}/private/get_email_language`, 'GET', null);
  };
  client.privateGetNewAnnouncements = function (params) {
    return privateCall(`${BASE_PATH}/private/get_new_announcements`, 'GET', params);
  };
  client.privateGetPosition = function (params) {
    return privateCall(`${BASE_PATH}/private/get_position`, 'GET', params);
  };
  client.privateGetPositions = function (params) {
    return privateCall(`${BASE_PATH}/private/get_positions`, 'GET', params);
  };
  client.privateGetSubaccounts = function (params) {
    return privateCall(`${BASE_PATH}/private/get_subaccounts`, 'GET', params);
  };
  client.privateGetTransactionLog = function (params) {
    return privateCall(`${BASE_PATH}/private/get_transaction_log`, 'GET', params);
  };
  client.privateListApiKeys = function (params) {
    return privateCall(`${BASE_PATH}/private/list_api_keys`, 'GET', params);
  };
  client.privateRemoveApiKey = function (params) {
    return privateCall(`${BASE_PATH}/private/remove_api_key`, 'GET', params);
  };
  client.privateRemoveSubaccount = function (params) {
    return privateCall(`${BASE_PATH}/private/remove_subaccount`, 'GET', params);
  };
  client.privateResetApiKey = function (params) {
    return privateCall(`${BASE_PATH}/private/reset_api_key`, 'GET', params);
  };
  client.privateSetAnnouncementAsRead = function (params) {
    return privateCall(`${BASE_PATH}/private/set_announcement_as_read`, 'GET', params);
  };
  client.privateSetApiKeyAsDefault = function (params) {
    return privateCall(`${BASE_PATH}/private/set_api_key_as_default`, 'GET', params);
  };
  client.privateSetEmailForSubaccount = function (params) {
    return privateCall(`${BASE_PATH}/private/set_email_for_subaccount`, 'GET', params);
  };
  client.privateSetEmailLanguage = function (params) {
    return privateCall(`${BASE_PATH}/private/set_email_language`, 'GET', params);
  };
  client.privateSetPasswordForSubaccount = function (params) {
    return privateCall(`${BASE_PATH}/private/set_password_for_subaccount`, 'GET', params);
  };
  client.privateToggleNotificationsFromSubaccount = function (params) {
    return privateCall(`${BASE_PATH}/private/toggle_notifications_from_subaccount`, 'GET', params);
  };
  client.privateToggleSubaccountLogin = function (params) {
    return privateCall(`${BASE_PATH}/private/toggle_subaccount_login`, 'GET', params);
  };
  // BLOCK TRADE
  client.privateExecuteBlockTrade = function (params) {
    return privateCall(`${BASE_PATH}/private/execute_block_trade`, 'GET', params);
  };
  client.privateGetBlockTrade = function (params) {
    return privateCall(`${BASE_PATH}/private/get_block_trade`, 'GET', params);
  };
  client.privateGetLastBlockTradesByCurrency = function (params) {
    return privateCall(`${BASE_PATH}/private/get_last_block_trades_by_currency`, 'GET', params);
  };
  client.privateInvalidateBlockTradeSignature = function (params) {
    return privateCall(`${BASE_PATH}/private/invalidate_block_trade_signature`, 'GET', params);
  };
  client.privateVerifyBlockTrade = function (params) {
    return privateCall(`${BASE_PATH}/private/verify_block_trade`, 'GET', params);
  };
  // TRADING
  client.privateBuy = function (params) {
    return privateCall(`${BASE_PATH}/private/buy`, 'GET', params);
  };
  client.privateSell = function (params) {
    return privateCall(`${BASE_PATH}/private/sell`, 'GET', params);
  };
  client.privateEdit = function (params) {
    return privateCall(`${BASE_PATH}/private/edit`, 'GET', params);
  };
  client.privateEditByLabel = function (params) {
    return privateCall(`${BASE_PATH}/private/edit_by_label`, 'GET', params);
  };
  client.privateCancel = function (params) {
    return privateCall(`${BASE_PATH}/private/cancel`, 'GET', params);
  };
  client.privateCancelAll = function (params) {
    return privateCall(`${BASE_PATH}/private/cancel_all`, 'GET', params);
  };
  client.privateCancelAllByCurrency = function (params) {
    return privateCall(`${BASE_PATH}/private/cancel_all_by_currency`, 'GET', params);
  };
  client.privateCancelAllByInstrument = function (params) {
    return privateCall(`${BASE_PATH}/private/cancel_all_by_instrument`, 'GET', params);
  };
  client.privateCancelByLabel = function (params) {
    return privateCall(`${BASE_PATH}/private/cancel_by_label`, 'GET', params);
  };
  client.privateClosePosition = function (params) {
    return privateCall(`${BASE_PATH}/private/close_position`, 'GET', params);
  };
  client.privateGetMargins = function (params) {
    return privateCall(`${BASE_PATH}/private/get_margins`, 'GET', params);
  };
  client.privateGetMmpConfig = function (params) {
    return privateCall(`${BASE_PATH}/private/get_mmp_config`, 'GET', params);
  };
  client.privateGetOpenOrdersByCurrency = function (params) {
    return privateCall(`${BASE_PATH}/private/get_open_orders_by_currency`, 'GET', params);
  };
  client.privateGetOpenOrdersByInstrument = function (params) {
    return privateCall(`${BASE_PATH}/private/get_open_orders_by_instrument`, 'GET', params);
  };
  client.privateGetOrderHistoryByCurrency = function (params) {
    return privateCall(`${BASE_PATH}/private/get_order_history_by_currency`, 'GET', params);
  };
  client.privateGetOrderHistoryByInstrument = function (params) {
    return privateCall(`${BASE_PATH}/private/get_order_history_by_instrument`, 'GET', params);
  };
  client.privateGetOrderMarginByIds = function (params) {
    return privateCall(`${BASE_PATH}/private/get_order_margin_by_ids`, 'GET', params);
  };
  client.privateGetOrderState = function (params) {
    return privateCall(`${BASE_PATH}/private/get_order_state`, 'GET', params);
  };
  client.privateGetTriggerOrderHistory = function (params) {
    return privateCall(`${BASE_PATH}/private/get_trigger_order_history`, 'GET', params);
  };
  client.privateGetUserTradesByCurrency = function (params) {
    return privateCall(`${BASE_PATH}/private/get_user_trades_by_currency`, 'GET', params);
  };
  client.privateGetUserTradesByCurrencyAndTime = function (params) {
    return privateCall(`${BASE_PATH}/private/get_user_trades_by_currency_and_time`, 'GET', params);
  };
  client.privateGetUserTradesByInstrument = function (params) {
    return privateCall(`${BASE_PATH}/private/get_user_trades_by_instrument`, 'GET', params);
  };
  client.privateGetUserTradesByInstrumentAndTime = function (params) {
    return privateCall(`${BASE_PATH}/private/get_user_trades_by_instrument_and_time`, 'GET', params);
  };
  client.privateGetUserTradesByOrder = function (params) {
    return privateCall(`${BASE_PATH}/private/get_user_trades_by_order`, 'GET', params);
  };
  client.privateResetMmp = function (params) {
    return privateCall(`${BASE_PATH}/private/reset_mmp`, 'GET', params);
  };
  client.privateSetMmpConfig = function (params) {
    return privateCall(`${BASE_PATH}/private/set_mmp_config`, 'GET', params);
  };
  client.privateGetSettlementHistoryByInstrument = function (params) {
    return privateCall(`${BASE_PATH}/private/get_settlement_history_by_instrument`, 'GET', params);
  };
  client.privateGetSettlementHistoryByCurrency = function (params) {
    return privateCall(`${BASE_PATH}/private/get_settlement_history_by_currency`, 'GET', params);
  };
  // MARKET
  client.publicGetBookSummaryByCurrency = function (params) {
    return publicCall(`${BASE_PATH}/public/get_book_summary_by_currency`, 'GET', params);
  };
  client.publicGetBookSummaryByInstrument = function (params) {
    return publicCall(`${BASE_PATH}/public/get_book_summary_by_instrument`, 'GET', params);
  };
  client.publicGetContractSize = function (params) {
    return publicCall(`${BASE_PATH}/public/get_contract_size`, 'GET', params);
  };
  client.publicGetCurrencies = function () {
    return publicCall(`${BASE_PATH}/public/get_currencies`, 'GET', null);
  };
  client.publicGetFundingChartData = function (params) {
    return publicCall(`${BASE_PATH}/public/get_funding_chart_data`, 'GET', params);
  };
  client.publicGetFundingRateHistory = function (params) {
    return publicCall(`${BASE_PATH}/public/get_funding_rate_history`, 'GET', params);
  };
  client.publicGetFundingRateValue = function (params) {
    return publicCall(`${BASE_PATH}/public/get_funding_rate_value`, 'GET', params);
  };
  client.publicGetHistoricalVolatility = function (params) {
    return publicCall(`${BASE_PATH}/public/get_historical_volatility`, 'GET', params);
  };
  client.publicGetIndex = function (params) {
    return publicCall(`${BASE_PATH}/public/get_index`, 'GET', params);
  };
  client.publicGetIndexPrice = function (params) {
    return publicCall(`${BASE_PATH}/public/get_index_price`, 'GET', params);
  };
  client.publicGetIndexPriceNames = function () {
    return publicCall(`${BASE_PATH}/public/get_index_price_names`, 'GET', null);
  };
  client.publicGetInstrument = function (params) {
    return publicCall(`${BASE_PATH}/public/get_instrument`, 'GET', params);
  };
  client.publicGetInstruments = function (params) {
    return publicCall(`${BASE_PATH}/public/get_instruments`, 'GET', params);
  };
  client.publicGetLastSettlementsByCurrency = function (params) {
    return publicCall(`${BASE_PATH}/public/get_last_settlements_by_currency`, 'GET', params);
  };
  client.pubicGetLastSettlementsByInstrument = function (params) {
    return publicCall(`${BASE_PATH}/public/get_last_settlements_by_instrument`, 'GET', params);
  };
  client.publicGetLastTradesByCurrency = function (params) {
    return publicCall(`${BASE_PATH}/public/get_last_trades_by_currency`, 'GET', params);
  };
  client.publicGetLastTradesByCurrencyAndTime = function (params) {
    return publicCall(`${BASE_PATH}/public/get_last_trades_by_currency_and_time`, 'GET', params);
  };
  client.publicGetLastTradesByInstrument = function (params) {
    return publicCall(`${BASE_PATH}/public/get_last_trades_by_instrument`, 'GET', params);
  };
  client.publicGetLastTradesByInstrumentAndTime = function (params) {
    return publicCall(`${BASE_PATH}/public/get_last_trades_by_instrument_and_time`, 'GET', params);
  };
  client.publicGetMarkPriceHistory = function (params) {
    return publicCall(`${BASE_PATH}/public/get_mark_price_history`, 'GET', params);
  };
  client.publicGetOrderBook = function (params) {
    return publicCall(`${BASE_PATH}/public/get_order_book`, 'GET', params);
  };
  client.publicGetTradeVolumes = function (params) {
    return publicCall(`${BASE_PATH}/public/get_trade_volumes`, 'GET', params);
  };
  client.publicGetTradingviewChartData = function (params) {
    return publicCall(`${BASE_PATH}/public/get_tradingview_chart_data`, 'GET', params);
  };
  client.publicGetVolatilityIndexData = function (params) {
    return publicCall(`${BASE_PATH}/public/get_volatility_index_data`, 'GET', params);
  };
  client.publicGetTicker = function (params) {
    return publicCall(`${BASE_PATH}/public/ticker`, 'GET', params);
  };
  // WALLET
  client.privateCancelTransferById = function (params) {
    return privateCall(`${BASE_PATH}/private/cancel_transfer_by_id`, 'GET', params);
  };
  client.privateCancelWithdrawal = function (params) {
    return privateCall(`${BASE_PATH}/private/cancel_withdrawal`, 'GET', params);
  };
  client.privateCreateDepositAddress = function (params) {
    return privateCall(`${BASE_PATH}/private/create_deposit_address`, 'GET', params);
  };
  client.privateGetCurrentDepositAddress = function (params) {
    return privateCall(`${BASE_PATH}/private/get_current_deposit_address`, 'GET', params);
  };
  client.privateGetDeposits = function (params) {
    return privateCall(`${BASE_PATH}/private/get_deposits`, 'GET', params);
  };
  client.privateGetTransfers = function (params) {
    return privateCall(`${BASE_PATH}/private/get_transfers`, 'GET', params);
  };
  client.privateGetWithdrawals = function (params) {
    return privateCall(`${BASE_PATH}/private/get_withdrawals`, 'GET', params);
  };
  client.privateSubmitTransferToAccount = function (params) {
    return privateCall(`${BASE_PATH}/private/submit_transfer_to_subaccount`, 'GET', params);
  };
  client.privateSubmitTransferToUser = function (params) {
    return privateCall(`${BASE_PATH}/private/submit_transfer_to_user`, 'GET', params);
  };
  client.privateWithdraw = function (params) {
    return privateCall(`${BASE_PATH}/private/withdraw`, 'GET', params);
  };
  return client;
};
