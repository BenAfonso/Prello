import React from 'react'
import PropTypes from 'prop-types'
import CardDetails from '../../Card/CardDetails/CardDetails'
import {connect} from 'react-redux'

const MODIFICATION_TYPES = [
  'MOVED_CARD',
  'ADDED_COLLABORATOR_BOARD',
  'REMOVED_COLLABORATOR_BOARD',
  'SET_RESPONSABLE',
  'ADDED_USER_CARD',
  'REMOVED_USER_CARD',
  'ADDED_COMMENT',
  'ADDED_ATTACHMENT',
  'ARCHIVED_LIST',
  'ARCHIVED_CARD',
  'ADDED_DUE_DATE',
  'MARKED_DUE_DATE_COMPLETE',
  'MARKED_DUE_DATE_INCOMPLETE'
]

const modificationStyle = { fontSize: '13px' }

@connect(store => {
  return {
    board: store.currentBoard.board
  }
})
export default class Modification extends React.Component {
  renderDate (timestamp) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = new Date(timestamp)
    const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
    const style = { color: '#888', fontSize: '11px' }
    return <div style={style}>{date.getDate()} {months[date.getMonth()]} at {hours}:{minutes}</div>
  }

  renderUser (user) {
    const style = { fontWeight: 'bold' }
    return <span style={style}>{user.name}</span>
  }

  renderCard (card) {
    if (!card) { return <span>[ ? ]</span> }
    const style = { textDecoration: 'underline', cursor: 'pointer' }
    if (!card) { return <span>[?]</span> }
    let listIndex = this.props.board.lists.indexOf(this.props.board.lists.filter(l => l.cards.filter(c => c._id === card._id))[0])
    let index = this.props.board.lists[listIndex].cards.indexOf(this.props.board.lists[listIndex].cards.filter(c => c._id === card._id)[0])
    let newCard = {
      ...card,
      content: card.text,
      id: card._id,
      listIndex: listIndex,
      index: index
    }
    return <span style={style} onClick={this.displayCardDetails.bind(this, newCard)}>{newCard ? newCard.text : ''}</span>
  }

  renderList (list) {
    const style = { textDecoration: 'underline' }
    return <span style={style}>{list.name}</span>
  }

  displayCardDetails (card) {
    this.props.popoverManager.setRenderedComponent(
      <CardDetails {...card} dismissPopover={this.props.popoverManager.dismissPopover} />
    )
    this.props.popoverManager.displayPopover()
  }

  renderAddedCollaboratorBoard (user, targetUser, timestamp) {
    if (user._id === targetUser._id) {
      return <div style={modificationStyle}>{this.renderUser(user)} joined collaborators on board {this.renderDate(timestamp)}</div>
    } else {
      return <div style={modificationStyle}>{this.renderUser(user)} added {this.renderUser(targetUser)} to board's collaborators {this.renderDate(timestamp)}</div>
    }
  }

  renderRemovedCollaboratorBoard (user, targetUser, timestamp) {
    if (user._id === targetUser._id) {
      return <div style={modificationStyle}>{this.renderUser(user)} left collaborators on board {this.renderDate(timestamp)}</div>
    } else {
      return <div style={modificationStyle}>{this.renderUser(user)} removed {this.renderUser(targetUser)} from board's collaborators {this.renderDate(timestamp)}</div>
    }
  }

  renderArchivedList (user, list, timestamp) {
    return <div style={modificationStyle}>{this.renderUser(user)} archived list {list.name} {this.renderDate(timestamp)}</div>
  }

  renderArchivedCard (user, card, timestamp) {
    return <div style={modificationStyle}>{this.renderUser(user)} archived card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
  }

  renderAddedDueDate (user, card, dueDate, timestamp) {
    // TODO: Add due date on text
    return <div style={modificationStyle}>{this.renderUser(user)} added due date on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
  }

  renderMarkedDueDateComplete (user, card, timestamp) {
    return <div style={modificationStyle}>{this.renderUser(user)} marked due date as complete on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
  }

  renderMarkedDueDateIncomplete (user, card, timestamp) {
    return <div style={modificationStyle}>{this.renderUser(user)} marked due date as incomplete on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
  }

  renderAddComment (user, comment, card, timestamp) {
    return <div style={modificationStyle}>{this.renderUser(user)} commented on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
  }

  renderSetReponsible (user, targetUser, card, timestamp) {
    if (user._id === targetUser._id) {
      return <div style={modificationStyle}>{this.renderUser(user)} joined responsable on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
    } else {
      return <div style={modificationStyle}>{this.renderUser(user)} set {this.renderUser(targetUser)} as responsable on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
    }
  }

  renderMovedCard (user, card, fromList, toList, timestamp) {
    return <div style={modificationStyle}>{this.renderUser(user)} moved card {this.renderCard(card)} from list {this.renderList(fromList)} to list {this.renderList(toList)} {this.renderDate(timestamp)}</div>
  }

  renderAddedUserCard (user, targetUser, card, timestamp) {
    if (user._id === targetUser._id) {
      return <div style={modificationStyle}>{this.renderUser(user)} joined collaborators on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
    } else {
      return <div style={modificationStyle}>{this.renderUser(user)} added {this.renderUser(targetUser)} as collaborators on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
    }
  }

  renderRemovedUserCard (user, targetUser, card, timestamp) {
    if (user._id === targetUser._id) {
      return <div style={modificationStyle}>{this.renderUser(user)} left collaborators on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
    } else {
      return <div style={modificationStyle}>{this.renderUser(user)} removed {this.renderUser(targetUser)} from collaborators on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
    }
  }

  render () {
    switch (this.props.type) {
      case 'ADDED_COMMENT':
        return this.renderAddComment(this.props.user, this.props.comment, this.props.card, this.props.timestamp)
      case 'SET_RESPONSABLE':
        return this.renderSetReponsible(this.props.user, this.props.targetUser, this.props.card, this.props.timestamp)
      case 'ADDED_USER_CARD':
        return this.renderAddedUserCard(this.props.user, this.props.targetUser, this.props.card, this.props.timestamp)
      case 'REMOVED_USER_CARD':
        return this.renderRemovedUserCard(this.props.user, this.props.targetUser, this.props.card, this.props.timestamp)
      case 'MOVED_CARD':
        return this.renderMovedCard(this.props.user, this.props.card, this.props.fromList, this.props.toList, this.props.timestamp)
      case 'ADDED_COLLABORATOR_BOARD':
        return this.renderAddedCollaboratorBoard(this.props.user, this.props.targetUser, this.props.timestamp)
      case 'REMOVED_COLLABORATOR_BOARD':
        return this.renderRemovedCollaboratorBoard(this.props.user, this.props.targetUser, this.props.timestamp)
      case 'ARCHIVED_LIST':
        return this.renderArchivedList(this.props.user, this.props.list, this.props.timestamp)
      case 'ARCHIVED_CARD':
        return this.renderArchivedCard(this.props.user, this.props.card, this.props.timestamp)
      case 'ADDED_DUE_DATE':
        return this.renderAddedDueDate(this.props.user, this.props.card, this.props.dueDate, this.props.timestamp)
      case 'MARKED_DUE_DATE_COMPLETE':
        return this.renderMarkedDueDateComplete(this.props.user, this.props.card, this.props.timestamp)
      case 'MARKED_DUE_DATE_INCOMPLETE':
        return this.renderMarkedDueDateIncomplete(this.props.user, this.props.card, this.props.timestamp)
      default:
        return <div>Default</div>
    }
  }
}

Modification.propTypes = {
  type: PropTypes.oneOf(MODIFICATION_TYPES),
  user: PropTypes.any,
  targetUser: PropTypes.any,
  card: PropTypes.any,
  list: PropTypes.any,
  fromList: PropTypes.any,
  toList: PropTypes.any,
  timestamp: PropTypes.any
}

Modification.defaultProps = {
}
