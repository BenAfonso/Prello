import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Color from 'color'

export default class Input extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    width: PropTypes.string,
    color: PropTypes.string,
    fontSize: PropTypes.string,
    style: PropTypes.object,
    centeredText: PropTypes.bool
  }

  static defaultProps = {
    height: '40px',
    width: '200px',
    color: '#444',
    fontSize: '18px',
    centeredText: false
  }

  render () {
    const {
      placeholder,
      width,
      height,
      color,
      fontSize,
      centeredText,
      ...props
    } = this.props

    props.style = {
      width,
      height,
      color,
      fontSize,
      textAlign: centeredText ? 'center' : 'left',
      ...props.style
    }

    return (
      <div className='host' style={{...props.style.height}}>
        <input style={props.style} type='text' placeholder={placeholder} />
        <style jsx>{`
          input {
            outline: none;
            border-radius: 3px;
            border: 1px solid rgba(0,0,0,0.2);
            padding: 4px 10px;
            box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
          }
      `}</style>
      </div>
    )
  }
}
