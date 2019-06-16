const qs = require('qs');
const crypto = require('crypto');

const makeRequest = require('../../../utils/make-request');

/**
 * Get predefined private call function
 * 
 * @param {string} baseUrl Base url endpoint to call api.
 * @param {string} apiKey Secure user account api key.
 * @param {string} apiSecret Secure user account api secret.
 * 
 * @return {Function}
 */
module.exports = function privateCall(baseUrl, apiKey, apiSecret) {
    /**
     * Function to be called when making a private call
     * 
     * @param {string} path URL enpoint to call in the request.
     * @param {string} method Http method to make in the call.
     * @param {Object} body Valid body parameters to send to the API.
     * 
     * @return {Object} Response from API depending on the API endpoint and parameters sent.
     */
    return (async function (path, method, body) {
        const recWindow = 5000;
        const timestamp = Date.now() - 1000;

        body.recvWindow = recWindow;
        body.timestamp = timestamp;

        const signature = crypto.createHmac('sha256', apiSecret)
            .update(qs.stringify(body)).digest('hex');

        body.signature = signature;

        const bodyStringified = qs.stringify(body);

        const requestOptions = {
            url: `${baseUrl}${path}?${bodyStringified}`,
            method: method,
            headers: { 'X-MBX-APIKEY': apiKey }
        }

        const response = await makeRequest(requestOptions);

        return response;
    });
}
