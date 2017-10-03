const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, default: '' },
  provider: { type: String, default: '' },
  passwordHash: { type: String, default: '' },
  salt: { type: String, default: '' },
  authToken: { type: String, default: '' },
  enabled: { type: Boolean, default: false },
  email: { type: String, default: '' }
})

mongoose.model('User', UserSchema)
