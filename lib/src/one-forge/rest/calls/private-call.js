const qs = require('qs');

const makeRequest = require('../../../../utils/make-request');

/**
 * Get predefined private call function
 *
 * @param {string} baseUrl Base url endpoint to call api.
 * @param {string} apiKey Secure user account api key.
 *
 * @return {Function} Promise that is executed to make a private call to the API.
 */
module.exports = function privateCall(baseUrl, apiKey) {
  return (async function (path, method, queryParams) {
    const queryParamsStringified = queryParams
      ? `?${qs.stringify(queryParams)}&api_key=${apiKey}`
      : `?api_key=${apiKey}`;

    const requestOptions = {
      url: `${baseUrl}${path}${queryParamsStringified}`,
      method: method,
    };

    const response = await makeRequest(requestOptions);

    if (response.body.error) {
      throw response.body;
    }

    return response.body;
  });
};
