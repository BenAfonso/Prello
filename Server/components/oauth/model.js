const mongoose = require('mongoose')
const OAuthClient = mongoose.model('OAuthClient')
const OAuthAccessToken = mongoose.model('OAuthAccessToken')
const OAuthAuthorizationCode = mongoose.model('OAuthAuthorizationCode')
const OAuthRefreshToken = mongoose.model('OAuthRefreshToken')
const User = mongoose.model('User')

function getAccessToken (bearerToken) {
  return OAuthAccessToken
    .findOne({access_token: bearerToken})
    .populate('User')
    .populate('OAuthClient')
    .then(accessToken => {
      if (!accessToken) return false
      let token = accessToken
      token.user = token.User
      token.client = token.OAuthClient
      token.scope = token.scope
      token.accessTokenExpiresAt = token.expires
      return token
    })
    .catch(err => {
      return err
    })
}

function getClient (clientId, clientSecret) {
  console.log('getClient', clientId, clientSecret)
  const options = {client_id: clientId}
  if (clientSecret) options.client_secret = clientSecret

  return OAuthClient
    .findOne(options)
    .then(client => {
      if (!client) return new Error('client not found')
      let clientWithGrants = {
        _id: client._id,
        User: client.User,
        scope: client.scope,
        redirect_uri: client.redirect_uri,
        client_secret: client.client_secret,
        client_id: client.client_id,
        name: client.name,
        grant_type: 'password',
        grants: ['authorization_code', 'password', 'refresh_token', 'client_credentials']
      }
      clientWithGrants.redirectUris = [clientWithGrants.redirect_uri]
      delete clientWithGrants.redirect_uri
      return clientWithGrants
    }).catch(err => {
      console.log('getClient - Err: ', err)
    })
}

function getUser (username, password) {
  console.log('aeaze')
  return User
    .findOne({username: username})
    .then(function (user) {
      console.log('u', user)
      return user.authenticate(password) ? user : false
    })
    .catch(function (err) {
      console.log('getUser - Err: ', err)
    })
}

function revokeAuthorizationCode (code) {
  console.log('revokeAuthorizationCode', code)
  return OAuthAuthorizationCode.findOne({
    where: {
      authorization_code: code.code
    }
  }).then(function (rCode) {
    let expiredCode = code
    expiredCode.expiresAt = new Date('2015-05-28T06:59:53.000Z')
    return expiredCode
  }).catch(function (err) {
    console.log('getUser - Err: ', err)
  })
}

function revokeToken (token) {
  console.log('revokeToken', token)
  return OAuthRefreshToken.findOne({
    where: {
      refresh_token: token.refreshToken
    }
  }).then(rT => {
    if (rT) rT.destroy()
    let expiredToken = token
    expiredToken.refreshTokenExpiresAt = new Date('2015-05-28T06:59:53.000Z')
    return expiredToken
  }).catch(function (err) {
    console.log('revokeToken - Err: ', err)
  })
}

function saveToken (token, client, user) {
  console.log('saveToken', token, client, user)
  return Promise.all([
    OAuthAccessToken.create({
      access_token: token.accessToken,
      expires: token.accessTokenExpiresAt,
      OAuthClient: client._id,
      User: user._id,
      scope: token.scope
    }),
    token.refreshToken ? OAuthRefreshToken.create({ // no refresh token for client_credentials
      refresh_token: token.refreshToken,
      expires: token.refreshTokenExpiresAt,
      OAuthClient: client._id,
      User: user._id,
      scope: token.scope
    }) : []
  ])
    .then(function (resultsArray) {
      return Object.assign(
        {
          client: client,
          user: user,
          access_token: token.accessToken,
          refresh_token: token.refreshToken
        },
        token
      )
    })
    .catch(function (err) {
      console.log('revokeToken - Err: ', err)
    })
}

function getAuthorizationCode (code) {
  console.log('getAuthorizationCode', code)
  return OAuthAuthorizationCode
    .findOne({authorization_code: code})
    .populate('User')
    .populate('OAuthClient')
    .then(function (authCodeModel) {
      if (!authCodeModel) return false
      console.log(authCodeModel)
      let client = authCodeModel.OAuthClient
      let user = authCodeModel.User
      return {
        code: code,
        client: {
          ...client,
          grants: ['authorization_code', 'password', 'refresh_token', 'client_credentials'],
          grant_type: 'authorization_code'
        },
        expiresAt: authCodeModel.expires,
        redirectUri: client.redirect_uri,
        user: user,
        scope: authCodeModel.scope
      }
    }).catch(err => {
      console.log('getAuthorizationCode - Err: ', err)
    })
}

function saveAuthorizationCode (code, client, user) {
  console.log('saveAuthorizationCode', code, client, user)
  return OAuthAuthorizationCode
    .create({
      expires: code.expiresAt,
      OAuthClient: client._id,
      authorization_code: code.authorizationCode,
      User: user._id,
      scope: code.scope
    })
    .then(function () {
      code.code = code.authorizationCode
      return code
    }).catch(function (err) {
      console.log('saveAuthorizationCode - Err: ', err)
    })
}

function getUserFromClient (client) {
  console.log('getUserFromClient', client)
  let options = {client_id: client.client_id}
  if (client.client_secret) options.client_secret = client.client_secret

  return OAuthClient
    .findOne(options)
    .populate('User')
    .then(function (client) {
      console.log(client)
      if (!client) return false
      if (!client.User) return false
      return client.User
    }).catch(function (err) {
      console.log('getUserFromClient - Err: ', err)
    })
}

function getRefreshToken (refreshToken) {
  console.log('getRefreshToken', refreshToken)
  if (!refreshToken || refreshToken === 'undefined') return false
// [OAuthClient, User]
  return OAuthRefreshToken
    .findOne({refresh_token: refreshToken})
    .populate('User')
    .populate('OAuthClient')
    .then(function (savedRT) {
      console.log('srt', savedRT)
      let tokenTemp = {
        user: savedRT ? savedRT.User : {},
        client: savedRT ? savedRT.OAuthClient : {},
        refreshTokenExpiresAt: savedRT ? new Date(savedRT.expires) : null,
        refreshToken: refreshToken,
        refresh_token: refreshToken,
        scope: savedRT.scope
      }
      return tokenTemp
    }).catch(function (err) {
      console.log('getRefreshToken - Err: ', err)
    })
}

/* function validateScope (token, client, scope) {
  console.log('validateScope', token, client, scope)
  return (token.scope === client.scope) ? scope : false
} */

function verifyScope (token, scope) {
  console.log('verifyScope', token, scope)
  return token.scope === scope
}

module.exports = {
  // generateOAuthAccessToken, optional - used for jwt
  // generateAuthorizationCode, optional
  // generateOAuthRefreshToken, - optional
  getAccessToken: getAccessToken,
  getAuthorizationCode: getAuthorizationCode, // getOAuthAuthorizationCode renamed to,
  getClient: getClient,
  getRefreshToken: getRefreshToken,
  getUser: getUser,
  getUserFromClient: getUserFromClient,
  // grantTypeAllowed, Removed in oauth2-server 3.0
  revokeAuthorizationCode: revokeAuthorizationCode,
  revokeToken: revokeToken,
  saveToken: saveToken, // saveOAuthAccessToken, renamed to
  saveAuthorizationCode: saveAuthorizationCode, // renamed saveOAuthAuthorizationCode,
  // validateScope: validateScope,
  verifyScope: verifyScope
}
