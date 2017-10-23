import React from 'react'
import PropTypes from 'prop-types'

export default class AvatarThumbnail extends React.Component {
  static propTypes = {
    thumbnail: PropTypes.string,
    initials: PropTypes.string,
    onClick: PropTypes.func,
    bgColor: PropTypes.string,
    size: PropTypes.string,
    fontSize: PropTypes.string,
    color: PropTypes.string
  }

  static defaultProps = {
    color: '#FFF',
    bgColor: '#444',
    size: '50px',
    fontSize: '30px'
  }

  render () {
    const {
      thumbnail,
      initials,
      bgColor,
      color,
      fontSize,
      size,
      ...props } = this.props

    props.style = {
      color: color,
      backgroundColor: bgColor,
      backgroundImage:
        (thumbnail && thumbnail!=='')
          ? `url('${thumbnail}')`
          : 'none',
      fontSize: fontSize,
      height: size,
      width: size,
      lineHeight: size,
      ...props.style
    }

    return (
      <div {...props} className='host'>
        {
          (!thumbnail || thumbnail==='')
            ? initials
            : ''
        }
        <style jsx>{`
          .host {
            background-position: center;
            background-size: cover;
            border-radius: 50%;
            text-align: center;
            font-family: 'Open Sans', sans-serif;
            font-weight: bold;
            text-transform: uppercase;
          }  
        `}</style>
      </div>
    )
  }
}
