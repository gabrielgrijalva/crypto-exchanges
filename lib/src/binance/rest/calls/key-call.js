const qs = require('qs');

const makeRequest = require('../../../../utils/make-request');

/**
 * Get predefined key call function
 *
 * @param {string} baseUrl Base url endpoint to call api.
 * @param {string} apiKey Secure user account api key.
 *
 * @return {Function}
 */
module.exports = function keyCall(baseUrl, apiKey) {
  return (async function call(path, method, body) {
    const bodyStringified = qs.stringify(body);

    const requestOptions = {
      url: `${baseUrl}${path}?${bodyStringified}`,
      method,
      headers: { 'X-MBX-APIKEY': apiKey },
    };

    const response = await makeRequest(requestOptions);

    return response.body;
  });
};
