const qs = require('qs');
const crypto = require('crypto');
const moment = require('moment');
const makeRequest = require('../../../../utils/make-request');

/**
 * Get predefined private call function
 * @param {string} baseUrl Base url endpoint to call api.
 * @param {string} apiKey Secure user account api key.
 * @param {string} apiSecret Secure user account api secret.
 * @return {Function} Promise that is executed to make a private call to the API.
 */
module.exports = function PrivateCall(baseUrl, apiKey, apiSecret) {
  const rootUrl = baseUrl.replace('https://', '');
  return (async function (path, method, queryParams, body) {
    const params = {};
    params.AccessKeyId = apiKey
    params.SignatureMethod = 'HmacSHA256'
    params.SignatureVersion = 2
    params.Timestamp = moment.utc().format('YYYY-MM-DDTHH:mm:ss')
    const queryParamsSource = !queryParams
      ? params : Object.assign(params, queryParams);
    const queryParamsSourceSorted = !queryParams
      ? qs.stringify(queryParamsSource)
      : qs.stringify(queryParamsSource).split('&').sort().join('&');
    const digest = `${method}\n${rootUrl}\n${path}\n${queryParamsSourceSorted}`;
    queryParamsSource.Signature = crypto.createHmac('sha256', apiSecret)
      .update(digest).digest('base64');
    const options = {};
    options.url = `${baseUrl}${path}?${qs.stringify(queryParamsSource)}`;
    options.method = method;
    options.headers = { 'Content-Type': 'application/json', };
    options.body = body ? JSON.stringify(body) : '';
    const response = await makeRequest(options);
    if (response.body.err_code || response.body.status === 'error') {
      throw response.body;
    }
    return response.body;
  });
};
