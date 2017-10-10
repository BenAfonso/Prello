const Util = {}
Util.moveInsideAnArray = function (arrayToUpdate, oldIndex, newIndex) {
  if (newIndex >= arrayToUpdate.length) {
    let k = newIndex - arrayToUpdate.length
    while ((k--) + 1) {
      arrayToUpdate.push(undefined)
    }
  }
  arrayToUpdate.splice(newIndex, 0, arrayToUpdate.splice(oldIndex, 1)[0])
  return arrayToUpdate // for testing purposes
}
Util.checkRequest = function (request, arrayOfAttribute) {
  let retour = arrayOfAttribute.filter((x) => (request[x] === undefined || request[x] === ''))
  return retour
}
module.exports = Util
