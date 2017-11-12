const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LabelSchema = new Schema({
  name: {type: String, default: ''},
  color: {type: String, default: ''}
})

mongoose.model('Label', LabelSchema)
