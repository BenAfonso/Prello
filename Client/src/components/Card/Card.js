import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import styles from './Card.styles'
import AvatarThumbnail from '../UI/AvatarThumbnail/AvatarThumbnail'
import Button from '../UI/Button/Button'
import Icon from '../UI/Icon/Icon'
import Label from '../UI/Label/Label'

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
    cardLabels: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      color: PropTypes.string
    })),
    id: PropTypes.any
  }

  static defaultProps = {
    bgColor: '#fff',
    cardLabels: [{label: 'Blue', color: '#1c5fcc'}, {label: 'Red', color: '#cc1b53'}, {label: 'Green', color: '#1dcc1a'}]
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
    return (
      <div style={{...this.props.style}} ref={c => { this.card = c }} className='root'>
        <div className='editButton'><Button size='small' bgColor='rgba(0,0,0,0)' hoverBgColor='rgba(255,255,255,0.6)'><Icon name='edit' color='#444' /></Button></div>
        <div className='content'>{ this.props.content }</div>
        {this.props.cardLabels.map(l => <li><Label labelText={l['label']} backgroundColor={l['color']} /></li>)}
        <div className='collaborators'>
          {
            this.props.collaborators.map(a => (
              <div key={a._id ? a._id : a} className='collaborator'>
                <AvatarThumbnail thumbnail={a._id ? a.picture : ''} initials={this.getInitials(a)} size='25px' fontSize='15px' />
              </div>
            ))
          }
        </div>
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }
}
