import React from 'react'
import PropTypes from 'prop-types'
import AvatarThumbnail from '../AvatarThumbnail/AvatarThumbnail'
import styles from './ModificationListElement.styles'

export default class ModificationListElement extends React.Component {
  static propTypes = {
    modification: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.getModificationContent = this.getModificationContent.bind(this)
    this.renderUser = this.renderUser.bind(this)
    this.renderAddedCollaboratorBoard = this.renderAddedCollaboratorBoard.bind(this)
    this.renderRemovedCollaboratorBoard = this.renderRemovedCollaboratorBoard.bind(this)
    this.renderArchivedList = this.renderArchivedList.bind(this)
    this.renderArchivedCard = this.renderArchivedCard.bind(this)
    this.renderUnarchivedCard = this.renderUnarchivedCard.bind(this)
    this.renderUnarchivedList = this.renderUnarchivedList.bind(this)
    this.renderAddedDueDate = this.renderAddedDueDate.bind(this)
    this.renderMarkedDueDateComplete = this.renderMarkedDueDateComplete.bind(this)
    this.renderMarkedDueDateIncomplete = this.renderMarkedDueDateIncomplete.bind(this)
    this.renderAddComment = this.renderAddComment.bind(this)
    this.renderSetReponsible = this.renderSetReponsible.bind(this)
  }

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
    return <span>{card.text}</span>
  }

  renderList (list) {
    const style = { textDecoration: 'underline' }
    return <span style={style}>{list.name}</span>
  }

  renderAddedCollaboratorBoard (user, targetUser, timestamp) {
    if (user._id === targetUser._id) {
      return <div>{this.renderUser(user)} joined collaborators on board {this.renderDate(timestamp)}</div>
    } else {
      return <div>{this.renderUser(user)} added {this.renderUser(targetUser)} to board's collaborators {this.renderDate(timestamp)}</div>
    }
  }

  renderRemovedCollaboratorBoard (user, targetUser, timestamp) {
    if (user._id === targetUser._id) {
      return <div>{this.renderUser(user)} left collaborators on board {this.renderDate(timestamp)}</div>
    } else {
      return <div>{this.renderUser(user)} removed {this.renderUser(targetUser)} from board's collaborators {this.renderDate(timestamp)}</div>
    }
  }

  renderArchivedList (user, list, timestamp) {
    return <div>{this.renderUser(user)} archived list {list.name} {this.renderDate(timestamp)}</div>
  }

  renderArchivedCard (user, card, timestamp) {
    return <div>{this.renderUser(user)} archived card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
  }

  renderUnarchivedList (user, list, timestamp) {
    return <div>{this.renderUser(user)} unarchived list {list.name} {this.renderDate(timestamp)}</div>
  }

  renderUnarchivedCard (user, card, timestamp) {
    return <div>{this.renderUser(user)} unarchived card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
  }

  renderAddedDueDate (user, card, dueDate, timestamp) {
    // TODO: Add due date on text
    return <div>{this.renderUser(user)} added due date on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
  }

  renderMarkedDueDateComplete (user, card, timestamp) {
    return <div>{this.renderUser(user)} marked due date as complete on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
  }

  renderMarkedDueDateIncomplete (user, card, timestamp) {
    return <div>{this.renderUser(user)} marked due date as incomplete on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
  }

  renderAddComment (user, comment, card, timestamp) {
    return <div>{this.renderUser(user)} commented on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
  }

  renderSetReponsible (user, targetUser, card, timestamp) {
    if (user && targetUser) {
      if (user._id === targetUser._id) {
        return <div>{this.renderUser(user)} joined responsable on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
      } else {
        return <div>{this.renderUser(user)} set {this.renderUser(targetUser)} as responsable on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
      }
    } else {
      return null
    }
  }

  renderMovedCard (user, card, fromList, toList, timestamp) {
    return <div>{this.renderUser(user)} moved card {this.renderCard(card)} from list {this.renderList(fromList)} to list {this.renderList(toList)} {this.renderDate(timestamp)}</div>
  }

  renderCreatedCard (user, card, list, timestamp) {
    return <div>{this.renderUser(user)} created card {this.renderCard(card)} in list {this.renderList(list)} {this.renderDate(timestamp)}</div>
  }

  renderAddedUserCard (user, targetUser, card, timestamp) {
    if (user._id === targetUser._id) {
      return <div>{this.renderUser(user)} joined collaborators on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
    } else {
      return <div>{this.renderUser(user)} added {this.renderUser(targetUser)} as collaborators on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
    }
  }

  renderRemovedUserCard (user, targetUser, card, timestamp) {
    if (user._id === targetUser._id) {
      return <div>{this.renderUser(user)} left collaborators on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
    } else {
      return <div>{this.renderUser(user)} removed {this.renderUser(targetUser)} from collaborators on card {this.renderCard(card)} {this.renderDate(timestamp)}</div>
    }
  }

  getModificationContent () {
    switch (this.props.modification.type) {
      case 'ADDED_COMMENT':
        return this.renderAddComment(this.props.modification.user, this.props.modification.comment, this.props.modification.card, this.props.modification.timestamp)
      case 'SET_RESPONSABLE':
        return this.renderSetReponsible(this.props.modification.user, this.props.modification.targetUser, this.props.modification.card, this.props.modification.timestamp)
      case 'ADDED_USER_CARD':
        return this.renderAddedUserCard(this.props.modification.user, this.props.modification.targetUser, this.props.modification.card, this.props.modification.timestamp)
      case 'REMOVED_USER_CARD':
        return this.renderRemovedUserCard(this.modification.props.user, this.props.modification.targetUser, this.props.modification.card, this.props.modification.timestamp)
      case 'CREATED_CARD':
        return this.renderCreatedCard(this.props.modification.user, this.props.modification.card, this.props.modification.list, this.props.modification.timestamp)
      case 'MOVED_CARD':
        return this.renderMovedCard(this.props.modification.user, this.props.modification.card, this.props.modification.fromList, this.props.modification.toList, this.props.modification.timestamp)
      case 'ADDED_COLLABORATOR_BOARD':
        return this.renderAddedCollaboratorBoard(this.props.modification.user, this.props.modification.targetUser, this.props.modification.timestamp)
      case 'REMOVED_COLLABORATOR_BOARD':
        return this.renderRemovedCollaboratorBoard(this.props.modification.user, this.props.modification.targetUser, this.props.modification.timestamp)
      case 'ARCHIVED_LIST':
        return this.renderArchivedList(this.props.modification.user, this.props.modification.list, this.props.modification.timestamp)
      case 'ARCHIVED_CARD':
        return this.renderArchivedCard(this.props.modification.user, this.props.modification.card, this.props.modification.timestamp)
      case 'UNARCHIVED_LIST':
        return this.renderUnarchivedList(this.props.modification.user, this.props.modification.list, this.props.modification.timestamp)
      case 'UNARCHIVED_CARD':
        return this.renderUnarchivedCard(this.props.modification.user, this.props.modification.card, this.props.modification.timestamp)
      case 'ADDED_DUE_DATE':
        return this.renderAddedDueDate(this.props.modification.user, this.props.modification.card, this.props.modification.dueDate, this.props.modification.timestamp)
      case 'MARKED_DUE_DATE_COMPLETE':
        return this.renderMarkedDueDateComplete(this.props.modification.user, this.props.modification.card, this.props.modification.timestamp)
      case 'MARKED_DUE_DATE_INCOMPLETE':
        return this.renderMarkedDueDateIncomplete(this.props.modification.user, this.props.modification.card, this.modification.props.timestamp)
      default:
        return null
    }
  }

  getInitials (name) {
    const matches = name.match(/\b(\w)/g)
    const initials = matches.join('').toUpperCase()
    return initials
  }

  render () {
    if (this.getModificationContent() !== null) {
      return (
        <div className='host'>
          <div className='avatar'>
            <AvatarThumbnail
              size='40px'
              fontSize='24px'
              thumbnail={this.props.modification.user.picture}
              bgColor={this.props.modification.user.bgColor}
              initials={this.getInitials(this.props.modification.user.name)}
              color='black'/>
          </div>
          <div className='content'>
            <div className='textContent'>
              {this.getModificationContent()}
            </div>
          </div>
          <style jsx>{styles}</style>
        </div>
      )
    } else {
      return null
    }
  }
}
