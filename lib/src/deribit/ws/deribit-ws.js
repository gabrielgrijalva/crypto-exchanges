const uuid = require('uuid').v4;
const crypto = require('crypto');
const WebSocket = require('ws');

const BASE_URL = 'wss://www.deribit.com/ws/api/v2';

/**
 * Creates private subscription object to create connection with websocket API.
 *
 * @param {string} apiKey API Key created from the user account.
 * @param {string} apiSecret API Secret created from the user account.
 * @param {string} apiSubaccount API Subaccount name.
 */
function getAuthParams(apiKey, apiSecret, apiSubaccount) {
  const nonce = uuid();
  const timestamp = Date.now();
  const digest = `${timestamp}\n${nonce}\n${''}`;
  const signature = crypto.createHmac('sha256', apiSecret).update(digest).digest('hex');
  const params = {};
  params.jsonrpc = '2.0';
  params.id = '1';
  params.method = 'public/auth';
  params.params = {
    grant_type: "client_signature",
    client_id: apiKey,
    timestamp: timestamp,
    signature: signature,
    nonce: nonce,
    data: '',
  };
  return params;
};

/**
 * Main library wrapper for Deribit Websocket API.
 *
 * @param {Object} config Configuration object for creating a new websocket connection.
 */
module.exports = function DeribitWs(config) {
  const onOpenFunctions = [];
  const onCloseFunctions = [];
  const onErrorFunctions = [];
  const onMessageFunctions = [];
  const apiKey = config.apiKey;
  const apiSecret = config.apiSecret;
  const subsParams = config.subsParams;
  const wsClient = {};
  wsClient.ws = null;
  /**
   * Attaches a function that will be run when there is an "open" event.
   *
   * @param {Function} onOpenFunction Function to be attached to "open" websocket event.
   */
  wsClient.onOpen = function (onOpenFunction) {
    onOpenFunctions.push(onOpenFunction);
  };
  /**
   * Attaches a function that will be run when there is a "close" event.
   *
   * @param {Function} onCloseFunction Function to be attached to "close" websocket event.
   */
  wsClient.onClose = function (onCloseFunction) {
    onCloseFunctions.push(onCloseFunction);
  };
  /**
   * Attaches a function that will be run when there is an "error" event.
   *
   * @param {Function} onErrorFunction Function to be attached to "error" websocket event.
   */
  wsClient.onError = function (onErrorFunction) {
    onErrorFunctions.push(onErrorFunction);
  };
  /**
   * Attaches a function that will be run when there is a "message" event.
   *
   * @param {Function} onMessageFunction Function to be attached to "message" websocket event.
   */
  wsClient.onMessage = function (onMessageFunction) {
    onMessageFunctions.push(onMessageFunction);
  };
  /**
   * Connect to websocket API by creating a WebSocket object.
   *
   */
  wsClient.connect = function () {
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
  wsClient.disconnect = function () {
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
  wsClient.send = function (data) {
    this.ws.send(data);
  };
  function onOpenDefault() {
    startPingPongStatusChecker();
    if (apiKey && apiSecret) {
      const authParams = getAuthParams(apiKey, apiSecret);
      wsClient.send(JSON.stringify(authParams));
    }
    wsClient.send(JSON.stringify(subsParams));
  };
  function startPingPongStatusChecker() {
    let pongTimeout = 0;
    const pongTimeoutFunc = () => {
      if (wsClient.ws && wsClient.ws.readyState === wsClient.ws.OPEN) {
        wsClient.ws.close();
      }
    };
    const receivedPongFunc = () => {
      clearTimeout(pongTimeout);
      setTimeout(() => {
        wsClient.ws.ping();
        pongTimeout = setTimeout(pongTimeoutFunc, 5000);
      }, 5000);
    };
    receivedPongFunc();
    wsClient.ws.on('pong', receivedPongFunc);
  };
  onOpenFunctions.push(onOpenDefault.bind(wsClient));
  return wsClient;
};
