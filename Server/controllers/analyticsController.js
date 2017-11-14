const mongoose = require('mongoose')
const Board = mongoose.model('Board')
const Team = mongoose.model('Team')
const modificationController = require('./modificationController')
const analyticsController = {}
const addDays = (theDate, days) => {
  return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)
}
const addMonths = (theDate, months) => {
  return theDate.setMonth(theDate.getMonth() + months)
}
const addYears = (theDate, years) => {
  return theDate.setFullYear(theDate.getFullYear() + years)
}
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
    Board.findOne({'_id': boardId}).populate({path: 'lists', model: 'List', populate: {path: 'cards', model: 'Card'}}).then((board) => {
      modificationController.findBoardHistory(boardId).then(modification => {
        board.modification = modification
        if (beginDate === undefined) {
          beginDate = new Date(board.createdAt)
        } else {
          beginDate = new Date(beginDate)
        }
        if (endDate === undefined) {
          endDate = new Date()
        } else {
          endDate = new Date(endDate)
        }
        if (per === undefined) {
          per = 'day'
        }
        beginDate = addDays(new Date(beginDate.getFullYear(), beginDate.getMonth(), beginDate.getDate(), 0, 59, 59, 999), 1)
        endDate = addDays(new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()), 1)
        let funcs = constructFuncArray(board, analyticsController.getBoardAnalyticsByDate, [], per, beginDate, endDate)
        executeFuncRecursive(funcs, [], 0).then(res => {
          resolve(res)
        }).catch(err => {
          console.log(err)
        })
      })
    })
  })
}
const executeFuncRecursive = (funcs, result, index) => {
  return new Promise((resolve, reject) => {
    if (funcs.length === (index)) {
      resolve()
    }
    funcs[index]().then(number => {
      result.push(number)
      executeFuncRecursive(funcs, result, index + 1).then(res => {
        result.concat(res)
        resolve(result)
      })
    }).catch(err => console.log(err))
  })
}
const constructFuncArray = (board, func, funcs, per, beginDate, endDate) => {
  switch (per) {
    case 'day':
      if (beginDate.getDate() === endDate.getDate() && beginDate.getMonth() === endDate.getMonth() && beginDate.getFullYear() === endDate.getFullYear()) {
        funcs.push(func.bind(this, board, beginDate, beginDate, `${beginDate.getDate() - 1}/${endDate.getMonth() + 1}/${beginDate.getFullYear()}`))
        return funcs
      }
      funcs.push(func.bind(this, board, beginDate, beginDate, `${beginDate.getDate() - 1}/${beginDate.getMonth() + 1}/${beginDate.getFullYear()}`))
      return constructFuncArray(board, func, funcs, per, addDays(beginDate, 1), endDate)
    case 'month':
      if (beginDate.getMonth() === endDate.getMonth() && beginDate.getFullYear() === endDate.getFullYear()) {
        funcs.push(func.bind(this, board, beginDate, beginDate, `${beginDate.getMonth() + 1}/${beginDate.getFullYear()}`))
        return funcs
      }
      funcs.push(func.bind(this, board, beginDate, beginDate, `${beginDate.getMonth() + 1}/${beginDate.getFullYear()}`))
      return constructFuncArray(board, func, funcs, per, addMonths(beginDate, 1), endDate)

    case 'year':
      if (beginDate.getFullYear() === endDate.getFullYear()) {
        funcs.push(func.bind(this, board, beginDate, beginDate, `${beginDate.getFullYear()}`))
        return funcs
      }
      funcs.push(func.bind(this, board, beginDate, beginDate, `${beginDate.getFullYear()}`))
      return constructFuncArray(board, func, funcs, per, addYears(beginDate, 1), endDate)
  }
}

analyticsController.getBoardAnalyticsByDate = (board, beginDate, endDate, dateFormat) => {
  return new Promise((resolve, reject) => {
    let numbers = {}
    numbers.date = dateFormat
    getNumberOfListsByDate(board, endDate).then(res => {
      numbers.numberOfLists = res
      getNumberOfCardsByDate(board, endDate).then(res => {
        numbers.numberOfCards = res
        getNumberOfListsArchivedByDate(board, endDate).then(res => {
          numbers.numberOfListsArchived = res
          getNumberOfCardsArchivedByDate(board, endDate).then(res => {
            numbers.numberOfCardsArchived = res
            resolve(numbers)
          }).catch((err) => {
            reject(err)
          })
        }).catch((err) => {
          reject(err)
        })
      }).catch((err) => {
        reject(err)
      })
    }).catch((err) => {
      reject(err)
    })
  })
}
const getNumberOfCardsByDate = (board, endDate) => {
  return new Promise((resolve, reject) => {
    let allCards = board.lists.map(l => l.cards).reduce((x, y) => x.concat(y))
    let cardSort = allCards.filter((c) => {
      return c.createdAt.getTime() < endDate.getTime()
    })
    resolve(cardSort.length)
  })
}
const getNumberOfListsByDate = (board, endDate) => {
  return new Promise((resolve, reject) => {
    let allLists = board.lists
    resolve(filterArrayWithCreatedAt(allLists, endDate).length)
  })
}
const getNumberOfListsArchivedByDate = (board, endDate) => {
  return new Promise((resolve, reject) => {
    let allModifications = board.modification
    let allListsArchived = allModifications.filter((item) => {
      return (item.type === 'ARCHIVED_LIST') && (item.timestamp.getTime() < endDate.getTime())
    })
    let allListsUnArchived = allModifications.filter((item) => {
      return (item.type === 'UNARCHIVED_LIST') && (item.timestamp.getTime() < endDate.getTime())
    })
    resolve(allListsArchived.length - allListsUnArchived.length)
  })
}
const getNumberOfCardsArchivedByDate = (board, endDate) => {
  return new Promise((resolve, reject) => {
    let allModifications = board.modification
    let allCardsArchived = allModifications.filter((item) => {
      return (item.type === 'ARCHIVED_CARD') && (item.timestamp.getTime() < endDate.getTime())
    })
    let allCardsUnArchived = allModifications.filter((item) => {
      return (item.type === 'UNARCHIVED_CARD') && (item.timestamp.getTime() < endDate.getTime())
    })
    resolve(allCardsArchived.length - allCardsUnArchived.length)
  })
}
const filterArrayWithCreatedAt = (array, date) => {
  return array.filter((item) => {
    return item.createdAt.getTime() < date.getTime()
  })
}
module.exports = analyticsController
