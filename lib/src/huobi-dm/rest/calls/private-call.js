const qs = require('qs');
const crypto = require('crypto');
const moment = require('moment');

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
  const rootUrl = baseUrl.replace('https://', '');

  return (async function (path, method, queryParams, body) {
    const privateQueryParams = {
      AccessKeyId: apiKey,
      SignatureMethod: 'HmacSHA256',
      SignatureVersion: 2,
      Timestamp: moment.utc().format('YYYY-MM-DDTHH:mm:ss'),
    };

    const queryParamsSource = !queryParams
      ? privateQueryParams
      : Object.assign(privateQueryParams, queryParams);

    const queryParamsSourceSorted = !queryParams
      ? qs.stringify(queryParamsSource)
      : qs.stringify(queryParamsSource).split('&').sort().join('&');

    const digest = `${method}\n${rootUrl}\n${path}\n${queryParamsSourceSorted}`;

    const signature = crypto.createHmac('sha256', apiSecret)
      .update(digest).digest('base64');

    queryParamsSource.Signature = signature;

    const queryParamsSourceStringified = `?${qs.stringify(queryParamsSource)}`;

    const bodyStringified = body ? JSON.stringify(body) : '';

    const requestOptions = {
      url: `${baseUrl}${path}${queryParamsSourceStringified}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: bodyStringified,
    };

    const response = await makeRequest(requestOptions);

    if (response.body.err_code || response.body.status === 'error') {
      throw response.body;
    }

    return response.body;
  });
};
