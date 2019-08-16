const io = require('socket.io-client');

const BASE_URL = 'https://io.lightstream.bitflyer.com';

function connectToChannel(channelName) {
  this.ws.emit('subscribe', channelName);
}

/**
 * Main library wrapper for Huobi DM Websocket API.
 *
 * @param {Object} config Configuration object for creating a new websocket connection.
 */
module.exports = function BitflyerWs(config) {
  const channelName = config.channelName;

  const onOpenFunctions = [];
  const onCloseFunctions = [];
  const onErrorFunctions = [];
  const onMessageFunctions = [];

  const bitflyerWsConnection = {
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
      const connectionURL = BASE_URL;

      const options = { transports: ['websocket'] };

      this.ws = io(connectionURL, options);

      onOpenFunctions.forEach(
        onOpenFunction => this.ws.on('connect', onOpenFunction),
      );
      onCloseFunctions.forEach(
        onCloseFunction => this.ws.on('disconnect', onCloseFunction),
      );
      onErrorFunctions.forEach(
        onErrorFunction => this.ws.on('error', onErrorFunction),
      );
      onMessageFunctions.forEach(
        onMessageFunction => this.ws.on(channelName, onMessageFunction),
      );
    },

    /**
     * Disconnect from the websocket API by closing the connection from the WebSocket object.
     *
     */
    disconnect: function () {
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

  onOpenFunctions.push(connectToChannel.bind(bitflyerWsConnection,
    channelName));

  return bitflyerWsConnection;
};
