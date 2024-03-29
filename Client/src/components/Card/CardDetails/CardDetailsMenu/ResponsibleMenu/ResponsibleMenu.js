import React from 'react'
import { updateResponsible, removeResponsible } from '../../../../../store/actions'
import {connect} from 'react-redux'
import Button from '../../../../UI/Button/Button'
import DropDown from '../../../../UI/DropDown/DropDown'
import AvatarThumbnail from '../../../../UI/AvatarThumbnail/AvatarThumbnail'

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board
  }
})

export default class ResponsibleMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      matchingBoardCollaborators: this.props.board.collaborators.slice(0, 10),
      enableAdd: false,
      inputValue: ''
    }
    this.updateResponsible = this.updateResponsible.bind(this)
    this.onChange = this.onChange.bind(this)
    this.setInputValue = this.setInputValue.bind(this)
    this.getInitials = this.getInitials.bind(this)
  }

  isResponsible (collaborator) {
    if (this.props.responsible) return this.props.responsible.email === collaborator.email
    else return false
  }

  updateResponsible () {
    updateResponsible(this.props.board._id, this.props.board.lists[this.props.listIndex]._id, this.props.cardId, this.email.value)
    this.setState({
      inputValue: '',
      enableAdd: false,
      matchingBoardCollaborators: this.props.board.collaborators
    })
  }

  removeResponsible () {
    removeResponsible(this.props.board._id, this.props.board.lists[this.props.listIndex]._id, this.props.cardId)
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
            text-align: left;
            padding: 5px 0;
            font-size: 10px;
            color: #999;        
          }
        `}</style>
      </div>
    )
  }

  render () {
    let menuElements = this.state.matchingBoardCollaborators.map(collaborator => {
      return {
        action: this.setInputValue.bind(this, collaborator.email),
        placeholder: this.renderUserinMenu(collaborator),
        closer: true,
        disabled: this.isResponsible(collaborator)
      }
    })

    return (
      <div className='host'>
        <DropDown
          layout='custom'
          orientation={this.props.orientation}
          button={this.props.button}
          title='Responsible'>
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
                    onClick={this.updateResponsible}
                    disabled={!this.state.enableAdd}
                  >
                  Set Responsible
                  </Button>
                </div>
                {
                  this.props.responsible
                    ? <div className='element-button'>
                      <Button
                        bgColor='#e60000'
                        block
                        onClick={() => this.removeResponsible(this.props.responsible)}
                      >
                      Remove
                      </Button>
                    </div>
                    : null
                }
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
