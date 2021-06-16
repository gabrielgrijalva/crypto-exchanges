const qs = require('qs');
const uuid = require('uuid').v4;
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
  return (async function (path, method, queryParams) {
    const nonce = uuid();
    const timestamp = Date.now();
    const queryParamsStr = queryParams ? `?${qs.stringify(queryParams)}` : '';
    const digest = `${timestamp}\n${nonce}\n${method}\n${path}${queryParamsStr}\n${''}\n`;
    const signature = crypto.createHmac('sha256', apiSecret).update(digest).digest('hex');
    const authHeaderStr = `deri-hmac-sha256 id=${apiKey},ts=${timestamp},nonce=${nonce},sig=${signature}`
    const requestOptions = {};
    requestOptions.url = `${baseUrl}${path}${queryParamsStr}`;
    requestOptions.method = method;
    requestOptions.headers = {
      'Authorization': authHeaderStr,
    };
    const response = await makeRequest(requestOptions);
    if (response.body.err_code || response.body.status === 'error') {
      throw response.body;
    }
    return response.body;
  });
};
