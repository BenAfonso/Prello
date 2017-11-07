import React from 'react'
import {connect} from 'react-redux'
import Calendar from 'react-calendar'
import Button from '../../../../UI/Button/Button'
import DropDown from '../../../../UI/DropDown/DropDown'
import { updateCardDueDate, removeCardDueDate } from '../../../../../store/actions'

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board
  }
})

export default class DueDateMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedDate: '',
      selectedHour: '12:00',
      enableAdd: false
    }
    this.setInputValue = this.setInputValue.bind(this)
    this.isDueDateSet = this.isDueDateSet.bind(this)
    this.updateDueDate = this.updateDueDate.bind(this)
    this.removeDueDate = this.removeDueDate.bind(this)
    this.onHourChange = this.onHourChange.bind(this)
    this.checkHour = this.checkHour.bind(this)
  }

  updateDueDate () {
    const card = this.props.board.lists[this.props.listIndex].cards.filter(c => c._id === this.props.cardId)[0]
    const time = this.hour.value.split(':')
    const dueDate = new Date(this.state.selectedDate).setHours(time[0], time[1])
    updateCardDueDate(this.props.board._id, this.props.board.lists[this.props.listIndex]._id, card, dueDate)
  }

  removeDueDate () {
    const card = this.props.board.lists[this.props.listIndex].cards.filter(c => c._id === this.props.cardId)[0]
    removeCardDueDate(this.props.board._id, this.props.board.lists[this.props.listIndex]._id, card)
  }

  isDueDateSet () {
    const card = this.props.board.lists[this.props.listIndex].cards.filter(c => c._id === this.props.cardId)[0]
    return card.dueDate !== undefined
  }

  onHourChange () {
    this.setState({selectedHour: this.hour.value})
  }

  checkHour () {
    const regH = new RegExp('^([0-1]?[0-9]|2[0-4])$')
    const regM = new RegExp('^([0-5][0-9])$')
    const time = this.hour.value.split(':')
    let hour
    let minutes
    if (regH.test(time[0])) { hour = time[0] } else { hour = '12' }
    if (regM.test(time[1])) { minutes = time[1] } else { minutes = '00' }
    this.hour.value = hour + ':' + minutes
    this.setState({selectedHour: this.hour.value})
  }

  setInputValue (date) {
    const day = (date.getDate() < 10 ? '0' : '') + date.getDate()
    const month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1)
    const year = date.getFullYear()
    const inputDate = month + '/' + day + '/' + year
    this.date.value = inputDate
    this.setState({
      selectedDate: date,
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
                  <form onSubmit={this.updateDueDate}>
                    <div className='input-block'>
                      <div className='input-title'>Date</div>
                      <input ref={(t) => { this.date = t }} placeholder='MM/dd/YYYY' disabled />
                    </div>
                    <div className='input-block'>
                      <div className='input-title'>Hour</div>
                      <input ref={(t) => { this.hour = t }} value={this.state.selectedHour} onChange={this.onHourChange} onBlur={this.checkHour} />
                    </div>
                  </form>
                  <div className='calendar'>
                    <Calendar locale ='en-EN' onChange={this.setInputValue} />
                  </div>
                </div>
                <div className='buttons'>
                  <div className='add-button'>
                    <Button
                      bgColor='#5AAC44'
                      onClick={this.updateDueDate}
                      disabled={!this.state.enableAdd}
                    >
                    Add
                    </Button>
                  </div>
                  <div className='remove-button'>
                    <Button
                      bgColor='#CC0000'
                      onClick={this.removeDueDate}
                      disabled={!this.isDueDateSet()}
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

    .calendar {
      padding: 5px 0;
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
