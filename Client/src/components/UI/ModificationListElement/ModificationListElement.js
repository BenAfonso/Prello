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
  }

  getModificationContent () {
    switch (this.props.modification.type) {
      case 'ADDED_USER_CARD': {
        return `${this.props.modification.user.username} added ${this.props.modification.targetUser.username} to the card ${this.props.modification.card.text} in the board ${this.props.modification.board.title}`
      }
      case 'REMOVED_USER_CARD': {
        return `${this.props.modification.user.username} removed ${this.props.modification.targetUser.username} to the card ${this.props.modification.card.text} in the board ${this.props.modification.board.title}` // TODO
      }
      case 'ADDED_COMMENT': {
        return `${this.props.modification.user.username} commented the card ${this.props.modification.card.text} in the board ${this.props.modification.board.title}`
      }
      case 'MOVED_CARD': {
        if (this.props.modification.fromList !== null && this.props.modification.toList !== null) {
          return `${this.props.modification.user.username} moved the card ${this.props.modification.card.text} from ${this.props.modification.fromList.name} to ${this.props.modification.toList.name} in the board ${this.props.modification.board.title}`
        } else {
          return null
        }
      }
      case 'ADDED_COLLABORATOR_CARD': {
        return `${this.props.modification.user.username} added ${this.props.modification.targetUser.username} as collaborator to the card ${this.props.modification.card.text} in the board ${this.props.modification.board.title}`
      }
      case 'ADDED_COLLABORATOR_BOARD': {
        return `${this.props.modification.user.username} added ${this.props.modification.targetUser.username} as collaborator to the board ${this.props.modification.board.title}`
      }
      case 'REMOVED_COLLABORATOR_CARD': {
        return `${this.props.modification.user.username} removed ${this.props.modification.targetUser.username} as collaborator to the card ${this.props.modification.card.text} in the board ${this.props.modification.board.title}` // TODO
      }
      case 'ARCHIVED_LIST': {
        return `${this.props.modification.user.username} archived the list ${this.props.modification.list.name} in the board ${this.props.modification.board.title}`
      }
      case 'ARCHIVED_CARD': {
        return `${this.props.modification.user.username} archived the card ${this.props.modification.card.text} in the board ${this.props.modification.board.title}`
      }
      case 'MARKED_DUE_DATE_COMPLETE': {
        return `${this.props.modification.user.username} marked the due date of the card ${this.props.modification.card.text} in the board ${this.props.modification.board.title}`
      }
      case 'ADDED_DUE_DATE': {
        return `${this.props.modification.user.username} added a due date to the card ${this.props.modification.card.text} in the board ${this.props.modification.board.title}`
      }
      case 'SET_RESPONSABLE': {
        return `${this.props.modification.user.username} set ${this.props.modification.targetUser.username} responsible for the card ${this.props.modification.card.text}
        in the board ${this.props.modification.board.title}`
      }
      case 'JOINED_REPONSIBLE': {
        return '' // TODO
      }
      case 'JOINED_CARD': {
        return '' // TODO
      }
      case 'LEFT_CARD': {
        return '' // TODO
      }
      case 'ADDED_ATTACHMENT': {
        return '' // TODO
      }
      default: {
        return null
      }
    }
  }

  getInitials (name) {
    const matches = name.match(/\b(\w)/g)
    const initials = matches.join('').toUpperCase()
    return initials
  }

  render () {
    const date = new Date(this.props.modification.timestamp)
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
            <div className='dateContent'>
              {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}
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
