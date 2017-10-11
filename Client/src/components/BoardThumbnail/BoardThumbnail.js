import React from 'react'
import styles from './BoardThumbnail.styles'
import { connect } from 'react-redux'
import { moveBoard } from '../../store/actions'
import { DragSource, DropTarget } from 'react-dnd'
import { ItemTypes } from '../Constants'
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

  constructor (props) {
    super(props)
    this.removeAction = this.removeAction.bind(this)
  }

 
  removeAction () {
    this.props.removeAction(this.props.index)
  }

  render () {
    const { title, background, isFavorite } = this.props 
    console.log(this.props)
    return(
    <div className='host' style={{
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
