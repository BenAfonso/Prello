const mongoose = require('mongoose')
const OAuthClient = mongoose.model('OAuthClient')
const OAuthAccessToken = mongoose.model('OAuthAccessToken')
const OAuthAuthorizationCode = mongoose.model('OAuthAuthorizationCode')
const OAuthRefreshToken = mongoose.model('OAuthRefreshToken')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
const secretKey = require('../../config').secretKey
const request = require('request')
const querystring = require('querystring')

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
  const options = {client_id: clientId}
  if (clientSecret) options.client_secret = clientSecret
  return OAuthClient
    .findOne(options)
    .then(client => {
      if (!client) {
        return new Error('client not found')
      }
      let clientWithGrants = {
        _id: client._id,
        User: client.User,
        scope: client.scope,
        redirectUris: client.redirectUris,
        client_secret: client.client_secret,
        client_id: client.client_id,
        name: client.name,
        grant_type: 'password',
        grants: ['authorization_code', 'password', 'refresh_token', 'client_credentials']
      }
      return clientWithGrants
    }).catch(err => {
      console.log('getClient - Err: ', err)
    })
}

function getUser (email, password) {
  return User
    .findOne({email: email})
    .then(user => {
      return user.authenticate(password) ? user : false
    })
    .catch(err => {
      console.log('getUser - Err: ', err)
    })
}

function revokeAuthorizationCode (code) {
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

function generateAccessToken (client, user, scope) {
  if (user._id) {
    let payload = { iss: 'Prello-OAuthServer', userId: user._id, scope: scope }
    let token = jwt.sign(payload, secretKey, { expiresIn: '7d' })
    return token
  }
}

function saveToken (token, client, user) {
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
  return OAuthAuthorizationCode
    .findOne({authorization_code: code})
    .populate('User')
    .populate('OAuthClient')
    .then(function (authCodeModel) {
      if (!authCodeModel) return false
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
  let options = {client_id: client.client_id}
  if (client.client_secret) options.client_secret = client.client_secret
  return OAuthClient
    .findOne(options)
    .populate({path: 'User', model: 'User'})
    .then(client => {
      if (!client) return false
      if (!client.User) return false
      return client.User
    }).catch(function (err) {
      console.log('getUserFromClient - Err: ', err)
    })
}

function getRefreshToken (refreshToken) {
  if (!refreshToken || refreshToken === 'undefined') return false
  return OAuthRefreshToken
    .findOne({refresh_token: refreshToken})
    .populate('User')
    .populate('OAuthClient')
    .then(function (savedRT) {
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

const VALID_SCOPES = [
  'boards:read',
  'boards:write',
  'users.profile:read',
  'users.profile:write',
  'teams:read',
  'teams:write'
]

function validateScope (user, client, scope) {
  return scope
    .split(' ')
    .filter(s => VALID_SCOPES.indexOf(s) >= 0)
    .join(' ')
}

function verifyScope (token, scope) {
  if (!token.scope) {
    return false
  }
  let requestedScopes = scope.split(' ')
  let authorizedScopes = token.scope.split(' ')
  return requestedScopes.every(s => authorizedScopes.indexOf(s) >= 0)
}

function validateGoogleCode (code, origin) {
  const data = {
    code: code,
    client_id: '532471730394-bh1qi5q6hkh0c13quao0ptplp8sidfjb.apps.googleusercontent.com',
    client_secret: '1YYKI6q6wMsrZNl45ALgL1w2',
    redirect_uri: origin,
    scope: 'email profile',
    grant_type: 'authorization_code'
  }
  return new Promise((resolve, reject) => {
    request({method: 'post', url: 'https://accounts.google.com/o/oauth2/token', form: data}, (error, response) => {
      if (!error && response.statusCode === 200) {
        let accessToken = JSON.parse(response.body).access_token
        request({method: 'get', url: `https://www.googleapis.com/plus/v1/people/me?access_token=${accessToken}`}, (err, res) => {
          if (err) { return reject(err) }
          if (!res) { return reject(new Error('Google profile not found.')) }
          let profile = JSON.parse(res.body)
          return resolve({accessToken, profile})
        })
      } else {
        return reject(response.body)
      }
    })
  })
}

function validatePrelloCode (code, origin) {
  const authenticate = Buffer.from('2bdc68692f333d9d97a8:b40fb4c666ddb00b9949').toString('base64')
  const data = querystring.stringify({
    code: code,
    redirect_uri: 'http://176.142.249.180/dashboard',
    grant_type: 'authorization_code'
  })
  return new Promise((resolve, reject) => {
    request({
      headers: {
        'authorization': `Basic ${authenticate}`
      },
      method: 'post',
      url: 'https://theprello-api.igpolytech.fr/oauth/token',
      form: data
    }, (error, response) => {
      if (!error && response.statusCode === 200) {
        resolve(response.body)
      } else {
        return reject(response.body)
      }
    })
  })
}

module.exports = {
  generateAccessToken: generateAccessToken, //, optional - used for jwt
  getAccessToken: getAccessToken,
  getAuthorizationCode: getAuthorizationCode, // getOAuthAuthorizationCode renamed to,
  getClient: getClient,
  getRefreshToken: getRefreshToken,
  getUser: getUser,
  getUserFromClient: getUserFromClient,
  revokeAuthorizationCode: revokeAuthorizationCode,
  revokeToken: revokeToken,
  saveToken: saveToken, // saveOAuthAccessToken, renamed to
  saveAuthorizationCode: saveAuthorizationCode, // renamed saveOAuthAuthorizationCode,
  validateScope: validateScope,
  verifyScope: verifyScope,
  validateGoogleCode: validateGoogleCode,
  validatePrelloCode: validatePrelloCode
}
