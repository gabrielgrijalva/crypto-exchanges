/**
 * Returns JSON object when string is a valid JSON or if invalid JSON returns same string
 * 
 * @param {string} toParse string to convert to JSON
 */
module.exports = function parseToJson(toParse) {
    try { return JSON.parse(toParse) } catch (error) { return toParse }
}