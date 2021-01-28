const utf8 = require('utf8');
const crypto = require('crypto');
const makeRequest = require('../../../../utils/make-request');

module.exports = function privateCall(baseUrl, apiKey, apiSecret) {
  return (async function (path, method, body) {
    const nonce = Date.now();
    const bodyStr = `json=${JSON.stringify(body)}`;
    const message = bodyStr + nonce + path;
    const hash = crypto.createHash('sha256').update(utf8.encode(message)).digest();
    const decoded = Buffer.from(apiSecret, 'base64');
    const authent = crypto.createHmac('sha512', decoded)
      .update(hash).digest('base64');
    const requestOptions = {
      url: `${baseUrl}${path}?${encodeURI(bodyStr)}`,
      method,
      headers: { 'Accept': 'application/json', 'APIKey': apiKey, 'Nonce': nonce, 'Authent': authent },
      timeout: 5000,
    };
    const response = await makeRequest(requestOptions);
    return response.body;
  });
};
