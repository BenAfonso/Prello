const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OAuthClientSchema = new Schema({
  name: {type: String},
  client_id: {type: String},
  client_secret: {type: String},
  redirectUris: [{type: String}],
  grant_types: {type: String},
  scope: {type: String},
  User: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('OAuthClient', OAuthClientSchema)
