const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Subtask = {
  text: {type: String, default: ''},
  isChecked: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now}
}

const Checklist = {
  text: {type: String, default: ''},
  subtasks: [Subtask],
  createdAt: {type: Date, default: Date.now}
}

const CardSchema = new Schema({
  text: {type: String, default: '', required: true},
  dueDate: {type: Date},
  checklists: [Checklist],
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  createdAt: {type: Date, default: Date.now},
  isArchived: {type: Boolean, default: false},
  description: {type: String, default: ''},
  attachments: [{type: Schema.Types.ObjectId, ref: 'Attachment'}],
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  responsible: {type: Schema.Types.ObjectId, ref: 'User'},
  collaborators: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

CardSchema.methods = {
  addCollaborator: function (user) {

  },
  addCollaborators: function (users) {

  },
  setResponsible: function (user) {

  }
}

mongoose.model('Card', CardSchema)
