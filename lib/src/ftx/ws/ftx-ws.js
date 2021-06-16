const qs = require('qs');
const zlib = require('zlib');
const crypto = require('crypto');
const moment = require('moment');
const WebSocket = require('ws');
const { clear } = require('console');

const BASE_URL = 'wss://ftx.com/ws/';

/**
 * Creates private subscription object to create connection with websocket API.
 *
 * @param {string} apiKey API Key created from the user account.
 * @param {string} apiSecret API Secret created from the user account.
 * @param {string} apiSubaccount API Subaccount name.
 */
function getAuthParams(apiKey, apiSecret, apiSubaccount) {
  const timestamp = Date.now();
  const digest = `${timestamp}websocket_login`;
  const params = {};
  params.op = 'login';
  params.args = {};
  params.args.key = apiKey;
  params.args.sign = crypto.createHmac('sha256', apiSecret).update(digest).digest('hex');
  params.args.time = timestamp;
  if (apiSubaccount) {
    params.args.subaccount = apiSubaccount;
  }
  return params;
};

/**
 * Main library wrapper for FTX Websocket API.
 *
 * @param {Object} config Configuration object for creating a new websocket connection.
 */
module.exports = function FtxWs(config) {
  const onOpenFunctions = [];
  const onCloseFunctions = [];
  const onErrorFunctions = [];
  const onMessageFunctions = [];
  const apiKey = config.apiKey;
  const apiSecret = config.apiSecret;
  const apiSubaccount = config.apiSubaccount;
  const subsRequest = config.subsRequest;
  const ftxWsConnection = {};
  ftxWsConnection.ws = null;
  /**
   * Attaches a function that will be run when there is an "open" event.
   *
   * @param {Function} onOpenFunction Function to be attached to "open" websocket event.
   */
  ftxWsConnection.onOpen = function (onOpenFunction) {
    onOpenFunctions.push(onOpenFunction);
  };
  /**
   * Attaches a function that will be run when there is a "close" event.
   *
   * @param {Function} onCloseFunction Function to be attached to "close" websocket event.
   */
  ftxWsConnection.onClose = function (onCloseFunction) {
    onCloseFunctions.push(onCloseFunction);
  };
  /**
   * Attaches a function that will be run when there is an "error" event.
   *
   * @param {Function} onErrorFunction Function to be attached to "error" websocket event.
   */
  ftxWsConnection.onError = function (onErrorFunction) {
    onErrorFunctions.push(onErrorFunction);
  };
  /**
   * Attaches a function that will be run when there is a "message" event.
   *
   * @param {Function} onMessageFunction Function to be attached to "message" websocket event.
   */
  ftxWsConnection.onMessage = function (onMessageFunction) {
    onMessageFunctions.push(onMessageFunction);
  };
  /**
   * Connect to websocket API by creating a WebSocket object.
   *
   */
  ftxWsConnection.connect = function () {
    this.ws = new WebSocket(BASE_URL);
    onOpenFunctions.forEach(f => this.ws.on('open', f));
    onCloseFunctions.forEach(f => this.ws.on('close', f));
    onErrorFunctions.forEach(f => this.ws.on('error', f));
    onMessageFunctions.forEach(f => this.ws.on('message', f));
  };
  /**
   * Disconnect from the websocket API by closing the connection from the WebSocket object.
   *
   */
  ftxWsConnection.disconnect = function () {
    onOpenFunctions.forEach(f => this.ws.removeEventListener('open', f));
    onCloseFunctions.forEach(f => this.ws.removeEventListener('close', f));
    onErrorFunctions.forEach(f => this.ws.removeEventListener('error', f));
    onMessageFunctions.forEach(f => this.ws.removeEventListener('message', f));
    this.ws.close();
    this.ws = null;
  };
  /**
     * Send data to the websocket API.
     *
     */
  ftxWsConnection.send = function (data) {
    this.ws.send(data);
  };
  let pongTimeout = 0;
  function onOpenDefault() {
    if (apiKey && apiSecret) {
      const authParams = getAuthParams(apiKey, apiSecret, apiSubaccount);
      ftxWsConnection.send(JSON.stringify(authParams));
      ftxWsConnection.send(JSON.stringify(subsRequest));
    } else {
      ftxWsConnection.send(JSON.stringify(subsRequest));
    }
    onMessageDefault(JSON.stringify({ type: 'pong' }));
  };
  function onMessageDefault(message) {
    const messageParsed = JSON.parse(message);
    if (messageParsed.type === 'pong') {
      clearInterval(pongTimeout);
      const pongTimeoutFunc = () => {
        if (ftxWsConnection.ws && ftxWsConnection.ws
          .readyState === ftxWsConnection.ws.OPEN) {
          ftxWsConnection.ws.close();
        }
      };
      const sendPingFunc = () => {
        ftxWsConnection.send(JSON.stringify({ op: 'ping' }));
        pongTimeout = setInterval(pongTimeoutFunc, 5000);
      };
      setTimeout(sendPingFunc, 5000);
    }
  };
  onOpenFunctions.push(onOpenDefault.bind(ftxWsConnection));
  onMessageFunctions.push(onMessageDefault.bind(ftxWsConnection));
  return ftxWsConnection;
};
