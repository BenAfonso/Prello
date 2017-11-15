import React from 'react'
import Button from '../../../UI/Button/Button'
import Icon from '../../../UI/Icon/Icon'
import AvatarThumbnail from '../../../UI/AvatarThumbnail/AvatarThumbnail'
import DropDown from '../../../UI/DropDown/DropDown'
import AddMemberMenu from './AddMemberMenu'
import {connect} from 'react-redux'
import { removeTeamMember, removeTeamAdmin, setTeamAdmin, unsetTeamAdmin } from '../../../../store/actions'
import { displayNotification } from '../../../../services/Notification.service'

@connect(store => {
  return {
    currentTeam: store.currentTeam,
    team: store.currentTeam.team
  }
})

export default class MembersTab extends React.Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  constructor (props) {
    super(props)
    this.state = {
      matchingTeamMembers: this.props.team.users
    }
    this.onSearchChange = this.onSearchChange.bind(this)
  }

  // Lifecycle
  componentWillReceiveProps (nextProps) {
    if (this.props.team !== nextProps.team) {
      this.updateMatchingMembers(nextProps)
    }
  }

  // Server calls
  removeTeamMember (userId) {
    removeTeamMember(this.props.team._id, userId)
  }

  removeTeamAdmin (userId) {
    removeTeamAdmin(this.props.team._id, userId)
  }

  removeTeamAdminSelf (userId) {
    if (this.isLastAdmin()) {
      displayNotification({type: 'error', title: 'Error', content: 'You\'re the last admin ! You can\'t just leave like that...'})
    } else {
      removeTeamAdmin(this.props.team._id, userId)
    }
  }

  setTeamAdmin (member) {
    setTeamAdmin(this.props.team._id, member._id)
  }

  unsetTeamAdmin (member) {
    unsetTeamAdmin(this.props.team._id, member._id)
  }

  unsetTeamAdminSelf (member) {
    if (this.isLastAdmin()) {
      displayNotification({type: 'error', title: 'Error', content: 'You\'re the last admin !'})
    } else {
      unsetTeamAdmin(this.props.team._id, member._id)
    }
  }

  // Other functions
  updateMatchingMembers (nextProps) {
    this.setState({matchingTeamMembers: nextProps.team.users})
  }

  isCurrentUserAdmin () {
    const isAdmin = this.props.team.admins.filter(admin => admin._id === this.props.currentUserId)[0]
    return isAdmin !== undefined
  }

  isMemberAdmin (member) {
    const isAdmin = this.props.team.admins.filter(admin => admin._id === member._id)[0]
    return isAdmin !== undefined
  }

  isLastAdmin () {
    const isLast = this.props.team.admins.length === 1
    return isLast
  }

  getMatchingMembers (email) {
    const reg = new RegExp(email, 'i')
    let matchingMembers = []
    this.props.team.users.map(member => member.email.match(reg) ? matchingMembers.push(member) : null)
    return matchingMembers.slice(0, 10)
  }

  onSearchChange () {
    this.setState({
      enableAdd: false
    })
    if (this.email.value !== '') {
      const newmatchingTeamMembers = this.getMatchingMembers(this.email.value)
      this.setState({
        matchingTeamMembers: newmatchingTeamMembers
      })
    } else {
      this.setState({
        matchingTeamMembers: this.props.team.users
      })
    }
  }

  renderMemberAction (member) {
    const isCurrentAdmin = this.isCurrentUserAdmin(member)
    const isMemberAdmin = this.isMemberAdmin(member)
    return (
      <div className='member-actions'>
        <div className='member-button'>
          {isCurrentAdmin ? this.renderRoleDropdown(member) : this.renderRole(member)}
        </div>
        <div className='member-button'>
          {
            this.props.currentUserId === member._id
              ? isCurrentAdmin
                ? <Button
                  bgColor='rgba(255,255,255,0.1)'
                  hoverBgColor='rgba(255,255,255,0.3)'
                  color='#dcdcda'
                  gradient
                  onClick={() => this.removeTeamAdminSelf(member._id)}>
                  <Icon color='#dcdcda' name='remove' fontSize='20px' />&nbsp;Leave
                </Button>
                : <Button
                  bgColor='rgba(255,255,255,0.1)'
                  hoverBgColor='rgba(255,255,255,0.3)'
                  color='#dcdcda'
                  gradient
                  onClick={() => this.removeTeamMember(member._id)}>
                  <Icon color='#dcdcda' name='remove' fontSize='20px' />&nbsp;Leave
                </Button>
              : isCurrentAdmin
                ? <Button
                  bgColor='rgba(255,255,255,0.1)'
                  hoverBgColor='rgba(255,255,255,0.3)'
                  color='#dcdcda'
                  gradient
                  onClick={isMemberAdmin ? () => this.removeTeamAdmin(member._id) : () => this.removeTeamMember(member._id)}>
                  <Icon color='#dcdcda' name='remove' fontSize='20px' />&nbsp;Remove
                </Button>
                : null
          }
        </div>
        <style jsx>{`
        .member-actions {
          display: flex;
          align-items: center;
        }

        .member-button {
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
    menuElements = [
      {
        action: isAdmin ? null : () => this.setTeamAdmin(member),
        placeholder: 'Admin',
        closer: true,
        disabled: isAdmin
      },
      {
        action: !isAdmin
          ? null
          : this.props.currentUserId === member._id
            ? () => this.unsetTeamAdminSelf(member)
            : () => this.unsetTeamAdmin(member),
        placeholder: 'Normal',
        closer: true,
        disabled: !isAdmin
      }
    ]

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
          size='60px'
          fontSize='30px'
          thumbnail={user.picture}
          initials={this.getInitials(user.username)}
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
    const teamId = this.props.team._id
    const members = this.props.team.users
    return (
      <div className='host'>
        <div className='sidebar'>
          <ul className='menu'>
            <li className='menuTitle'>Search Team</li>
            <li className='menuSeparator'></li>
            <li className='menuItem'>
              <input className='menuItemInput' placeholder='Find members...' onChange={this.onSearchChange} ref={(t) => { this.email = t }} />
            </li>
          </ul>
          {
            this.isCurrentUserAdmin()
              ? <ul className='menu'>
                <li className='menuTitle'>Add Members</li>
                <li className='menuSeparator'></li>
                <li className='menuItem'>
                  <AddMemberMenu teamId={teamId} members={members} />
                </li>
              </ul>
              : null
          }
        </div>
        <div className='main'>
          <ul className='members'>
            {
              this.state.matchingTeamMembers.map((member, i) => (
                <div key={member._id}>
                  <li className='member' >
                    <div className='member-infos'>
                      <div className='member-avatar'>
                        {this.renderUserAvatar(member)}
                      </div>
                      <div className='member-names'>
                        <div className='member-name'>{member.username}</div>
                        <div className='member-email'>{member.email}</div>
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

          .host {
            color: white;
          }

          .menu {
            padding-bottom: 40px;
          }
          .menuSeparator {
            display: block;            
            height: 1px;
            border-top: 1px solid white;
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
            border: 1px solid rgba(0,0,0,0.2);
            box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
          }

          .sidebar {
            width: 250px;
            float: left;
          }

          .main {
            margin-left: 290px;
            overflow-x: auto;
          }

          .member {
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: space-between;
          }

          .member-infos {
            display: flex;
            align-items: center;
          }

          .member-names {
            display: inline-block;
            margin-left: 10px;
            min-width: 175px;
          }

          .member-name {
            font-weight: bold;
            font-size: 20px;
          }

          .member-email {
            color: #ddd
            font-size: 15px;
          }

          .memberSeparator {
            display: block;            
            height: 1px;
            border-top: 1px solid white;
            margin: 10px 0;
          }
        `}</style>
      </div>
    )
  }
}
