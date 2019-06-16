const qs = require('qs');
const crypto = require('crypto');

const makeRequest = require('../../../utils/make-request');

const CallInterface = require('./call-interface');

/**
 * Get predefined private call function
 *
 * @param {string} baseUrl Base url endpoint to call api.
 * @param {string} apiKey Secure user account api key.
 * @param {string} apiSecret Secure user account api secret.
 *
 * @return {CallInterface} Promise that is executed to make a private call to the API.
 */
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

    return response;
  });
};
