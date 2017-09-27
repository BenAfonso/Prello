const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AttachmentSchema = new Schema({
    name: {type :String, default:''},
    url: {type : String},
})

mongoose.model('Attachment', AttachmentSchema);