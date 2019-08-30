const qs = require('qs');

const makeRequest = require('../../../../utils/make-request');

/**
 * Get predefined public call function
 *
 * @param {string} baseUrl Base url endpoint to call api.
 *
 * @return {Function}
 */
module.exports = function publicCall(baseUrl) {
  return (async function call(path, method, queryParams) {
    const queryParamsStringified = qs.stringify(queryParams);

    const requestOptions = {
      url: `${baseUrl}${path}?${queryParamsStringified}`,
      method: method,
    };

    const response = await makeRequest(requestOptions);

    return response.body;
  });
};
