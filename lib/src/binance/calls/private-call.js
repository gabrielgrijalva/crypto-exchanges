const qs = require('qs');
const crypto = require('crypto');

const makeRequest = require('../../../utils/make-request');

/**
 * Get predefined private call function
 *
 * @param {string} baseUrl Base url endpoint to call api.
 * @param {string} apiKey Secure user account api key.
 * @param {string} apiSecret Secure user account api secret.
 *
 * @return {Promise<Object>} Promise that is executed to make a private call to the API.
 */
module.exports = function privateCall(baseUrl, apiKey, apiSecret) {
  /**
   * Function to be called when making a private call
   *
   * @param {string} path URL enpoint to call in the request.
   * @param {string} method Http method to make in the call.
   * @param {Object} body Valid body parameters to send to the API.
   *
   * @return {Object} Response from API depending on the API endpoint and parameters sent.
   */
  return (async function call(path, method, body) {
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
