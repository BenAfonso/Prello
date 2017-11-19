import React from 'react'
import {connect} from 'react-redux'
import Icon from '../../UI/Icon/Icon'
import AvatarThumbnail from '../../UI/AvatarThumbnail/AvatarThumbnail'
import AddCollaboratorMenu from './AddCollaboratorMenu/AddCollaboratorMenu'
import { removeCollaborator } from '../../../store/actions'
import {Redirect} from 'react-router-dom'
import { displayNotification } from '../../../services/Notification.service'

@connect(store => {
  return {
    currentboard: store.currentBoard,
    board: store.currentBoard.board,
    currentUser: store.currentUser
  }
})

export default class UsersMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: -1
    }
    this.getInitials = this.getInitials.bind(this)
    this.renderUserAvatar = this.renderUserAvatar.bind(this)
    this.removeCollaborator = this.removeCollaborator.bind(this)
    this.handleOutCollaborator = this.handleOutCollaborator.bind(this)
    this.handleInCollaborator = this.handleInCollaborator.bind(this)
  }

  isCurrentUserOwner () {
    if (this.props.board.owner !== undefined) {
      const isAdmin = this.props.currentUser._id === this.props.board.owner._id
      return isAdmin
    } else {
      return false
    }
  }

  isUserCurrentUser (userId) {
    const isSame = this.props.currentUser._id === userId
    return isSame
  }

  isSelectedOwner (user) {
    if (this.props.board.owner !== undefined) {
      const isAdmin = user._id === this.props.board.owner._id
      return isAdmin
    } else {
      return false
    }
  }

  handleInCollaborator (i) {
    this.setState({user: i})
  }

  handleOutCollaborator () {
    this.setState({user: -1})
  }

  getInitials (name) {
    const matches = name.match(/\b(\w)/g)
    const initials = matches.join('').toUpperCase()
    return initials
  }

  removeCollaborator (userId) {
    removeCollaborator(this.props.board._id, userId)
    this.setState({user: -1})
    if (this.isUserCurrentUser(userId)) {
      this.setState({redirectTo: '/'})
      displayNotification({type: 'success', title: 'You left the board', content: `You're no longer a collaborator of the board ${this.props.board.title}`})
    }
  }

  renderUserAvatar (user) {
    return (
      <div className='avatar'>
        <AvatarThumbnail
          size='30px'
          fontSize=''
          thumbnail={user.picture}
          initials={this.getInitials(user.name)}
          bgColor={user.bgColor}
          color='black'
        />
        <style jsx>
          {`
          .avatar {
            display: inline-block;
            padding: 5px 5px;
            cursor: pointer;
          }
        `}
        </style>
      </div>
    )
  }

  renderDeleteUser () {
    return (
      <div className='avatar'>
        <div className='delete'>X</div>
        <style jsx>
          {`
          .avatar{
            display: inline-block;
            padding: 5px 5px;
            cursor: pointer;
          }
          .delete{
            width: 30px;
            height: 30px;
            background: #ff3399;
            border-radius: 50%;
            text-align: center;
            line-height: 30px;
            font-size: 20px;
            font-weight: bold;
            color: white;         
          }
          `}
        </style>
      </div>
    )
  }

  render () {
    if (this.state.redirectTo) {
      return (<Redirect to={this.state.redirectTo} />)
    }
    const { collaborators, owner } = this.props.board
    const boardId = this.props.board._id

    return (
      <div className='host'>
        <div className='usermenu-title'>
          LIST OF COLLABORATORS
        </div>
        <div className='usermenu-collaborators'>
          <ul className='collaborators'>
            {
              collaborators.map((user, i) => (
                !user.isTeamUser ? <div className='collaborator' key={i} onClick={!this.isSelectedOwner(user) && (this.isCurrentUserOwner() || this.isUserCurrentUser(user._id)) ? () => this.removeCollaborator(user._id) : null} onMouseEnter={!this.isSelectedOwner(user) && (this.isCurrentUserOwner() || this.isUserCurrentUser(user._id)) ? () => this.handleInCollaborator(i) : null} onMouseLeave={!this.isSelectedOwner(user) && (this.isCurrentUserOwner() || this.isUserCurrentUser(user._id)) ? this.handleOutCollaborator : null}>
                  {
                    user._id === owner._id ? <div className='ownerIcon'><Icon color='#ffff00' name='star' fontSize='20px' /></div> : null
                  }
                  {
                    this.state.user === i
                      ? this.renderDeleteUser()
                      : this.renderUserAvatar(user)
                  }
                </div>
                  : null))
            }
          </ul>
        </div>
        <div className='usermenu-separator' />
        {
          this.isCurrentUserOwner()
            ? <AddCollaboratorMenu boardId={boardId} collaborators={collaborators} />
            : null
        }
        <style jsx>
          {`

          .usermenu-separator {
            content: '';
            height: 1px;
            padding: 0;
            background-color: #aaa;
            width: 90%;
            margin: 8px 0 8px 5%;
          }

          .usermenu-title {
            font-weight: bold;          
          }

          .collaborators {
            display: flex;
            flex-wrap: wrap;
            padding: 10px 5px
            max-height: 100px;
            overflow-y: auto;
          }

          .collaborator {
            position: relative;
            width: auto;
            height: auto;            
          }

          .ownerIcon {
            position: absolute;
            right: 0px;
            top: -5px;
            z-index: 500;
          }

          
        `}
        </style>
      </div>
    )
  }
}
