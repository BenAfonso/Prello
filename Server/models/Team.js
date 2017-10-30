const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TeamSchema = new Schema({
  name: {type: String, default: ''},
  users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  createdAt: {type: Date, default: Date.now}
})

mongoose.model('Team', TeamSchema)
