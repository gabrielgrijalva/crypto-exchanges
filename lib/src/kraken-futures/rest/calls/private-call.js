const qs = require('qs');
const utf8 = require('utf8');
const crypto = require('crypto');
const makeRequest = require('../../../../utils/make-request');

module.exports = function privateCall(baseUrl, apiKey, apiSecret) {
  return (async function (path, method, body) {
    const seconds = Math.floor(Date.now() / 1000).toString();
    const microseconds = Math.floor(process.hrtime()[1] / 1000).toString();
    const micLeadingZeros = '0'.repeat(6 - microseconds.length);
    const nonce = `${seconds}${micLeadingZeros}${microseconds}`;
    const bodyStr = qs.stringify(body);
    const message = bodyStr + nonce + path;
    const hash = crypto.createHash('sha256').update(utf8.encode(message)).digest();
    const decoded = Buffer.from(apiSecret, 'base64');
    const authent = crypto.createHmac('sha512', decoded)
      .update(hash).digest('base64');
    const requestOptions = {
      url: `${baseUrl}${path}?${bodyStr}`,
      method,
      headers: { 'Accept': 'application/json', 'APIKey': apiKey, 'Nonce': nonce, 'Authent': authent },
      timeout: 5000,
    };
    const response = await makeRequest(requestOptions);
    return response.body;
  });
};
