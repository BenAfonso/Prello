const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    text: {type :String, default:''},
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: {type : Date},
    isArchived: {type : Boolean, default : false},
})

mongoose.model('Comment', CommentSchema);