const zlib = require('zlib');
const crypto = require('crypto');

const WebSocket = require('ws');

const BASE_URL = 'wss://real.okex.com:8443/ws/v3';

/**
 * Creates private subscription object for connection with websocket API.
 *
 * @param {string} apiKey API Key created from the user account.
 * @param {string} apiSecret API Secret created from the user account.
 * @param {string} apiPassphrase API passphrase created from the user account.
 */
function getSignedSubscription(apiKey, apiSecret, apiPassphrase) {
  const method = 'GET';
  const path = '/users/self/verify';
  const timestamp = Date.now() / 1000;

  const digest = `${timestamp}${method}${path}`;

  const signature = crypto.createHmac('sha256', apiSecret)
    .update(digest).digest('base64');

  return {
    op: 'login',
    args: [
      apiKey,
      apiPassphrase,
      timestamp,
      signature,
    ],
  };
}

/**
 * Checker process that validates that OkexWsConnection is open through ping/pong implementation.
 *
 */
function connectionChecker() {
  let sendPingTimeout = 0;
  let closeConnectionTimeout = 0;

  const closeConnection = () => {
    if (this.ws && this.ws.readyState === this.ws.OPEN) {
      this.ws.close();
    }
  };

  const sendPing = () => {
    if (!this.ws || this.ws.readyState !== this.ws.OPEN) {
      closeConnection();

      return;
    }

    this.ws.ping();

    closeConnectionTimeout = setTimeout(closeConnection, 5000);
  };

  const pongCallback = () => {
    clearTimeout(sendPingTimeout);
    clearTimeout(closeConnectionTimeout);

    sendPingTimeout = setTimeout(sendPing, 5000);
  };

  this.ws.on('pong', pongCallback);

  this.ws.ping();
}

/**
 * Main library wrapper for Okex Websocket API.
 *
 * @param {Object} config Configuration object for creating a new websocket connection.
 */
module.exports = function OkexWs(config) {
  const onOpenFunctions = [];
  const onCloseFunctions = [];
  const onErrorFunctions = [];
  const onMessageFunctions = [];

  const apiKey = config.apiKey;
  const apiSecret = config.apiSecret;
  const channelName = config.channelName;
  const apiPassphrase = config.apiPassphrase;

  /**
   * Default function in order to create connection to the configured enpoint.
   *
   */
  function onOpenDefault() {
    const signedSubscription = getSignedSubscription(apiKey, apiSecret,
      apiPassphrase);

    const subscriptionStrigified = JSON.stringify(signedSubscription);

    this.send(subscriptionStrigified);
  }

  /**
   * Default function that handles authenticated connections.
   *
   * @param {string} message Event "message" received from websocket server.
   */
  function onMessageDefault(message) {
    const messageParsed = JSON.parse(zlib.inflateRawSync(message).toString());

    if (messageParsed.event === 'login' && messageParsed.success) {
      const subscription = JSON.stringify({
        op: 'subscribe',
        args: [channelName],
      });

      this.send(subscription);
    }
  }

  const okexWsConnection = {
    ws: null,

    /**
   * Attaches a function that will be run when there is an "open" event.
   *
   * @param {Function} onOpenFunction Function to be attached to "open" websocket event.
   */
    onOpen: function (onOpenFunction) {
      onOpenFunctions.push(onOpenFunction);
      if (this.ws) {
        this.ws.on('open', onOpenFunction);
      }
    },

    /**
     * Removes a function that is attached to the "open" event.
     *
     * @param {Function} removeOnOpenFunction Function to be removed from the "open" event.
     */
    removeOnOpen: function (removeOnOpenFunction) {
      const index = onOpenFunctions.findIndex(onOpenFunction => onOpenFunction
        === removeOnOpenFunction);
      onOpenFunctions.splice(index, index !== -1 ? 1 : 0);
      if (this.ws) {
        this.ws.removeEventListener('open', removeOnOpenFunction);
      }
    },

    /**
     * Attaches a function that will be run when there is a "close" event.
     *
     * @param {Function} onCloseFunction Function to be attached to "close" websocket event.
     */
    onClose: function (onCloseFunction) {
      onCloseFunctions.push(onCloseFunction);
      if (this.ws) {
        this.ws.on('close', onCloseFunction);
      }
    },

    /**
     * Removes a function that is attached to the "close" event.
     *
     * @param {Function} removeOnCloseFunction Function to be removed from the "close" event.
     */
    removeOnClose: function (removeOnCloseFunction) {
      const index = onCloseFunctions.findIndex(onCloseFunction => onCloseFunction
        === removeOnCloseFunction);
      onCloseFunctions.splice(index, index !== -1 ? 1 : 0);
      if (this.ws) {
        this.ws.removeEventListener('close', removeOnCloseFunction);
      }
    },

    /**
     * Attaches a function that will be run when there is an "error" event.
     *
     * @param {Function} onErrorFunction Function to be attached to "error" websocket event.
     */
    onError: function (onErrorFunction) {
      onErrorFunctions.push(onErrorFunction);
      if (this.ws) {
        this.ws.on('error', onErrorFunction);
      }
    },

    /**
     * Removes a function that is attached to the "error" event.
     *
     * @param {Function} removeOnErrorFunction Function to be removed from the "error" event.
     */
    removeOnError: function (removeOnErrorFunction) {
      const index = onErrorFunctions.findIndex(onErrorFunction => onErrorFunction
        === removeOnErrorFunction);
      onErrorFunctions.splice(index, index !== -1 ? 1 : 0);
      if (this.ws) {
        this.ws.removeEventListener('error', removeOnErrorFunction);
      }
    },

    /**
     * Attaches a function that will be run when there is a "message" event.
     *
     * @param {Function} onMessageFunction Function to be attached to "message" websocket event.
     */
    onMessage: function (onMessageFunction) {
      onMessageFunctions.push(onMessageFunction);
      if (this.ws) {
        this.ws.on('message', onMessageFunction);
      }
    },

    /**
     * Removes a function that is attached to the "message" event.
     *
     * @param {Function} removeOnMessageFunction Function to be removed from the "message" event.
     */
    removeOnMessage: function (removeOnMessageFunction) {
      const index = onMessageFunctions.findIndex(onMessageFunction => onMessageFunction
        === removeOnMessageFunction);
      onMessageFunctions.splice(index, index !== -1 ? 1 : 0);
      if (this.ws) {
        this.ws.removeEventListener('message', removeOnMessageFunction);
      }
    },

    /**
     * Connect to websocket API by creating a WebSocket object.
     *
     */
    connect: function () {
      this.ws = new WebSocket(BASE_URL);

      onOpenFunctions.forEach(
        onOpenFunction => this.ws.on('open', onOpenFunction),
      );
      onCloseFunctions.forEach(
        onCloseFunction => this.ws.on('close', onCloseFunction),
      );
      onErrorFunctions.forEach(
        onErrorFunction => this.ws.on('error', onErrorFunction),
      );
      onMessageFunctions.forEach(
        onMessageFunction => this.ws.on('message', onMessageFunction),
      );
    },

    /**
     * Disconnect from the websocket API by closing the connection from the WebSocket object.
     *
     */
    disconnect: function () {
      onOpenFunctions.forEach(
        onOpenFunction => this.ws
          .removeEventListener('open', onOpenFunction),
      );
      onCloseFunctions.forEach(
        onCloseFunction => this.ws
          .removeEventListener('close', onCloseFunction),
      );
      onErrorFunctions.forEach(
        onErrorFunction => this.ws
          .removeEventListener('error', onErrorFunction),
      );
      onMessageFunctions.forEach(
        onMessageFunction => this.ws
          .removeEventListener('message', onMessageFunction),
      );

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
  };

  onOpenFunctions.push(onOpenDefault.bind(okexWsConnection));
  onOpenFunctions.push(connectionChecker.bind(okexWsConnection));
  onMessageFunctions.push(onMessageDefault.bind(okexWsConnection));

  return okexWsConnection;
};
