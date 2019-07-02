const publicCallCreator = require('./calls/public-call');
const privateCallCreator = require('./calls/private-call');

const BASE_URL = 'https://api.hbdm.com';

/**
 * Main library wrapper for Huobi REST API.
 *
 * @param {string} apiKey API Key created from the user account.
 * @param {string} apiSecret API Secret created from the user account.
 */
module.exports = function HuobiDM(apiKey, apiSecret) {
  const publicCall = publicCallCreator(BASE_URL);
  const privateCall = privateCallCreator(BASE_URL, apiKey, apiSecret);

  return {

    /*
     * ==========================
     * MARKET DATA INTERFACE
     * ==========================
     */

    /**
     * Get contract information.
     *
     */
    getContractContractInfo: function () {
      return publicCall('/api/v1/contract_contract_info', 'GET', {});
    },

    /*
     * ==========================
     * ACCOUNT INTERFACE
     * ==========================
     */

    /**
     * Get user's account information.
     *
     * @param {Object} params Params for getting user's account information.
     */
    postContractAccountInfo: function (params) {
      return privateCall('/api/v1/contract_account_info', 'POST', null, params);
    },

  };
};
