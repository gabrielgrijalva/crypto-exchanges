const qs = require('qs');
const zlib = require('zlib');
const crypto = require('crypto');
const moment = require('moment');
const WebSocket = require('ws');

const INDEX_BASE_URL = 'wss://api.hbdm.vn/ws_index';
const MARKET_BASE_URL = 'wss://api.hbdm.vn/swap-ws';
const PRIVATE_BASE_URL = 'wss://api.hbdm.vn/swap-notification';

function getAuthSubscription(apiKey, apiSecret) {
  const timestamp = moment.utc().format('YYYY-MM-DDTHH:mm:ss');
  const params = {};
  params.AccessKeyId = apiKey;
  params.SignatureMethod = 'HmacSHA256';
  params.SignatureVersion = 2;
  params.Timestamp = timestamp;
  const paramsStringified = qs.stringify(params);
  const digest = `GET\napi.hbdm.vn\n/swap-notification\n${paramsStringified}`;
  const signature = crypto.createHmac('sha256', apiSecret)
    .update(digest).digest('base64');
  const subscription = {};
  subscription.op = 'auth';
  subscription.type = 'api';
  subscription.AccessKeyId = apiKey;
  subscription.SignatureMethod = 'HmacSHA256';
  subscription.SignatureVersion = 2;
  subscription.Timestamp = timestamp;
  subscription.Signature = signature;
  return subscription;
};

module.exports = function HuobiDMSwapWs(config) {
  const onOpenFunctions = [];
  const onCloseFunctions = [];
  const onErrorFunctions = [];
  const onMessageFunctions = [];
  const apiKey = config.apiKey;
  const apiSecret = config.apiSecret;
  const subscriptionType = config.subscriptionType;
  const subscriptionRequest = config.subscriptionRequest;

  function onOpenDefault() {
    const subscription = subscriptionType === 'public'
      ? subscriptionRequest : getAuthSubscription(apiKey, apiSecret);
    this.send(JSON.stringify(subscription));
  };
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
      } else {
        console.error(messageParsed);
        throw new Error('Unsuccessfull private connection.');
      }
    }
  };

  const client = {};
  client.ws = null;
  client.onOpen = function (onOpenFunction) {
    onOpenFunctions.push(onOpenFunction);
    if (this.ws) {
      this.ws.on('open', onOpenFunction);
    }
  };
  client.removeOnOpen = function (removeOnOpenFunction) {
    const index = onOpenFunctions.findIndex(onOpenFunction => onOpenFunction
      === removeOnOpenFunction);
    onOpenFunctions.splice(index, index !== -1 ? 1 : 0);
    if (this.ws) {
      this.ws.removeEventListener('open', removeOnOpenFunction);
    }
  };
  client.onClose = function (onCloseFunction) {
    onCloseFunctions.push(onCloseFunction);
    if (this.ws) {
      this.ws.on('close', onCloseFunction);
    }
  };
  client.removeOnClose = function (removeOnCloseFunction) {
    const index = onCloseFunctions.findIndex(onCloseFunction => onCloseFunction
      === removeOnCloseFunction);
    onCloseFunctions.splice(index, index !== -1 ? 1 : 0);
    if (this.ws) {
      this.ws.removeEventListener('close', removeOnCloseFunction);
    }
  };
  client.onError = function (onErrorFunction) {
    onErrorFunctions.push(onErrorFunction);
    if (this.ws) {
      this.ws.on('error', onErrorFunction);
    }
  };
  client.removeOnError = function (removeOnErrorFunction) {
    const index = onErrorFunctions.findIndex(onErrorFunction => onErrorFunction
      === removeOnErrorFunction);
    onErrorFunctions.splice(index, index !== -1 ? 1 : 0);
    if (this.ws) {
      this.ws.removeEventListener('error', removeOnErrorFunction);
    }
  };
  client.onMessage = function (onMessageFunction) {
    onMessageFunctions.push(onMessageFunction);
    if (this.ws) {
      this.ws.on('message', onMessageFunction);
    }
  };
  client.removeOnMessage = function (removeOnMessageFunction) {
    const index = onMessageFunctions.findIndex(onMessageFunction => onMessageFunction
      === removeOnMessageFunction);
    onMessageFunctions.splice(index, index !== -1 ? 1 : 0);
    if (this.ws) {
      this.ws.removeEventListener('message', removeOnMessageFunction);
    }
  };
  client.connect = function () {
    const connectionURL = subscriptionType === 'public' ? MARKET_BASE_URL
      : subscriptionType === 'public_index' ? INDEX_BASE_URL : PRIVATE_BASE_URL;
    this.ws = new WebSocket(connectionURL);
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
  };
  client.disconnect = function () {
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
  };
  client.send = function (data) {
    this.ws.send(data);
  };
  onOpenFunctions.push(onOpenDefault.bind(client));
  onMessageFunctions.push(onMessageDefault.bind(client));
  return client;
};
