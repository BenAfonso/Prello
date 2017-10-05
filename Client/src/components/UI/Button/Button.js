import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './Button.styles'
import Color from 'color'

export default class Button extends React.Component {
  static propTypes = {
    height: PropTypes.string,
    width: PropTypes.string,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    shadow: PropTypes.string,
    round: PropTypes.bool,
    gradient: PropTypes.string,
    bgColor: PropTypes.string,
    bgColorTo: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.any,
    bold: PropTypes.bool
  }

  static defaultProps = {
  }

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event) {
    const { disabled, onClick } = this.props

    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    if (onClick) {
      onClick(event)
    }
  }

  render () {
    const {
      disabled,
      children,
      color,
      round,
      size,
      width,
      height,
      bgColor,
      bgColorTo,
      borderRadius,
      shadow,
      bold,
      gradient,
      ...props
    } = this.props

    if (disabled) {
      props.style = { pointerEvents: 'none', ...props.style }
    }

    const className = cn({
      button: true,
      disabled: disabled,
      shadow: shadow,
      round: round,
      [size]: size
    })

    const bgColorObj = Color(bgColor || '#55acf1')
    const bgLuminosity = bgColorObj.luminosity()
    const colorObj = Color(color || (bgLuminosity >= 0.5 ? 'black' : 'white'))

    props.style = {
      color: colorObj.string(),
      fontWeight: bold ? 'bold' : '',
      backgroundColor: bgColorObj.string(),
      borderRadius: round
        ? '50%'
        : borderRadius || '5px',
      boxShadow: shadow
        ? `0px 4px 0px ${bgColorObj.darken(0.2).string()}`
        : 'none',
      backgroundImage:
        gradient || bgColorTo
          ? `linear-gradient(to right, ${bgColor}, ${bgColorTo ||
            bgColorObj.lighten(0.2).string()})`
          : 'none',
      ...props.style
    }

    return (
      <div {...props} className={className}>
        {children}
        <style jsx>{styles}</style>
      </div>
    )
  }
}