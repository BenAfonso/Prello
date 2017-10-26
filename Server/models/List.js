const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = new Schema({
  name: {type: String, default: '', required: true},
  position: {type: Number},
  createdAt: {type: Date, default: Date.now},
  isArchived: {type: Boolean, default: false},
  cards: [{type: Schema.Types.ObjectId, ref: 'Card'}]
})

mongoose.model('List', ListSchema)
