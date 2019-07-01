const qs = require('qs');
const crypto = require('crypto');

const makeRequest = require('../../../utils/make-request');
const joinObjectsAndSortProperties = require('../../../utils/join-objects-and-sort-properties');

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
    const privateQueryParams = {
      AccessKeyId: apiKey,
      SignatureMethod: 'HmacSHA256',
      SignatureVersion: '2',
      Timestamp: Date.now().toString(),
    }

    const queryParamsSource = !queryParams
      ? privateQueryParams
      : joinObjectsAndSortProperties(privateQueryParams, queryParams);

    const queryParamsSourceStringified = qs.stringify(queryParamsSource);

    const digest = `${method}\n${baseUrl}\n${path}\n`
      + `${queryParamsSourceStringified}`;

    const signature = crypto.createHmac('sha256', apiSecret)
      .update(digest).digest('base64');

    queryParamsSource.Signature = signature;

    const queryParamsStringified = `?${qs.stringify(queryParamsSource)}`;

    const bodyStringified = body ? JSON.stringify(body) : '';

    const requestOptions = {
      url: `${baseUrl}${path}${queryParamsStringified}`,
      method: method,
      body: bodyStringified,
    };

    const response = await makeRequest(requestOptions);

    return response;
  });
};
