const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MODIFICATION_TYPES = [
  'MOVED_CARD',
  'ADDED_COLLABORATOR_BOARD',
  'REMOVED_COLLABORATOR_BOARD',
  'SET_RESPONSABLE',
  'JOINED_RESPONSABLE',
  'ADDED_USER_CARD',
  'REMOVED_USER_CARD',
  'JOINED_CARD',
  'LEFT_CARD',
  'ADDED_COMMENT',
  'ADDED_ATTACHMENT',
  'ARCHIVED_LIST',
  'ARCHIVED_CARD',
  'ADDED_DUE_DATE',
  'MARKED_DUE_DATE_COMPLETE',
  'MARKED_DUE_DATE_INCOMPLETE'
]

const ModificationSchema = new Schema({
  type: {type: String, enum: MODIFICATION_TYPES, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  timestamp: {type: Date, default: Date.now},
  fromList: {type: Schema.Types.ObjectId, ref: 'List'},
  toList: {type: Schema.Types.ObjectId, ref: 'List'},
  targetUser: {type: Schema.Types.ObjectId, ref: 'User'},
  card: {type: Schema.Types.ObjectId, ref: 'Card'},
  comment: {type: Schema.Types.ObjectId, ref: 'Comment'},
  list: {type: Schema.Types.ObjectId, ref: 'List'}
})

mongoose.model('Modification', ModificationSchema)
