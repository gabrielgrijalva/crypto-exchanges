const qs = require('qs');
const crypto = require('crypto');
const makeRequest = require('../../../../utils/make-request');

function orderAndStringifyParams(params) {
  let orderedParams = '';
  Object.keys(params).sort().forEach(function (key) {
    orderedParams += key + "=" + params[key] + "&";
  });
  orderedParams = orderedParams.substring(0, orderedParams.length - 1);
  return orderedParams;
}

module.exports = function privateCall(baseUrl, apiKey, apiSecret) {
  return (async function (path, method, body) {
    const privateParams = {};
    privateParams.api_key = apiKey;
    privateParams.timestamp = Date.now();
    const bodyPreSignature = (Object.assign(body, privateParams));
    const signature = crypto.createHmac('sha256', apiSecret).update(
      orderAndStringifyParams(bodyPreSignature)).digest('hex');
    const bodySignature = Object.assign(bodyPreSignature, { sign: signature });
    const bodyStringified = qs.stringify(bodySignature);
    const requestOptions = {
      url: `${baseUrl}${path}?${bodyStringified}`,
      method,
    };
    const response = await makeRequest(requestOptions);
    return response.body;
  });
};
