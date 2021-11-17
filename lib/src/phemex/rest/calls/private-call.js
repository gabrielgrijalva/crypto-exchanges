const qs = require('qs');
const crypto = require('crypto');
const makeRequest = require('../../../../utils/make-request');

module.exports = function privateCall(baseUrl, apiKey, apiSecret) {
  return (async function (path, method, params, body) {
    const expires = Math.floor(Date.now() / 1000 + 60);
    const bodyStringified = body ? JSON.stringify(body) : '';
    const paramsStringified = params ? qs.stringify(params, { encode: false }) : '';
    const digest = `${path}${paramsStringified}${expires}${bodyStringified}`;
    const signature = crypto.createHmac('sha256', apiSecret).update(digest).digest('hex');
    const requestOptions = {
      url: `${baseUrl}${path}?${paramsStringified}`,
      method: method,
      headers: {
        'x-phemex-access-token': apiKey,
        'x-phemex-request-expiry': expires,
        'x-phemex-request-signature': signature,
      },
      body: bodyStringified,
    };
    const response = await makeRequest(requestOptions);
    return response.body;
  });
};
