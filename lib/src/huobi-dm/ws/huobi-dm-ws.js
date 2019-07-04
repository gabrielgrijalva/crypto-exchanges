const qs = require('qs');
const zlib = require('zlib');
const crypto = require('crypto');
const moment = require('moment');

const WebSocket = require('ws');

const MARKET_BASE_URL = 'wss://www.hbdm.com/ws';
const PRIVATE_BASE_URL = 'wss://api.hbdm.com/notification';

/**
 * Main library wrapper for Huobi DM Websocket API.
 *
 * @param {Object} config Configuration object for creating a new websocket connection.
 */
module.exports = function HuobiDMWs(config) {
  const apiKey = config.apiKey;
  const apiSecret = config.apiSecret;
  const subscriptionType = config.subscriptionType;
  const subscriptionRequest = config.subscriptionRequest;

  const onOpenFunctions = [];
  const onCloseFunctions = [];
  const onErrorFunctions = [];
  const onMessageFunctions = [];

  const huobiDmWsConnection = {
    ws: null,

    /**
     * Attaches a function that will be run when there is an "open" event.
     *
     * @param {Function} onOpenFunction Function to be attached to "open" websocket event.
     */
    onOpen: function (onOpenFunction) {
      onOpenFunctions.push(onOpenFunction);
    },

    /**
     * Attaches a function that will be run when there is a "close" event.
     *
     * @param {Function} onCloseFunction Function to be attached to "close" websocket event.
     */
    onClose: function (onCloseFunction) {
      onCloseFunctions.push(onCloseFunction);
    },

    /**
     * Attaches a function that will be run when there is an "error" event.
     *
     * @param {Function} onErrorFunction Function to be attached to "error" websocket event.
     */
    onError: function (onErrorFunction) {
      onErrorFunctions.push(onErrorFunction);
    },

    /**
     * Attaches a function that will be run when there is a "message" event.
     *
     * @param {Function} onMessageFunction Function to be attached to "message" websocket event.
     */
    onMessage: function (onMessageFunction) {
      onMessageFunctions.push(onMessageFunction);
    },

    /**
     * Connect to websocket API by creating a WebSocket object.
     *
     */
    connect: function () {
      const connectionURL = subscriptionType === 'public'
        ? MARKET_BASE_URL : PRIVATE_BASE_URL;

      this.onOpen(onOpenDefault.bind(this));
      this.onMessage(onMessageDefault.bind(this));

      this.ws = new WebSocket(connectionURL);

      onOpenFunctions.forEach(onOpenFunction => this.ws.on('open', onOpenFunction));
      onCloseFunctions.forEach(onCloseFunction => this.ws.on('close', onCloseFunction));
      onErrorFunctions.forEach(onErrorFunction => this.ws.on('error', onErrorFunction));
      onMessageFunctions.forEach(onMessageFunction => this.ws.on('message', onMessageFunction));
    },

    /**
     * Disconnect from the websocket API by closing the connection from the WebSocket object.
     *
     */
    disconnect: function () {
      onOpenFunctions.forEach(onOpenFunction => this.ws.removeEventListener('open', onOpenFunction));
      onCloseFunctions.forEach(onCloseFunction => this.ws.removeEventListener('close', onCloseFunction));
      onErrorFunctions.forEach(onErrorFunction => this.ws.removeEventListener('error', onErrorFunction));
      onMessageFunctions.forEach(onMessageFunction => this.ws.removeEventListener('message', onMessageFunction));

      this.ws.close();

      this.ws = null;
    },

    /**
     * Send data to the websocket API.
     *
     */
    send: function (data) {
      this.ws.send(data);
    },
  }

  /**
   * Default function in order to create connection to the configured enpoint.
   *
   */
  function onOpenDefault() {
    const subscription = subscriptionType === 'public'
      ? subscriptionRequest : getAuthSubscription(apiKey, apiSecret);

    const subscriptionStrigified = JSON.stringify(subscription);

    this.send(subscriptionStrigified);
  }

  /**
   * Default function that handles authenticated connections and hearbeats.
   *
   * @param {string} message Event "message" received from websocket server.
   */
  function onMessageDefault(message) {
    const messageParsed = JSON.parse(zlib.unzipSync(message).toString());

    if (messageParsed.ping) {
      this.send(JSON.stringify({ pong: +messageParsed.ping }));
    }

    if (messageParsed.op === 'ping') {
      this.send(JSON.stringify({ op: 'pong', ts: +messageParsed.ts }));
    }

    if (messageParsed.op === 'auth' && messageParsed.type === 'api') {
      if (!messageParsed['err-code']) {
        this.send(JSON.stringify(subscriptionRequest));
      }
      else {
        console.log(messageParsed);

        throw new Error('Unsuccessfull private connection. Check credentials.');
      }
    }
  }

  return huobiDmWsConnection;
}

/**
 * Creates private subscription object to create connection with websocket API.
 *
 * @param {string} apiKey API Key created from the user account.
 * @param {string} apiSecret API Secret created from the user account.
 */
function getAuthSubscription(apiKey, apiSecret) {
  const timestamp = moment.utc().format('YYYY-MM-DDTHH:mm:ss');

  const privateQueryParams = {
    AccessKeyId: apiKey,
    SignatureMethod: 'HmacSHA256',
    SignatureVersion: 2,
    Timestamp: timestamp,
  };

  const queryParamsStringified = qs.stringify(privateQueryParams);

  const digest = `GET\napi.hbdm.com\n/notification\n${queryParamsStringified}`;

  const signature = crypto.createHmac('sha256', apiSecret)
    .update(digest).digest('base64');

  return {
    op: 'auth',
    type: 'api',
    AccessKeyId: apiKey,
    SignatureMethod: 'HmacSHA256',
    SignatureVersion: 2,
    Timestamp: timestamp,
    Signature: signature,
  }
}
