import React from 'react'
import { addMember } from '../../../../../store/actions'
import Button from '../../../../UI/Button/Button'
import DropDown from '../../../../UI/DropDown/DropDown'
import Icon from '../../../../UI/Icon/Icon'
import AvatarThumbnail from '../../../../UI/AvatarThumbnail/AvatarThumbnail'

export default class AddCollaboratorMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      matchingBoardCollaborators: this.props.collaborators,
      enableAdd: false,
      inputValue: ''
    }
    this.addMember = this.addMember.bind(this)
    this.onChange = this.onChange.bind(this)
    this.setInputValue = this.setInputValue.bind(this)
    this.getInitials = this.getInitials.bind(this)
    this.isCardMember = this.isCardMember.bind(this)
  }

  isCardMember (collaborator) {
    return (this.props.members.find(member => member._id === collaborator._id) !== undefined)
  }

  addMember () {
    //addMember(this.props.dispatch, this.props.cardId, this.email.value)
    this.setState({
      inputValue: '',
      enableAdd: false,
      matchingBoardCollaborators: this.props.collaborators
    })
  }

  getMatchingCollaborators (email) {
    const reg = new RegExp(email, 'i')
    let matchingCollaborators = []
    this.props.collaborators.map(collaborator => collaborator.email.match(reg) ? matchingCollaborators.push(collaborator) : null)
    return matchingCollaborators
  }

  onChange () {
    this.setState({
      inputValue: this.email.value,
      enableAdd: false})
    if (this.email.value !== '') {
      const newmatchingBoardCollaborators = this.getMatchingCollaborators(this.email.value)      
      this.setState({matchingBoardCollaborators: newmatchingBoardCollaborators})
    } else {
      this.setState({matchingBoardCollaborators: this.props.collaborators})
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
            initials={this.getInitials(user.name)}
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
      width: 200px;
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
    this.state.matchingBoardCollaborators.filter(collaborator =>
      menuElements.push({
        action: () => this.setInputValue(collaborator.email),
        placeholder: this.renderUserinMenu(collaborator),
        closer: true,
        disabled: this.isCardMember(collaborator)
      })
    )

    return (
    <div className='host'>
      <DropDown
        layout='custom'
        orientation={this.props.orientation}
        button={this.props.button}
        title='Members'>
        <div style={{ width: '300px' }}>
          <ul>
            <li className='element'>
              <div className='element-input'>
                <form onSubmit={this.addCollaborator}>
                  <DropDown
                    menuElements={menuElements}
                    input={<input type='text' height='20px' value={this.state.inputValue} placeholder='georges.abitbol@mondedem.fr' onChange={this.onChange} ref={(t) => { this.email = t }} />}
                  />
                </form>
              </div>
              <div className='element-button'>
                <Button
                  bgColor='#5AAC44'
                  block
                  onClick={this.addMember}
                  disabled={!this.state.enableAdd}
                >
                  Add
                </Button>
              </div>
            </li>
          </ul>
        </div>
      </DropDown>
      <style jsx>{`

    .host {
      width: 100%;
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
