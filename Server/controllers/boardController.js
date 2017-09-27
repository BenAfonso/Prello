const mongoose = require('mongoose')
const Board = mongoose.model('Board')
const User = mongoose.model('User')
const List = mongoose.model('List')

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
        console.log(item.lists)
    });
})
/**
 * Functions
 */
