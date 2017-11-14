import React from 'react'

import Button from '../../../UI/Button/Button'
import DropDown from '../../../UI/DropDown/DropDown'
import Icon from '../../../UI/Icon/Icon'
import AvatarThumbnail from '../../../UI/AvatarThumbnail/AvatarThumbnail'

import { addTeamMember, fetchMatchingUsers } from '../../../../store/actions'

export default class AddMemberMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      matchingUsers: [],
      enableAdd: false,
      inputValue: ''
    }
    this.addTeamMember = this.addTeamMember.bind(this)
    this.onChange = this.onChange.bind(this)
    this.setInputValue = this.setInputValue.bind(this)
    this.getInitials = this.getInitials.bind(this)
    this.isTeamMember = this.isTeamMember.bind(this)
  }

  isTeamMember (user) {
    return (this.props.members.find(member => member._id === user._id) !== undefined)
  }

  addTeamMember () {
    addTeamMember(this.props.teamId, this.email.value)
    this.setState({
      inputValue: '',
      enableAdd: false,
      matchingUsers: []
    })
  }

  onChange () {
    this.setState({
      inputValue: this.email.value,
      enableAdd: false})
    if (this.email.value.length >= 3) {
      let newMatchingUsers = []
      fetchMatchingUsers(this.email.value).then(users => {
        users.map(user =>
          newMatchingUsers.push(user)
        )
        this.setState({matchingUsers: newMatchingUsers})
      })
    } else {
      this.setState({matchingUsers: []})
    }
  }

  setInputValue (email) {
    this.setState({
      inputValue: email,
      enableAdd: true
    })
  }

  getInitials (name) {
    const matches = name.match(/\b(\w)/g)
    const initials = matches.join('').toUpperCase()
    return initials
  }

  renderUserinMenu (user) {
    return (
      <div className='user'>
        <div className='user-thumbnail'>
          <AvatarThumbnail
            size='30px'
            fontSize=''
            thumbnail={user.picture}
            initials={this.getInitials(user.username)}
            bgColor={user.bgColor}
            color='black'
          />
        </div>
        <div className='user-infos'>
          <div className='user-username'>{user.username}</div>
          <div className='user-email'>{user.email}</div>
        </div>
        <style jsx>{`

    .user-infos {
      float: right;
      display: inline-block;
      padding: 0 10px;
      overflow: hidden;
      width: 190px;
      text-overflow: ellipsis;    
    }

    .user-thumbnail {
      float: left;  
    }

    .user-username {
      font-weight: bold;
      text-align: left;
      color: #000;
    }

    .user-email {
      font-style: italic;
      padding: 5px 0;
      font-size: 10px;
      color: #999;        
    }
    `}
        </style>
      </div>
    )
  }

  render () {
    let menuElements = []
    this.state.matchingUsers.filter(user =>
      menuElements.push({
        action: () => this.setInputValue(user.email),
        placeholder: this.renderUserinMenu(user),
        closer: true,
        disabled: this.isTeamMember(user)
      })
    )

    return (
      <div className='host'>
        <DropDown
          layout='custom'
          orientation='left'
          button={<Button
            bgColor='rgba(255,255,255,0.1)'
            color='#dcdcda'
            hoverBgColor='rgba(255,255,255,0.3)'
            block
          >
            <Icon color='white' name='user-plus' fontSize='20px' />&nbsp;Add a member
          </Button>}
          title='Team members'>
          <div style={{ width: '300px' }}>
            <ul>
              <li className='element'>
                <div className='element-text'>Enter a name or an e-mail address to invite someone new !</div>
                <div className='element-input'>
                  <form onSubmit={this.addTeamMember}>
                    <DropDown
                      menuElements={menuElements}
                      scrollable
                      maxHeight='250px'
                      input={<input type='text' height='20px' value={this.state.inputValue} placeholder='georges.abitbol@mondedem.fr' onChange={this.onChange} ref={(t) => { this.email = t }} />}
                    />
                  </form>
                </div>
                <div className='element-button'>
                  <Button
                    bgColor='#5AAC44'
                    block
                    onClick={this.addTeamMember}
                    disabled={!this.state.enableAdd}
                  >
                  Add
                  </Button>
                </div>
              </li>
              <li className='separator' />
              <li className='element'>
                <div className='element-text'>Invite people by giving them a link</div>
              </li>
            </ul>
          </div>
        </DropDown>
        <style jsx>{`

    .host {
      width: 100%;
      display:flex;
    }

    .users-list {
      overflow-y: auto;
    }
    .element {
      padding: 15px;
    }

    .element-input {
      padding: 8px 0px;
    }

    .element-button {
      padding: 8px 0;
    }

    input {
      font-size: inherit;
      width: 100%;
      padding: 8px;
      border-radius: 3px;
      border: 1px solid rgba(0,0,0,0.2);
      box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
    }

    .separator {
      content: '';
      height: 1px;
      padding: 0;
      background-color: #aaa;
      width: 90%;
      margin: 8px 0 8px 5%;
    }
    `}</style>
      </div>
    )
  }
}
