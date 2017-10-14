const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const config = require('../')
const User = mongoose.model('User')
module.exports = new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL
},
(accessToken, refreshToken, profile, done) => {
  User.findOne({'google.id': profile.id}, '_id email provider').exec(function (err, user) {
    console.log(user)
    if (err) return done(err)
    if (!user) {
      user = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        username: profile.username,
        provider: 'google',
        google: profile._json
      })
      user.save(function (err) {
        if (err) console.log(err)
        return done(err, user)
      })
    } else {
      return done(err, user)
    }
  })
})
