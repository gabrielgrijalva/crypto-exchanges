const qs = require('qs');

const makeRequest = require('../../../utils/make-request');

/**
 * Get predefined private call function
 *
 * @param {string} baseUrl Base url endpoint to call api.
 *
 * @return {Function}
 */
module.exports = function publicCall(baseUrl) {
  /**
   * Function to be called when making a private call
   *
   * @param {string} path URL enpoint to call in the request.
   * @param {string} method Http method to make in the call.
   * @param {Object} body Valid body parameters to send to the API.
   *
   * @return {Object} Response from API depending on the API endpoint and parameters sent.
   */
  return (async function call(path, method, body) {
    const bodyStringified = qs.stringify(body);

    const requestOptions = {
      url: `${baseUrl}${path}?${bodyStringified}`,
      method,
    };

    const response = await makeRequest(requestOptions);

    return response;
  });
};
