const qs = require('qs');
const makeRequest = require('../../../../utils/make-request');

/**
 * Get predefined public call function
 * @param {string} baseUrl Base url endpoint to call api.
 * @return {Function}
 */
module.exports = function PublicCall(baseUrl) {
  return (async function call(path, method, body) {
    const bodyStringified = qs.stringify(body);
    const options = {};
    options.url = `${baseUrl}${path}?${bodyStringified}`;
    options.method = method;
    const response = await makeRequest(options);
    if (response.body.err_code || response.body.status === 'error') {
      throw response.body;
    }
    return response.body;
  });
};
