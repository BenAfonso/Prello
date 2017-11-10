const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RefreshTokenSchema = new Schema({
  refresh_token: String,
  expires: Date,
  scope: String,
  User: { type: Schema.Types.ObjectId, ref: 'User' },
  OAuthClient: { type: Schema.Types.ObjectId, ref: 'OAuthClient' }
})

module.exports = mongoose.model('OAuthRefreshToken', RefreshTokenSchema)
