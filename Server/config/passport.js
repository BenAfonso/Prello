const mongoose = require('mongoose')
const User = mongoose.model('User')

// const jwt = require('./passport/jwt')
// const google = require('./passport/google')

module.exports = passport => {
  // serialize
  passport.serializeUser((user, cb) => cb(null, user.id))
  passport.deserializeUser((id, cb) => User.load({ where: { _id: id } }, cb))

  // use these strategies
  // passport.use(jwt)
  // passport.use(google)
}
