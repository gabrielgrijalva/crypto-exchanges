const qs = require('qs');
const crypto = require('crypto');
const makeRequest = require('../../../../utils/make-request');

module.exports = function privateCall(baseUrl, apiKey, apiSecret) {
  return (async function (path, method, body) {
    const privateParams = {
      recvWindow: 5000,
      timestamp: Date.now() - 1000,
    };
    const bodyPreSignature = Object.assign(body, privateParams);
    const signature = crypto.createHmac('sha256', apiSecret)
      .update(qs.stringify(bodyPreSignature)).digest('hex');
    const bodySignature = Object.assign(bodyPreSignature, { signature });
    const bodyStringified = qs.stringify(bodySignature);
    const requestOptions = {
      url: `${baseUrl}${path}?${bodyStringified}`,
      method,
      headers: { 'X-MBX-APIKEY': apiKey },
    };
    const response = await makeRequest(requestOptions);
    return response.body;
  });
};
