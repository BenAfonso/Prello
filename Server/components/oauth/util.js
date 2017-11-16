module.exports = function (query) {
  const q = query.replace(/^\??\//, '')

  return q.split('&').reduce((values, param) => {
    const [key, value] = param.split('=')

    values[key] = value

    return values
  }, {})
}
