const PublicCallCreator = require('./calls/public-call');

const BASE_URL = 'https://www.bitstamp.net';

module.exports = function BitstampRest(apiKey, apiSecret) {
  const client = {};
  const publicCall = PublicCallCreator(BASE_URL);
  client.getOHLC = function(params) {
    return publicCall(`/api/v2/ohlc/${params.pair}/`, 'GET', params);
  };
  return client;
}
