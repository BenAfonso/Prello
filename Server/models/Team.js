const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TeamSchema = new Schema({
  name: {type: String, default: ''},
  picture: { type: String, default: '' },
  admins: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  createdAt: {type: Date, default: Date.now},
  visibility: {type: String, enum: ['Public', 'Private'], default: 'Private'},
  boards: [{ type: Schema.Types.ObjectId, ref: 'Board', required: true }]
})

mongoose.model('Team', TeamSchema)
