const oauth = require('../../components/oauth')
const oauthServer = require('oauth2-server')
const Request = oauthServer.Request
const Response = oauthServer.Response

/* const decodeToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) reject(err)
      else resolve(decoded)
    })
  })
} */

exports.requiresLogin = (req, res, next) => {
  let request = new Request({
    headers: {authorization: req.headers.authorization},
    method: req.method,
    query: req.query,
    body: req.body
  })

  let response = new Response(res)

  oauth.authenticate(request, response)
    .then(function (token) {
      // Request is authorized.
      req.user = token.User
      next()
    })
    .catch(function (err) {
      // Request is not authorized.
      res.status(err.code || 500).json(err)
    })
  /* let authorizationHeader = req.headers['authorization']
  if (authorizationHeader === undefined) {
    authorizationHeader = req['authorization']
  }
  if (authorizationHeader === undefined) {
    return res.status(401).send('No token provided')
  }
  authorizationHeader = authorizationHeader.split(' ')

  if (authorizationHeader[0] !== 'Bearer') {
    return res.status(401).send('Bearer token needed')
  }
  if (authorizationHeader[1] === undefined) {
    return res.status(401).send('No token provided')
  }
  let token = authorizationHeader[1]
  decodeToken(token).then((decoded) => {
    User.findById(decoded.id, (err, user) => {
      if (err) { return res.status(400).send('No user found') }
      req.user = user
      next()
    })
  }).catch(err => {
    return res.status(400).send(err)
  }) */
}
