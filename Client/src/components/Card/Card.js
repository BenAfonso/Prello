import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import styles from './Card.styles'
import AvatarThumbnail from '../UI/AvatarThumbnail/AvatarThumbnail'
import Button from '../UI/Button/Button'
import Icon from '../UI/Icon/Icon'

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
    index: PropTypes.number.isRequired,
    listIndex: PropTypes.number.isRequired,
    collaborators: PropTypes.arrayOf(PropTypes.any),
    id: PropTypes.any
  }

  static defaultProps = {
    bgColor: '#fff'
  }

  getInitials (user) {
    let initials = ''
    if (user && user.name) {
      const matches = user.name.match(/\b(\w)/g)
      initials = matches.join('').toUpperCase()
    }
    return initials
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
      const formattedDate = day + ' ' + month
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

    return (
      <div style={{...this.props.style}} ref={c => { this.card = c }} className='root'>
        <div className='editButton'><Button size='small' bgColor='rgba(0,0,0,0)' hoverBgColor='rgba(255,255,255,0.6)'><Icon name='edit' color='#444' /></Button></div>
        <div className='content'>{ this.props.content }</div>
        <div className='collaborators'>
          {
            this.props.collaborators.map(a => (
              <div key={a._id ? a._id : a} className='collaborator'>
                <AvatarThumbnail thumbnail={a._id ? a.picture : ''} initials={this.getInitials(a)} size='25px' fontSize='15px' />
              </div>
            ))
          }
        </div>
        {
          this.shouldRenderDueDate(card)
            ? <div className='dueDate' style={{
              background: this.getDueDateColor(card.validated, dueDate)
            }}>
              <div className='dueDate-icon'><Icon name='clock-o' color={this.getDueDateTextColor(card.validated, dueDate)} /></div>
              <div className='dueDate-date' style={{color: this.getDueDateTextColor(card.validated, dueDate)}}>{formattedDate}</div>
            </div>
            : null
        }

        <style jsx>
          {styles}
        </style>
      </div>
    )
  }
}
