const qs = require('qs');

const makeRequest = require('../../../utils/make-request');

/**
 * Get predefined public call function
 *
 * @param {string} baseUrl Base url endpoint to call api.
 *
 * @return {Function}
 */
module.exports = function publicCall(baseUrl) {
  return (async function call(path, method, body) {
    const bodyStringified = qs.stringify(body);

    const requestOptions = {
      url: `${baseUrl}${path}?${bodyStringified}`,
      method: method,
    };

    const response = await makeRequest(requestOptions);

    return response;
  });
};
