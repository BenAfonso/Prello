const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Subtask = {
    text: {type: String, default: ''},
    isChecked: {type: Boolean, default: false}
}

const Checklist= {
    text: {type: String, default: ''},
    subtasks: [Subtask]
}

const CardSchema = new Schema({
    text: {type: String, default: ''},
    dueDate: {type: Date},
    checklists: [Checklist],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
    createdAt: {type : Date},
    isArchived: {type : Boolean, default : false},
})

mongoose.model('Card', CardSchema);