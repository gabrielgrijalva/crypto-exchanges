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
      if (err || (response && response.statusCode >= 400)) {
        let errParsed = {};

        if (response && response.body) {
          errParsed = parseToJson(response.body);
        } else {
          errParsed = err;
        }

        return reject(errParsed);
      }

      const bodyJson = parseToJson(response.body);

      return resolve(bodyJson);
    });
  });
};
