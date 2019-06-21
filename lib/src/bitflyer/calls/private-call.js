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
 * @return {Function} Promise that is executed to make a private call to the API.
 */
module.exports = function privateCall(baseUrl, apiKey, apiSecret) {
  return (async function (path, method, queryParams, body) {
    const timestamp = Date.now().toString();

    const queryParamsStringified = queryParams ? `?${qs.stringify(queryParams)}` : '';
    const bodyStringified = body ? JSON.stringify(body) : '';

    const digest = `${timestamp}${method}${path}${queryParamsStringified}${bodyStringified}`;

    const signature = crypto.createHmac('sha256', apiSecret)
      .update(digest).digest('hex');

    const requestOptions = {
      url: `${baseUrl}${path}${queryParamsStringified}`,
      method: method,
      headers: {
        'ACCESS-KEY': apiKey,
        'ACCESS-TIMESTAMP': timestamp,
        'ACCESS-SIGN': signature,
      },
      body: bodyStringified
    };

    const response = await makeRequest(requestOptions);

    return response;
  });
};
