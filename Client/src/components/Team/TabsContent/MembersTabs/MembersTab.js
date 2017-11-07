import React from 'react'
import Button from '../../../UI/Button/Button'
import Icon from '../../../UI/Icon/Icon'
import AvatarThumbnail from '../../../UI/AvatarThumbnail/AvatarThumbnail'
import DropDown from '../../../UI/DropDown/DropDown'
import AddMemberMenu from './AddMemberMenu'

import { removeTeamMember } from '../../../../store/actions'

export default class Team extends React.Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  isCurrentUserAdmin () {
    const isAdmin = this.props.admins.filter(admin => admin._id === this.props.currentUserId)[0]
    return isAdmin !== undefined
  }

  isMemberAdmin (member) {
    const isAdmin = this.props.admins.filter(admin => admin._id === member._id)[0]
    return isAdmin !== undefined
  }

  removeTeamMember (userId) {
    removeTeamMember(this.props.teamId, userId)
  }

  renderMemberAction (member) {
    const isCurrentAdmin = this.isCurrentUserAdmin(member)
    return (
      <div className='member-actions'>
        <div className='member-button'>
          {isCurrentAdmin ? this.renderRoleDropdown(member) : this.renderRole(member)}
        </div>
        <div className='member-button'>
          {
            isCurrentAdmin
              ? <Button
                bgColor='rgba(255,255,255,0.1)'
                hoverBgColor='rgba(255,255,255,0.3)'
                color='#dcdcda'
                gradient
                onClick={() => this.removeTeamMember(member._id)}>
                <Icon color='#dcdcda' name='remove' fontSize='20px' />&nbsp;{this.props.currentUserId === member._id ? 'Leave' : 'Remove'}
              </Button>
              : null
          }
        </div>
        <style jsx>{`
        .member-actions {
        }

        .member-button {
          display: inline-block;
          padding-left: 10px;
        }
        `}</style>
      </div>
    )
  }

  renderRole (member) {
    let role = ''
    const isAdmin = this.isMemberAdmin(member)
    if (isAdmin) {
      role = 'Admin'
    } else {
      role = 'Normal'
    }
    return (
      role
    )
  }

  renderRoleDropdown (member) {
    const isAdmin = this.isMemberAdmin(member)
    let menuElements = []
    if (isAdmin) {
      menuElements = [
        {
          action: null,
          placeholder: 'Admin',
          closer: true,
          disabled: true
        },
        {
          action: null,
          placeholder: 'Normal',
          closer: true,
          disabled: false
        }
      ]
    } else {
      menuElements = [
        {
          action: null,
          placeholder: 'Admin',
          closer: true,
          disabled: false
        },
        {
          action: null,
          placeholder: 'Normal',
          closer: true,
          disabled: true
        }
      ]
    }

    return (
      <DropDown
        menuElements={menuElements}
        scrollable
        maxHeight='250px'
      >
        <Button
          bgColor='rgba(255,255,255,0.1)'
          hoverBgColor='rgba(255,255,255,0.3)'
          color='#dcdcda'
          gradient
          onClick={null}>
          {isAdmin ? 'Admin' : 'Normal'}&nbsp;<Icon color='#dcdcda' name='chevron-circle-down' fontSize='20px' />
        </Button>
      </DropDown>
    )
  }

  getInitials (name) {
    const matches = name.match(/\b(\w)/g)
    const initials = matches.join('').toUpperCase()
    return initials
  }

  renderUserAvatar (user) {
    return (
      <div className='avatar' onClick={this.onAvatarClick}>
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
    const { teamId, members } = this.props

    return (
      <div className='host'>
        <div className='sidebar'>
          <ul className='menu'>
            <li className='menuTitle'>Search Team</li>
            <li className='menuSeparator'></li>
            <li className='menuItem'>
              <input className='menuItemInput' placeholder='Find members...' />
            </li>
          </ul>
          <ul className='menu'>
            <li className='menuTitle'>Add Members</li>
            <li className='menuSeparator'></li>
            <li className='menuItem'>
              <AddMemberMenu teamId={teamId} members={members} />
            </li>
          </ul>
        </div>
        <div className='main'>
          <ul className='members'>
            {
              members.map((member, i) => (
                <div>
                  <li key={member._id} className='member' >
                    <div className='member-infos'>
                      <div className='member-avatar'>
                        {/* this.renderUserAvatar(member) */}
                      </div>
                      <div className='member-names'>
                        {member.name}egrgfrerera
                      </div>
                    </div>
                    {this.renderMemberAction(member)}
                  </li>
                  <li className='memberSeparator'></li>
                </div>
              ))
            }
          </ul>
        </div>
        <style jsx>{`

          .menu {
            padding-bottom: 40px;
          }
          .menuSeparator {
            display: block;            
            height: 1px;
            border-top: 1px solid #999;
          }

          .menuTitle {
            text-align: center;
            padding-bottom: 10px;            
          }

          .menuItem {
            padding: 10px 0;
          }

          input {
            font-size: inherit;
            width: 100%;
            padding: 8px;
            border-radius: 3px;
          }

          .sidebar {
            width: 250px;
            float: left;
          }

          .main {
            margin-left: 290px;    
          }

          .member {
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: space-between;
          }

          .member-infos {

          }

          

          .memberSeparator {
            display: block;            
            height: 1px;
            border-top: 1px solid #999;
            margin: 10px 0;
          }
        `}</style>
      </div>
    )
  }
}
