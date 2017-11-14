import React from 'react'
import {connect} from 'react-redux'
import Icon from '../../UI/Icon/Icon'
import AvatarThumbnail from '../../UI/AvatarThumbnail/AvatarThumbnail'
import AddCollaboratorMenu from './AddCollaboratorMenu/AddCollaboratorMenu'
import DropDown from '../../UI/DropDown/DropDown'
import { removeCollaborator } from '../../../store/actions'

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
    this.getInitials = this.getInitials.bind(this)
    this.renderUserAvatar = this.renderUserAvatar.bind(this)
    this.removeCollaborator = this.removeCollaborator.bind(this)
  }

  isCurrentUserOwner () {
    if (this.props.board.owner !== undefined) {
      const isAdmin = this.props.currentUser._id === this.props.board.owner._id
      return isAdmin
    } else {
      return false
    }
  }

  getInitials (name) {
    const matches = name.match(/\b(\w)/g)
    const initials = matches.join('').toUpperCase()
    return initials
  }

  removeCollaborator (userId) {
    removeCollaborator(this.props.board._id, userId)
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

  render () {
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
                <div className='collaborator' key={i}>
                  {
                    user._id === owner._id ? <div className='ownerIcon'><Icon color='#ffff00' name='star' fontSize='20px' /></div> : null
                  }
                  <div className='collaborator-menu'>
                    <DropDown
                      orientation='right'
                      menuElements={[
                        {
                          action: null,
                          placeholder: <div className='collaborator-menu-element-title'>Modify permissions...<div className='collaborator-menu-element-infos'>(Permission lvl)</div></div>
                        },
                        {
                          action: null,
                          placeholder: <div className='collaborator-menu-element-title'>Show activity feed</div>,
                          closer: true
                        },
                        {
                          action: () => this.removeCollaborator(user._id),
                          placeholder: <div className='collaborator-menu-element-title'>Remove from board</div>,
                          closer: true,
                          disabled: user._id === this.props.board.owner._id
                        }
                      ]}
                      input={this.renderUserAvatar(user)}
                    />
                  </div>
                </div>))
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

          .collaborator-menu {
            z-index: 1000;
          }

          .collaborator-menu-element-infos {
            font-size: 12px;
            color: #999;
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
