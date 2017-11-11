const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BoardSchema = new Schema({
  title: {type: String, default: '', required: true},
  lists: [{type: Schema.Types.ObjectId, ref: 'List'}],
  collaborators: [{type: Schema.Types.ObjectId, ref: 'User'}],
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  teams: [{type: Schema.Types.ObjectId, ref: 'Team'}],
  background: {type: String, default: '#2666fe'},
  visibility: {type: String, enum: ['public', 'private', 'team']},
  attachments: [{type: Schema.Types.ObjectId, ref: 'Attachment'}],
  createdAt: {type: Date, default: Date.now},
  isArchived: {type: Boolean, default: false},
  modifications: [{type: Schema.Types.ObjectId, ref: 'Modification'}]
})

mongoose.model('Board', BoardSchema)
