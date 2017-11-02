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

  render () {
    const list = this.props.board.lists[this.props.listIndex]
    const card = list.cards.filter(c => c._id === this.props.id)[0]
    const dueDate = new Date(card.dueDate)
    const day = (dueDate.getDate() < 10 ? '0' : '') + dueDate.getDate()
    console.log(day)
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
        }
        <div className='dueDate'>
        </div>
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }
}
