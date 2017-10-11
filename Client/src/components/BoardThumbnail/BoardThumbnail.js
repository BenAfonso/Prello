import React from 'react'
import styles from './BoardThumbnail.styles'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'


@connect(store => {
  return {
      
  }
})

export default class BoardThumbnail extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    id: PropTypes.any,
    title: PropTypes.string.isRequired,
  }

  render () {
    const { title, background, isFavorite } = this.props 

    return(<div className='host' style={{
      background: background
    }}>
      <div className='title'>{title}</div>
      <div className='favorite' style={{
        color: isFavorite ? "#ffd700" : "#dcdcda"
      }}>Favoris</div>
      <style jsx>{styles}</style>
    </div>
  )}
}
