import React from 'react'
import { addMember, removeMember } from '../../../../../store/actions'
import {connect} from 'react-redux'
import Button from '../../../../UI/Button/Button'
import DropDown from '../../../../UI/DropDown/DropDown'
import AvatarThumbnail from '../../../../UI/AvatarThumbnail/AvatarThumbnail'
import Icon from '../../../../UI/Icon/Icon'

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board
  }
})

export default class MembersMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      matchingBoardCollaborators: this.props.board.collaborators.slice(0, 10),
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
    addMember(this.props.board._id, this.props.board.lists[this.props.listIndex]._id, this.props.cardId, this.email.value)
    this.setState({
      inputValue: '',
      enableAdd: false,
      matchingBoardCollaborators: this.props.board.collaborators
    })
  }

  removeMember (user) {
    removeMember(this.props.board._id, this.props.board.lists[this.props.listIndex]._id, this.props.cardId, user._id)
    this.setState({
      inputValue: '',
      enableAdd: false,
      matchingBoardCollaborators: this.props.board.collaborators
    })
  }

  getMatchingCollaborators (email) {
    const reg = new RegExp(email, 'i')
    let matchingCollaborators = []
    this.props.board.collaborators.map(collaborator => collaborator.email.match(reg) ? matchingCollaborators.push(collaborator) : null)
    return matchingCollaborators.slice(0, 10)
  }

  onChange () {
    this.setState({
      enableAdd: false
    })
    if (this.email.value !== '') {
      const newmatchingBoardCollaborators = this.getMatchingCollaborators(this.email.value)
      this.setState({
        inputValue: this.email.value,
        matchingBoardCollaborators: newmatchingBoardCollaborators
      })
    } else {
      this.setState({
        inputValue: this.email.value,
        matchingBoardCollaborators: this.props.board.collaborators
      })
    }
  }

  setInputValue (email) {
    this.email.value = email
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
          <div className='user-username'>
            {user.username}
          </div>
          <div className='user-email'>{user.email}</div>
          {this.isCardMember(user)
            ? <div className='remove-icon'><Icon color='#999' name='minus-circle' fontSize='30px' /></div>
            : null
          }
        </div>
        <style jsx>{`
          .user-infos {
            position: relative;
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
            width:100%;
            font-weight: bold;
            text-align: left;
            color: #000;
            text-overflow: ellipsis;   
          }

          .user-email {
            width:100%;
            font-style: italic;
            padding: 5px 0;
            font-size: 10px;
            color: #999;
            text-overflow: ellipsis;   
          }

          .remove-icon {
            position: absolute;
            top: 10px;
            right: 0;
          }
          
        `}</style>
      </div>
    )
  }

  render () {
    let menuElements = this.state.matchingBoardCollaborators.map(collaborator => {
      return {
        action: this.isCardMember(collaborator) ? this.removeMember.bind(this, collaborator) : this.setInputValue.bind(this, collaborator.email),
        placeholder: this.renderUserinMenu(collaborator),
        closer: !this.isCardMember(collaborator)
      }
    })

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
