
/**
 * Takes two objects and merge its properties into one object. Then sorts the properties alphabetically.
 * 
 * @param {Object} objectA First object to merge and sort it's properties.
 * @param {Object} objectB Second object to merge and sort it's properties.
 * 
 * @return {Object} Object created from merging and sorting the properties of objectA and objectB
 */
module.exports = function joinObjectAndSortProperty(objectA, objectB) {
  const objectOrdered = {};

  const objectJoined = Object.assign(objectA, objectB);

  Object.keys(objectJoined).sort().forEach(property => {
    if (objectJoined.hasOwnProperty(property)) {
      objectOrdered[property] = objectJoined[property];
    }
  });

  return objectOrdered;
}