const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AttachmentSchema = new Schema({
  name: {type: String, default: ''},
  url: {type: String},
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: Date.now}
})

mongoose.model('Attachment', AttachmentSchema)
