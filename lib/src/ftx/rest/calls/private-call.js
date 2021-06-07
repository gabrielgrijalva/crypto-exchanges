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
  return (async function (path, method, queryParams, bodyParams) {
    const timestamp = Date.now();
    const bodyParamsStr = bodyParams ? JSON.stringify(bodyParams) : '';
    const queryParamsStr = queryParams ? `?${qs.stringify(queryParams)}` : '';
    const digest = `${timestamp}${method}${path}${queryParamsStr}${bodyParamsStr}`;
    const signature = crypto.createHmac('sha256', apiSecret)
      .update(digest).digest('hex');
    const requestOptions = {};
    requestOptions.url = `${baseUrl}${path}${queryParamsStr}`;
    requestOptions.body = bodyParamsStr;
    requestOptions.method = method;
    requestOptions.headers = {
      'FTX-KEY': apiKey,
      'FTX-SIGN': signature,
      'FTX-TS': timestamp.toString(),
      'Content-Type': 'application/json',
    };
    console.log(timestamp);
    console.log(digest);
    console.log(signature);
    console.log(requestOptions);
    const response = await makeRequest(requestOptions);
    if (response.body.err_code || response.body.status === 'error') {
      throw response.body;
    }
    return response.body;
  });
};
