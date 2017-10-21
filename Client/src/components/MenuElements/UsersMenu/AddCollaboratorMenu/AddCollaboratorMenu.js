import React from 'react'

import Button from '../../../UI/Button/Button'
import DropDown from '../../../UI/DropDown/DropDown'
import Icon from '../../../UI/Icon/Icon'

import { addCollaborator, fetchMatchingUsers } from '../../../../store/actions'

export default class AddCollaboratorMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      matchingUsers: [],
      enableAdd: false,
      inputValue: ''
    }
    this.addCollaborator = this.addCollaborator.bind(this)
    this.onChange = this.onChange.bind(this)
    this.setInputValue = this.setInputValue.bind(this)
  }

  addCollaborator () {
    if (this.email.value !== '') {
      addCollaborator(this.props.dispatch, this.props.boardId, this.email.value)
    }
  }

  onChange () {

    const newMatchingUsers = fetchMatchingUsers(this.email.value)
    console.log(newMatchingUsers)
    this.setState({
      inputValue: this.email.value,
      enableAdd: false})
    //this.setState({matchingUsers: newMatchingUsers})
  }

  setInputValue (email) {
    this.setState({
      inputValue: email,
      enableAdd: true})
  }

  render () {

    let menuElements = [{
      action: () => this.setInputValue('tamer'),
      placeholder: 'tamer'
    }]
    this.state.matchingUsers.map(user =>
      menuElements.push({
        action: null,
        placeholder: user.username,
        description: user.email
      })
    )

    //console.log(menuElements)

    return (
    <div className='host'>
      <DropDown
        layout='custom'
        orientation='left'
        button={<Button
          bgColor='rgba(0,0,0,0)'
          color='#444'
          hoverBgColor='rgba(0,0,0,0.1)'
          block
        >
          <Icon color='#000' name='user-plus' fontSize='20px' />
            Add a collaborator
        </Button>}
        title='Collaborators'>
        <div style={{ width: '300px' }}>
          <ul>
            <li className='element'>
              <div className='element-text'>Enter a name or an e-mail address to invite someone new !</div>
              <div className='element-input'>
                <form onSubmit={this.addCollaborator}>
                  <DropDown
                    menuElements={menuElements}
                  >
                    <input type='text' height='20px' value={this.state.inputValue} placeholder='georges.abitbol@mondedem.fr' onChange={this.onChange} ref={(t) => { this.email = t }} />
                  </DropDown>
                </form>
              </div>
              <div className='element-button'>
                <Button
                  bgColor='#5AAC44'
                  block
                  onClick={this.addCollaborator}
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
