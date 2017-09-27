const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BoardSchema = new Schema({
    name: {type: String, default: ''},
    lists: [{ type: Schema.Types.ObjectId, ref: 'List'}],
    collaborators: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    owner: { type: Schema.Types.ObjectId, ref: 'User'},
    team: { type: Schema.Types.ObjectId, ref: 'Team'},    
    background: {type: String, default: ''},
    visibility: {type: String, enum: ['public', 'private','team']},
    createdAt: {type : Date},
    isArchived: {type : Boolean, default : false},
})

mongoose.model('Board', BoardSchema);