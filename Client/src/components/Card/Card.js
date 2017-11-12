import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import styles from './Card.styles'
import AvatarThumbnail from '../UI/AvatarThumbnail/AvatarThumbnail'
import Button from '../UI/Button/Button'
import Icon from '../UI/Icon/Icon'
import LabelThumbnail from '../UI/Label/LabelThumbnail'

@connect(store => {
  return {
    lists: store.currentBoard.board.lists
  }
})

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board
  }
})
export default class Card extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    bgColor: PropTypes.any,
    nbComments: PropTypes.number,
    nbChecklists: PropTypes.number,
    index: PropTypes.number.isRequired,
    listIndex: PropTypes.number.isRequired,
    collaborators: PropTypes.arrayOf(PropTypes.any),
    responsible: PropTypes.any,
    id: PropTypes.any
  }

  static defaultProps = {
    bgColor: '#fff',
    nbComments: 0,
    nbChecklists: 0
  }

  getInitials (user) {
    let initials = ''
    if (user && user.name) {
      const matches = user.name.match(/\b(\w)/g)
      initials = matches.join('').toUpperCase()
    }
    return initials
  }

  numberCompletedChecklists (checklists) {
    return checklists.filter(c => c.items.filter(i => i.isChecked).length === c.items.length).length
  }

  getDueDate (card) {
    if (card !== undefined) {
      const dueDate = new Date(card.dueDate)
      return dueDate
    } else return null
  }

  getFormattedDueDate (dueDate) {
    if (dueDate !== null) {
      const day = (dueDate.getDate() < 10 ? '0' : '') + dueDate.getDate()
      const month = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ')[dueDate.getMonth()]
      const formattedDate = month + ' ' + day
      return formattedDate
    }
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

  shouldRenderDueDate (card) {
    return (card !== undefined && card.dueDate !== undefined)
  }

  render () {
    const list = this.props.board.lists[this.props.listIndex]
    const card = list.cards.filter(c => c._id === this.props.id)[0]
    const dueDate = this.getDueDate(card)
    const formattedDate = this.getFormattedDueDate(dueDate)
    let cardLabels = []
    if (this.props.lists[this.props.listIndex].cards[this.props.index]) {
      cardLabels = this.props.lists[this.props.listIndex].cards[this.props.index].labels
    }
    const boardLabels = this.props.board.labels
    let labelsToDisplay = []
    boardLabels.map((bLabel) => {
      cardLabels.map((cLabel) => {
        if (cLabel === bLabel._id) {
          labelsToDisplay.push(bLabel)
        }
      })
    })
    return (
      <div style={{...this.props.style}} ref={c => { this.card = c }} className='root'>
        <div className='editButton'><Button size='small' bgColor='rgba(0,0,0,0)' hoverBgColor='rgba(255,255,255,0.6)'><Icon name='edit' color='#444' /></Button></div>
        <div className='content'>{ this.props.content }</div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          { labelsToDisplay.map((label) => <div><LabelThumbnail labelText={label['name']} backgroundColor={label['color']} /></div>) }
        </div>
        <div className='numbers'>
          { this.props.nbComments > 0
            ? <div className='number'>
              <div className='icon'><Icon name='comment-o' fontSize='12px' /></div>
              <span>{this.props.nbComments}</span>
            </div>
            : null
          }
          { this.props.nbChecklists > 0
            ? <div className={`number 
              ${this.numberCompletedChecklists(this.props.checklists) === this.props.nbChecklists ? 'completed' : ''}`}
            >
              <div className='icon'><Icon name='check-square-o' fontSize='13px' color={this.numberCompletedChecklists(this.props.checklists) === this.props.nbChecklists ? 'white' : ''} /></div>
              <span style={{
                color: this.numberCompletedChecklists(this.props.checklists) === this.props.nbChecklists ? 'white' : '#444'
              }}>{`
                ${this.numberCompletedChecklists(this.props.checklists)} / ${this.props.nbChecklists}
              `}</span>
            </div>
            : null
          }
        </div>
        <div className='details'>
          {
            this.shouldRenderDueDate(card)
              ? <div className='dueDate' style={{
                background: this.getDueDateColor(card.validated, dueDate)
              }}>
                <div className='dueDate-icon'><Icon name='clock-o' color={this.getDueDateTextColor(card.validated, dueDate)} /></div>
                <div className='dueDate-date' style={{color: this.getDueDateTextColor(card.validated, dueDate)}}>{formattedDate}</div>
              </div>
              : <div className='push' />
          }
          <div className='collaborators'>
            {
              this.props.responsible
                ? <div key={this.props.responsible._id ? this.props.responsible._id : this.props.responsible} className='collaborator responsible'>
                  <AvatarThumbnail thumbnail={this.props.responsible._id ? this.props.responsible.picture : ''} initials={this.getInitials(this.props.responsible)} size='25px' fontSize='15px' />
                  <div className='responsible-icon'><Icon name='star' color='#ffda11' fontSize='15px' /></div>
                </div>
                : null
            }
            {
              this.props.collaborators.map(a => (
                <div key={a._id ? a._id : a} className='collaborator'>
                  <AvatarThumbnail thumbnail={a._id ? a.picture : ''} initials={this.getInitials(a)} size='25px' fontSize='15px' />
                </div>
              ))
            }
          </div>
        </div>

        <style jsx>
          {styles}
        </style>
      </div>
    )
  }
}
