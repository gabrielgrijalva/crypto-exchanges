const qs = require('qs');
const moment = require('moment');
const crypto = require('crypto');

const makeRequest = require('../../../../utils/make-request');

/**
 * Get predefined private call function
 *
 * @param {string} baseUrl Base url endpoint to call api.
 * @param {string} apiKey Secure user account api key.
 * @param {string} apiSecret Secure user account api secret.
 * @param {string} apiPassphrase Secure user account api passphrase.
 *
 * @return {Function} Promise that is executed to make a private call to the API.
 */
module.exports = function privateCall(baseUrl, apiKey, apiSecret,
  apiPassphrase) {
  return (async function (path, method, queryParams, body) {
    const timestamp = moment.utc().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');

    const bodyStringified = body ? JSON.stringify(body) : '';
    const queryParamsStringified = queryParams
      ? `?${qs.stringify(queryParams)}` : '';

    const digest = `${timestamp}${method}${path}${queryParamsStringified
      }${bodyStringified}`;

    const signature = crypto.createHmac('sha256', apiSecret)
      .update(digest).digest('base64');

    const requestOptions = {
      url: `${baseUrl}${path}${queryParamsStringified}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'OK-ACCESS-KEY': apiKey,
        'OK-ACCESS-SIGN': signature,
        'OK-ACCESS-TIMESTAMP': timestamp,
        'OK-ACCESS-PASSPHRASE': apiPassphrase,
      },
      body: bodyStringified,
    };

    const response = await makeRequest(requestOptions);

    return response.body;
  });
};
