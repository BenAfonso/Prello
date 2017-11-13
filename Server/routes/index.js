const express = require('express')
const router = express.Router()
const controllers = require('../controllers')
const { requiresLogin } = require('../config/middlewares/authorization')
const authenticate = require('../components/oauth/authenticate')

router.all('/me/*', [requiresLogin], (req, res, next) => {
  let request = req.originalUrl.split('/').filter(e => e !== '')
  request[0] = `/users/${req.user._id}`
  request = request.join('/')
  req.url = request
  next()
})

router.put('/me/*', [requiresLogin], (req, res, next) => {
  let request = req.originalUrl.split('/').filter(e => e !== '')
  request[0] = `/users/${req.user._id}`
  request = request.join('/')
  req.url = request
  next()
})

router.post('/boards/*', [authenticate({scope: 'boards:write'})], (req, res, next) => {
  next()
})

router.post(['/boards', '/boards/*'], [authenticate({scope: 'boards:write'})], (req, res, next) => {
  next()
})

router.put('/boards/*', [authenticate({scope: 'boards:write'})], (req, res, next) => {
  next()
})

router.delete('/boards/*', [authenticate({scope: 'boards:write'})], (req, res, next) => {
  next()
})

router.get(['/boards', '/boards/*', '/me/boards', '/me/boards/*'], [authenticate({scope: 'boards:read'})], (req, res, next) => {
  next()
})

router.post(['/teams', '/teams/*'], [authenticate({scope: 'teams:write'})], (req, res, next) => {
  next()
})

router.put('/teams/*', [authenticate({scope: 'teams:write'})], (req, res, next) => {
  next()
})

router.delete('/teams/*', [authenticate({scope: 'teams:write'})], (req, res, next) => {
  next()
})

router.get(['/teams', '/teams/*', '/me/teams', '/me/teams/*'], [authenticate({scope: 'teams:read'})], (req, res, next) => {
  next()
})

router.get('/me', [authenticate({scope: 'users.profile:read'})], (req, res, next) => {
  next()
})

router.put(['/me', '/users/:userId'], [authenticate({scope: 'users.profile:write'})], (req, res, next) => {
  next()
})

require('./List')(router, controllers)
require('./Board')(router, controllers.boardController)
require('./Card')(router, controllers.cardController)
require('./User')(router, controllers.userController)
require('./Comment')(router, controllers.commentController)
require('./Attachment')(router, controllers.attachmentController)
require('./Checklist')(router, controllers.checklistController)
require('./Team')(router, controllers.teamController)
require('./Label')(router, controllers)

router.get('/', (req, res) => {
  res.redirect('/api-docs')
})

module.exports = router
