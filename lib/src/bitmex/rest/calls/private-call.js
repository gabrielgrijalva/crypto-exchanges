const qs = require('qs');
const crypto = require('crypto');

const makeRequest = require('../../../../utils/make-request');

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
  return (async function (path, method, body) {
    const expires = Math.floor(Date.now() / 1000 + 60).toString();

    const bodyStringified = qs.stringify(body);

    const digest = `${method}${path}?${bodyStringified}${expires}`;

    const signature = crypto.createHmac('sha256', apiSecret)
      .update(digest).digest('hex');

    const requestOptions = {
      url: `${baseUrl}${path}?${bodyStringified}`,
      method: method,
      headers: {
        'api-expires': expires,
        'api-key': apiKey,
        'api-signature': signature,
      },
    };

    const response = await makeRequest(requestOptions);

    return response;
  });
};
