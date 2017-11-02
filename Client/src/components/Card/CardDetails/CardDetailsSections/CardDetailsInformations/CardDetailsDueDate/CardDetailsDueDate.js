import React from 'react'
import {connect} from 'react-redux'
import { updateCardValidated } from '../../../../../../store/actions'

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board
  }
})

export default class CardDetailsDueDate extends React.Component {
  constructor (props) {
    super(props)
    this.updateValidated = this.updateValidated.bind(this)
  }

  updateValidated () {
    const list = this.props.board.lists[this.props.listIndex]
    const card = list.cards.filter(c => c._id === this.props.id)[0]
    updateCardValidated(this.props.board._id, this.props.board.lists[this.props.listIndex]._id, card, this.checkbox.checked)
  }

  getDueDateColor (validated, dueDate) {
    const dueDateMinus24 = dueDate.getTime() - (60 * 60 * 24 * 1000)
    const dueDatePlus24 = dueDate.getTime() + (60 * 60 * 24 * 1000)
    const now = Date.now()
    if (validated) return '#5AAC44'
    else if (now >= dueDateMinus24 && now < dueDate) return 'rgba(220,200,0,1)'
    else if (now < dueDatePlus24 && now >= dueDate) return 'rgba(200,0,0,1)'
    else if (now >= dueDatePlus24) return 'rgba(200,0,0,0.3)'
  }

  getDueDateTextColor (validated, dueDate) {
    const dueDateMinus24 = dueDate.getTime() - (60 * 60 * 24 * 1000)
    const now = Date.now()
    if (validated || now >= dueDateMinus24) return 'white'
  }

  getDueDateText (validated, dueDate) {
    const dueDateMinus24 = dueDate.getTime() - (60 * 60 * 24 * 1000)
    const dueDatePlus24 = dueDate.getTime() + (60 * 60 * 24 * 1000)
    const now = Date.now()
    if (validated) return ''
    else if (now >= dueDateMinus24 && now < dueDate) return ' (due soon)'
    else if (now < dueDatePlus24 && now >= dueDate) return ' (recently past due !)'
    else if (now >= dueDatePlus24) return ' (past due)'
    else return ''
  }

  render () {
    const list = this.props.board.lists[this.props.listIndex]
    const card = list.cards.filter(c => c._id === this.props.id)[0]
    const dueDate = new Date(card.dueDate)
    const day = (dueDate.getDate() < 10 ? '0' : '') + dueDate.getDate()
    const month = ((dueDate.getMonth() + 1) < 10 ? '0' : '') + (dueDate.getMonth() + 1)
    const year = dueDate.getFullYear()
    const hours = (dueDate.getHours() < 10 ? '0' : '') + dueDate.getHours()
    const minutes = (dueDate.getMinutes() < 10 ? '0' : '') + dueDate.getMinutes()
    const formatedDate = day + '/' + month + '/' + year + ' à ' + hours + ':' + minutes

    return (
      <div className='host' style={{
        background: this.getDueDateColor(card.validated, dueDate)
      }}>
        <div className='checkbox'>
          <input type='checkbox' ref={t => { this.checkbox = t }} checked={card.validated} onClick={this.updateValidated} />
        </div>
        <div className='dueDate' style={{color: this.getDueDateTextColor(card.validated, dueDate)}}>
          {
            formatedDate + this.getDueDateText(card.validated, dueDate)
          }
        </div>
        <style jsx>
          {`
            .host {
              display: flex;
              background: #eee;
              border-radius: 3px;
              align-items: center;
              height: 30px;
            }

            .checkbox {
              display: flex;
              padding: 5px;
            }

            input[type=checkbox] {
              height: 20px;
              width: 20px;
            }
            
            .dueDate{
              padding: 5px;
            }
          `}
        </style>
      </div>
    )
  }
}
