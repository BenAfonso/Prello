import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import styles from './Card.styles'
import AvatarThumbnail from '../UI/AvatarThumbnail/AvatarThumbnail'

@connect(store => {
  return {
    board: store.board
  }
})
export default class Card extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    index: PropTypes.number.isRequired,
    listIndex: PropTypes.number.isRequired,
    collaborators: PropTypes.arrayOf(PropTypes.any),
    id: PropTypes.any
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
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }
}
