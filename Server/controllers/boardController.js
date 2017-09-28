const mongoose = require('mongoose')
const Board = mongoose.model('Board')
const User = mongoose.model('User')
const List = mongoose.model('List')

const boardController = {}

boardController.getAllBoards = function(req, res, next){
    Board.find().populate('owner lists collaborators').exec(function (err, item) {
        if(err){
            res.status(500).json(err)
        }else{
            res.status(200).json(item)
        }
    })
}

boardController.createBoard = function(req, res, next){
    const boardToAdd = new Board(req.body)
    boardToAdd.save((err,item)=> {
        if(err){
            res.status(500).json(err)
        }else{
            res.status(200).json(item)
        }
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
})*/
/**
 * Functions
 */
