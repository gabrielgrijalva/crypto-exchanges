const crypto = require('crypto');
const WebSocket = require('ws');

const BASE_URL = 'wss://futures.kraken.com/ws/v1';

/**
 * Main library wrapper for Kraken Websocket API.
 *
 * @param {Object} config Configuration object for creating a new websocket connection.
 */
module.exports = function KrakenWs(config) {

  const onOpenFunctions = [];
  const onCloseFunctions = [];
  const onErrorFunctions = [];
  const onMessageFunctions = [];

  const krakenWsConnection = {
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
    connect: async function () {
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

  onOpenFunctions.push(function onOpenDefault() {
    if (!config.apiKey || !config.apiSecret) {
      krakenWsConnection.send(JSON.stringify(config));
    } else {
      const request = {};
      request.event = 'challenge';
      request.api_key = config.apiKey;
      krakenWsConnection.send(JSON.stringify(request));
    }
  });
  onOpenFunctions.push(function connectionChecker() {
    let sendPingTimeout = 0;
    let closeConnectionTimeout = 0;
    const closeConnection = () => {
      if (krakenWsConnection.ws && krakenWsConnection.ws
        .readyState === krakenWsConnection.ws.OPEN) {
        krakenWsConnection.ws.close();
      }
    };
    const sendPing = () => {
      if (!krakenWsConnection.ws || krakenWsConnection.ws
        .readyState !== krakenWsConnection.ws.OPEN) {
        closeConnection();
        return;
      }
      krakenWsConnection.ws.ping();
      closeConnectionTimeout = setTimeout(closeConnection, 5000);
    };
    const pongCallback = () => {
      clearTimeout(sendPingTimeout);
      clearTimeout(closeConnectionTimeout);
      sendPingTimeout = setTimeout(sendPing, 5000);
    };
    krakenWsConnection.ws.on('pong', pongCallback);
    krakenWsConnection.ws.ping();
  });
  onMessageFunctions.push(function processChallenge(message) {
    const messageParsed = JSON.parse(message);
    if (messageParsed.event === 'challenge' && messageParsed.message) {
      const challenge = messageParsed.message;
      const hash = crypto.createHash('sha256').update(challenge).digest();
      const decoded = Buffer.from(config.apiSecret, 'base64');
      const signed = crypto.createHmac('sha512', decoded).update(hash).digest('base64');
      let request = {};
      request.api_key = config.apiKey;
      request.original_challenge = challenge;
      request.signed_challenge = signed;
      delete config.apiKey;
      delete config.apiSecret
      krakenWsConnection.send(JSON.stringify(Object.assign(request, config)));
    };
  });

  return krakenWsConnection;
};
