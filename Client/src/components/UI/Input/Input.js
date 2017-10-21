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
    centeredText: PropTypes.bool,
    type: PropTypes.oneOf(['input','textarea'])
  }

  static defaultProps = {
    height: '40px',
    width: '200px',
    color: '#444',
    fontSize: '18px',
    type: 'textarea',
    centeredText: false
  }

  render () {
    const {
      placeholder,
      width,
      height,
      color,
      fontSize,
      type,
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
        {
          type === 'input'
            ? <input ref={(v) => this.input = v} style={props.style} type='text' placeholder={placeholder} />
            : <textarea ref={(v) => this.input = v} className='' dir='auto' placeholder={placeholder}></textarea>
        }
        <style jsx>{`
          input {
            outline: none;
            display: block;
            border-radius: 3px;
            border: 1px solid rgba(0,0,0,0.2);
            padding: 4px 10px;
            box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
          }

          textarea {
            width: 100%;
            display: block;
            outline: none;
            border: 1px solid rgba(0,0,0,0.2);
            box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
            border-radius: 3px;
            height: 32px;
            padding: 7px;
            font-size: 14px;
            line-height: 18px;
            overflow: hidden;
            word-wrap: break-word;
            resize: vertical;
          }
      `}</style>
      </div>
    )
  }
}
