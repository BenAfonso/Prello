import React from 'react'
import {connect} from 'react-redux'
import Button from '../../../../UI/Button/Button'
import DropDown from '../../../../UI/DropDown/DropDown'

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board
  }
})

export default class MembersMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  onChange () {
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

  render () {
    return (
      <div className='host'>
        <DropDown
          layout='custom'
          orientation={this.props.orientation}
          button={this.props.button}
          title='Due Date'>
          <div style={{ width: '300px' }}>
            <ul>
              <li className='element'>
                <div className='element-input'>
                  <form onSubmit={this.addCollaborator}>
                    <div className='input-block'>
                      <div className='input-title'>Date</div>
                      <input />
                    </div>
                    <div className='input-block'>
                      <div className='input-title'>Hour</div>
                      <input />
                    </div>
                  </form>
                </div>
                <div className='buttons'>
                  <div className='add-button'>
                    <Button
                      bgColor='#5AAC44'
                    >
                    Add
                    </Button>
                  </div>
                  <div className='remove-button'>
                    <Button
                      bgColor='#CC0000'
                    >
                    Remove
                    </Button>
                  </div>
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

    .buttons {
      width: 100%;
    }

    .add-button {
      float: left;
      padding: 10px 0;
    }

    .remove-button {
      float: right;
      padding: 10px 0;
    }

    .input-block {
      display: inline-block;
      width: 100%;
    }

    .input-title {
      font-weight: bold;
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
