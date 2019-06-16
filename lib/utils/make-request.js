const request = require('request');

const parseToJson = require('./parse-to-json');

/**
 * Makes an http request through a promise and parses the response from the API
 * 
 * @param {Object} requestOptions 
 */
module.exports = function makeRequest(requestOptions) {
    return new Promise((resolve, reject) => {
        request(requestOptions, (err, response) => {
            if (err) {
                if (response && response.body) {
                    err = parseToJson(response.body);
                }

                return reject(err);
            }

            const bodyJson = parseToJson(response.body);

            resolve(bodyJson);
        });
    });
}