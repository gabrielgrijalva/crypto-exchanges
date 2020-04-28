const qs = require('qs');

const makeRequest = require('../../../../utils/make-request');

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
