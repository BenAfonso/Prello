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
    title: PropTypes.string.isRequired
  }

  render () {
    const { title, background, isFavorite } = this.props

    return (<div className='host' style={{
      background: background
    }}>
      <div className='title'>{title}</div>
      <div className='favorite' style={{
        color: isFavorite ? '#ffd700' : '#dcdcda'
      }}>
        <svg xmlns='http://www.w3.org/2000/svg' height='21px' version='1.1' viewBox='0 0 20 21' width='20px'><title /><desc /><defs /><g fill='none' fillRule='evenodd' id='Page-1' stroke='none' strokeWidth='1'><g fill='yellow' id='Core' transform='translate(-380.000000, -422.000000)'><g id='star-outline' transform='translate(380.000000, 422.500000)'><path d='M20,7.244 L12.809,6.627 L10,0 L7.191,6.627 L0,7.244 L5.455,11.971 L3.82,19 L10,15.272 L16.18,19 L14.545,11.971 L20,7.244 L20,7.244 Z M10,13.396 L6.237,15.666 L7.233,11.385 L3.91,8.507 L8.29,8.131 L10,4.095 L11.71,8.131 L16.09,8.507 L12.768,11.385 L13.764,15.666 L10,13.396 L10,13.396 Z' id='Shape' /></g></g></g></svg>
      </div>
      <style jsx>{styles}</style>
    </div>
    )
  }
}
