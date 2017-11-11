import { fetchTeams, addTeamDistant, addTeamMemberDistant, removeTeamMemberDistant, removeTeamAdminDistant, setTeamAdminDistant, unsetTeamAdminDistant } from '../services/Team.services'
import { fetchBoards, addBoardDistant, addTeamBoardDistant, addCollaboratorDistant, removeCollaboratorDistant } from '../services/Board.services'
import { addListDistant, postCard, deleteList, moveListDistant, updateList } from '../services/List.services'
import { moveCard, addMemberDistant, removeMemberDistant, updateCard, updateResponsibleDistant, removeResponsibleDistant } from '../services/Card.services'
import { fetchMatchingUsersEmail } from '../services/User.services'

import store from '../store/store'

export function addList (dispatch, boardId, name) {
  addListDistant(boardId, name)
    .then((list) => {
      // <= HANDLED FROM SOCKETS
    })
}

export function addListLocal (list) {
  if (list) {
    store.dispatch({
      type: 'ADD_LIST',
      payload: list
    })
  }
}

export function addNotification (notification) {
  store.dispatch({
    type: 'ADD_NOTIFICATION',
    payload: { ...notification, id: Math.floor(Math.random() * 1000000) }
  })
}

export function removeNotification (index) {
  store.dispatch({
    type: 'REMOVE_NOTIFICATION',
    payload: index
  })
}

export function removeLastNotification () {
  store.dispatch({
    type: 'REMOVE_NOTIFICATION'
  })
}

export function updateCardAction (listId, card) {
  store.dispatch({
    type: 'UPDATE_CARD',
    payload: {
      listId: listId,
      card: card
    }
  })
}

export function moveList (dispatch, boardId, listId, position) {
  moveListDistant(boardId, listId, position)
    .then((lists) => {
      // <= HANDLED FROM SOCKETS
    })
}

export function moveCardDistant (boardId, cardId, oldListId, newListId, position) {
  moveCard(boardId, cardId, oldListId, newListId, position)
}
export function moveCardLocal (list) {
  if (list) {
    store.dispatch({
      type: 'MOVE_CARD',
      payload: list
    })
  }
}

export function moveListLocal (list) {
  if (list) {
    store.dispatch({
      type: 'MOVE_LIST',
      payload: list
    })
  }
}

export function setBoard (dispatch, id) {
  return new Promise((resolve, reject) => {
    dispatch({type: 'FETCH_BOARD_START'})
    fetchBoards().then((data) => {
      dispatch({
        type: 'FETCH_BOARD_SUCCESS',
        payload: data.filter(x => x._id === id)[0]
      })
      resolve(data.filter(x => x._id === id)[0])
    }).catch((err) => {
      dispatch({
        type: 'FETCH_BOARD_ERROR',
        payload: err
      })
      reject(err)
    })
  })
}

export function resetBoard (dispatch) {
  store.dispatch({
    type: 'RESET_BOARD'
  })
}

export function updateLists (dispatch, lists) {
  dispatch({
    type: 'UPDATE_LISTS',
    payload: lists
  })
}

export function updateCards (dispatch, listIndex, cards) {
  dispatch({
    type: 'UPDATE_CARDS',
    payload: {
      listIndex: listIndex,
      cards: cards
    }
  })
}

export function removeList (dispatch, boardId, list) {
  deleteList(boardId, list._id).then(res => {
    dispatch({
      type: 'REMOVE_LIST',
      payload: list
    })
  }).catch(err => {
    return err
  })
}

export function setConnectedUser (user) {
  store.dispatch({
    type: 'SET_USER',
    payload: user
  })
}

export function removeListLocal (list) {
  store.dispatch({
    type: 'REMOVE_LIST',
    payload: list
  })
}

export function addCard (dispatch, boardId, listId, content) {
  postCard(boardId, listId, content).then(card => {
  }).catch(err => {
    return err
  })
}
export function addCardLocal (listId, card) {
  store.dispatch({
    type: 'ADD_CARD',
    payload: {
      listId: listId,
      card: card
    }
  })
}

export function setBoardslist (dispatch) {
  return new Promise((resolve, reject) => {
    dispatch({type: 'FETCH_BOARDSLIST_START'})
    fetchBoards().then((data) => {
      dispatch({
        type: 'FETCH_BOARDSLIST_SUCCESS',
        payload: data
      })
      resolve(data)
    }).catch((err) => {
      dispatch({
        type: 'FETCH_BOARDSLIST_ERROR',
        payload: err
      })
    })
  })
}

export function addBoard (dispatch, payload) {
  addBoardDistant(payload).then((board) => {
    // <= HANDLED FROM SOCKETS
  }).catch(err => {
    return err
  })
}

export function addTeamBoard (dispatch, payload) {
  addTeamBoardDistant(payload).then((board) => {
    // <= HANDLED FROM SOCKETS
  }).catch(err => {
    return err
  })
}

export function addBoardLocal (board) {
  if (board) {
    store.dispatch({
      type: 'ADD_BOARD',
      payload: board
    })
  }
}

export function setTeamslist (dispatch) {
  return new Promise((resolve, reject) => {
    dispatch({type: 'FETCH_TEAMSLIST_START'})
    fetchTeams().then((data) => {
      dispatch({
        type: 'FETCH_TEAMSLIST_SUCCESS',
        payload: data
      })
      resolve(data)
    }).catch((err) => {
      dispatch({
        type: 'FETCH_TEAMSLIST_ERROR',
        payload: err
      })
    })
  })
}

export function addTeam (teamName) {
  addTeamDistant(teamName).then((team) => {
    if (team) {
      store.dispatch({
        type: 'ADD_TEAM',
        payload: team
      })
    }
  }).catch(err => {
    return err
  })
}

/* export function addTeamLocal (team) {
  if (team) {
    store.dispatch({
      type: 'ADD_TEAM',
      payload: team
    })
  }
} */

export function setTeam (dispatch, id) {
  return new Promise((resolve, reject) => {
    dispatch({type: 'FETCH_TEAM_START'})
    fetchTeams().then((data) => {
      dispatch({
        type: 'FETCH_TEAM_SUCCESS',
        payload: data.filter(x => x._id === id)[0]
      })
      resolve(data.filter(x => x._id === id)[0])
    }).catch((err) => {
      dispatch({
        type: 'FETCH_TEAM_ERROR',
        payload: err
      })
      reject(err)
    })
  })
}

export function addTeamMember (teamId, email) {
  addTeamMemberDistant(teamId, email).then((team) => {
    updateTeamLocal(team)
  }).catch(err => {
    return err
  })
}

export function removeTeamMember (teamId, userId) {
  removeTeamMemberDistant(teamId, userId).then((res) => {
    removeTeamMemberLocal(userId)
  }).catch(err => {
    return err
  })
}

export function removeTeamMemberLocal (userId) {
  if (userId) {
    store.dispatch({
      type: 'REMOVE_MEMBER',
      payload: userId
    })
  }
}

export function removeTeamAdmin (teamId, userId) {
  removeTeamAdminDistant(teamId, userId).then((res) => {
    removeTeamAdminLocal(userId)
  }).catch(err => {
    return err
  })
}

export function removeTeamAdminLocal (userId) {
  if (userId) {
    store.dispatch({
      type: 'REMOVE_ADMIN',
      payload: userId
    })
  }
}

export function setTeamAdmin (teamId, userId) {
  setTeamAdminDistant(teamId, userId).then((res) => {
    updateTeamLocal(res)
  }).catch(err => {
    return err
  })
}

export function unsetTeamAdmin (teamId, userId) {
  unsetTeamAdminDistant(teamId, userId).then((res) => {
    updateTeamLocal(res)
  }).catch(err => {
    return err
  })
}

export function updateTeamAdminsLocal (userId) {
  if (userId) {
    store.dispatch({
      type: 'UPDATE_ADMINS',
      payload: userId
    })
  }
}

export function updateTeamLocal (team) {
  if (team) {
    console.log('team', team)
    store.dispatch({
      type: 'UPDATE_TEAM',
      payload: team
    })
  }
}

export function setBoardHistory (history) {
  store.dispatch({
    type: 'SET_BOARD_HISTORY',
    payload: history
  })
}

export function addCollaborator (dispatch, boardId, email) {
  addCollaboratorDistant(boardId, email).then((board) => {
  }).catch(err => {
    return err
  })
}

export function removeCollaborator (boardId, userId) {
  removeCollaboratorDistant(boardId, userId).then((board) => {
  }).catch(err => {
    return err
  })
}

export function replaceCollaboratorsLocal (users) {
  if (users) {
    store.dispatch({
      type: 'UPDATE_COLLABORATORS',
      payload: users
    })
  }
}

export function addChecklistAction (cardId, title) {
  if (cardId && title.length > 0) {
    store.dispatch({
      type: 'ADD_CHECKLIST',
      payload: {
        cardId: cardId,
        title: title
      }
    })
  }
}

export function removeChecklist (cardId, checklistIndex) {
  if (cardId && checklistIndex > -1) {
    store.dispatch({
      type: 'DELETE_CHECKLIST',
      payload: {
        cardId: cardId,
        checklistIndex: checklistIndex
      }
    })
  }
}

export function addChecklistItem (cardId, checklistIndex, content) {
  if (cardId && checklistIndex > -1 && content.length > 0) {
    store.dispatch({
      type: 'ADD_CHECKLIST_ITEM',
      payload: {
        cardId: cardId,
        checklistIndex: checklistIndex,
        content: content
      }
    })
  }
}

export function fetchMatchingUsers (email) {
  return new Promise((resolve, reject) => {
    fetchMatchingUsersEmail(email).then((users) => {
      resolve(users)
    }).catch(err => {
      reject(err)
    })
  })
}

export function updateChecklistItem (cardId, checklistIndex, itemIndex, content, doneDate = null) {
  if (cardId && checklistIndex > -1 && content.length > 0) {
    store.dispatch({
      type: 'UPDATE_CHECKLIST_ITEM',
      payload: {
        cardId: cardId,
        checklistIndex: checklistIndex,
        itemIndex: itemIndex,
        content: content,
        doneDate: doneDate
      }
    })
  }
}

export function deleteChecklistItem (cardId, checklistIndex, itemIndex) {
  if (cardId && checklistIndex > -1 && itemIndex > -1) {
    store.dispatch({
      type: 'DELETE_CHECKLIST_ITEM',
      payload: {
        cardId: cardId,
        checklistIndex: checklistIndex,
        itemIndex: itemIndex
      }
    })
  }
}

export function addMember (boardId, listId, cardId, email) {
  addMemberDistant(boardId, listId, cardId, email)
}

export function removeMember (boardId, listId, cardId, userId) {
  removeMemberDistant(boardId, listId, cardId, userId)
}

export function updateResponsible (boardId, listId, cardId, email) {
  updateResponsibleDistant(boardId, listId, cardId, email)
}

export function removeResponsible (boardId, listId, cardId, email) {
  removeResponsibleDistant(boardId, listId, cardId)
}

export function updateCardDueDate (boardId, listId, card, dueDate) {
  let newCard = { ...card, dueDate: dueDate }
  updateCard(boardId, listId, card._id, newCard)
}

export function removeCardDueDate (boardId, listId, card) {
  let newCard = { ...card, dueDate: null, validated: false }
  console.log(newCard)
  updateCard(boardId, listId, card._id, newCard)
}

export function updateCardValidated (boardId, listId, card, validated) {
  let newCard = { ...card, validated: validated }
  updateCard(boardId, listId, card._id, newCard)
}

export function archiveCard (boardId, listId, card) {
  if (card.isArchived) { return }
  let newCard = { ...card, isArchived: true }
  store.dispatch({
    type: 'UPDATE_CARD',
    payload: {
      listId: listId,
      card: newCard
    }
  })
  updateCard(boardId, listId, card._id, newCard)
}

export function restoreCard (boardId, listId, card) {
  if (!card.isArchived) { return }
  let newCard = { ...card, isArchived: false }
  store.dispatch({
    type: 'UPDATE_CARD',
    payload: {
      listId: listId,
      card: newCard
    }
  })
  updateCard(boardId, listId, card._id, newCard)
}

export function archiveList (boardId, list) {
  if (list.isArchived) { return }
  list.isArchived = true
  store.dispatch({
    type: 'UPDATE_LIST',
    payload: list
  })
  updateList(boardId, list._id, list)
}

export function restoreList (boardId, list) {
  if (!list.isArchived) { return }
  let newList = { ...list, isArchived: false }
  updateList(boardId, list._id, newList)
  store.dispatch({
    type: 'UPDATE_LIST',
    payload: newList
  })
}

export function setOAuthClients (clients) {
  store.dispatch({
    type: 'SET_OAUTHCLIENTS',
    payload: clients
  })
}

export function addOAuthClient (client) {
  store.dispatch({
    type: 'ADD_OAUTHCLIENT',
    payload: client
  })
}

export function removeOAuthClient (client) {
  store.dispatch({
    type: 'REMOVE_OAUTHCLIENT',
    payload: client._id
  })
}
