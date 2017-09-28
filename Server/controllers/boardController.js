const mongoose = require('mongoose')
const Board = mongoose.model('Board')

const boardController = {}

boardController.getAllBoards = function () {
  return new Promise((resolve, reject) => {
    Board.find().populate('owner lists collaborators').exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

boardController.createBoard = function (board) {
  return new Promise((resolve, reject) => {
    const boardToAdd = new Board(board)
    boardToAdd.save((err, item) => {
      if (err) {
        reject(err)
      } else {
        resolve(item)
      }
    })
  })
}
boardController.addListToBoard = function (boardId, list) {
  return new Promise((resolve, reject) => {
    console.log(boardId)
    Board.findOneAndUpdate({'_id': boardId}, {$push: {lists: list}}, {new: true}, function (err, res){
      console.log(res)
      console.log(err)
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

module.exports = boardController

/*
const user = new User({
    username:"userTest"
})
const list1 = new List({
    name:"Ma liste 1"
})
list1.save();
const list2 = new List({
    name:"Ma liste 2"
})
list2.save();
user.save();
const boardToAdd = new Board({
    name: "Mon board test",
    lists:[list1,list2],
    owner:user,
    collaborators:[user]
})
boardToAdd.save((err,res)=> {
    Board.findOne().populate('owner lists collaborators').exec(function (err, item) {
        console.log(item)
    });
}) */
/**
 * Functions
 */
