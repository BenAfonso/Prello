const mongoose = require('mongoose')
const Board = mongoose.model('Board')
const Team = mongoose.model('Team')

const analyticsController = {}

analyticsController.getAllUserBoards = (userId) => {
  return new Promise((resolve, reject) => {
    Team.find({ 'users': userId }).then((teams) => {
      Board.find({$or: [{ 'owner': userId }, { 'collaborators': userId }, {'teams': {$in: teams}}]}, {name: 1}).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    }).catch((err) => {
      reject(err)
    })
  })
}

analyticsController.getBoardAnalytics = (boardId, per, beginDate, endDate) => {
  return new Promise((resolve, reject) => {
    Board.findOne({'_id': boardId}).populate({path: 'lists', model: 'List', populate: {path: 'lists.cards', model: 'Card'}}).then((board) => {
      if (beginDate === undefined) {
        beginDate = new Date(board.createdAt)
      }
      if (endDate === undefined) {
        endDate = new Date()
      }
      if (per === undefined) {
        per = 'day'
      }
      let funcs = analyticsController.constructFuncArray(board, [], per, beginDate, endDate)
      executeFuncRecursive(funcs, [], 0).then(res => {
        resolve(res)
      }).catch(err => {
        console.log(err)
      })
    })
  })
}
const executeFuncRecursive = (funcs, result, index) => {
  return new Promise((resolve, reject) => {
    if (funcs.length - 1 === (index)) {
      funcs[index]().then(number => resolve(number))
    }
    funcs[index]().then(number => {
      console.log(number)
      result.push(number)
      executeFuncRecursive(funcs, result, index + 1).then(res => {
        console.log(res)
        result.concat(res)
        resolve(result)
      })
    }).catch(err => console.log(err))
  })
}
analyticsController.constructFuncArray = (board, funcs, per, beginDate, endDate) => {
  switch (per) {
    case 'day':
      let begin = new Date(beginDate)
      // console.log(begin)
      if (begin.getDate() === endDate.getDate()) {
        funcs.push(analyticsController.getBoardAnalyticsByDate.bind(this, board, begin, endDate))
        return funcs
      }
      funcs.push(analyticsController.getBoardAnalyticsByDate.bind(this, board, begin, endDate))
      // console.log(funcs)
      return analyticsController.constructFuncArray(board, funcs, per, begin.setDate(begin.getDate() + 1), endDate)
    case 'month':
      if (beginDate.getMonth() === endDate.getMonth()) {
        return analyticsController.getBoardAnalyticsByDate(board, beginDate, endDate)
      }
      return funcs.push(analyticsController.constructFuncArray(board, funcs, per, beginDate.setDate(beginDate.getMonth() + 1), endDate))

    case 'year':
      if (beginDate.getMonth() === endDate.getMonth()) {
        return analyticsController.getBoardAnalyticsByDate(board, beginDate, endDate)
      }
      return funcs.push(analyticsController.constructFuncArray(board, funcs, per, beginDate.setDate(beginDate.getMonth() + 1), endDate))
  }
}

analyticsController.getBoardAnalyticsByDate = (board, beginDate, endDate) => {
  return new Promise((resolve, reject) => {
    let numbers = {}
    analyticsController.getNumberOfCardsByDate(board, endDate).then(res => {
      numbers.date = endDate
      numbers.numberOfCards = res
      console.log(numbers)
      resolve(numbers)
    }).catch((err) => {
      reject(err)
    })
  })
}
analyticsController.getNumberOfCardsByDate = (board, endDate) => {
  return new Promise((resolve, reject) => {
    let allCards = board.lists.map(t => t.cards).reduce((x, y) => x.concat(y))
    allCards.filter((c) => new Date((c.createdAt)).getDay() <= endDate.getDay())
    resolve(allCards.length)
  })
}
module.exports = analyticsController
