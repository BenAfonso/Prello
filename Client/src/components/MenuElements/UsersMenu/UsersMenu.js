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
    board: store.currentBoard.board
  }
})

export default class UsersMenu extends React.Component {
  constructor (props) {
    super(props)
    this.getInitials = this.getInitials.bind(this)
    this.renderUserAvatar = this.renderUserAvatar.bind(this)
    this.removeCollaborator = this.removeCollaborator.bind(this)
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
          List of collaborators
        </div>
        <div className='usermenu-collaborators'>
          <ul className='collaborators-content'>
            <li className='collaborators'>
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
            </li>

          </ul>
        </div>
        <div className='usermenu-separator' />

        <AddCollaboratorMenu boardId={boardId} collaborators={collaborators} />
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

          .collaborators {
            padding: 10px 5px
            max-height: 100px;
            overflow-y: auto;
          }

          .collaborator {
            display:inline-block;
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
