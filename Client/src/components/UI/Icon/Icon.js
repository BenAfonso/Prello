import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Color from 'color'

export default class Icon extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    fontSize: PropTypes.string,
    style: PropTypes.object
  }

  static defaultProps = {
    name: 'star-o',
    color: '#444'
  }

  render () {
    const {
      name,
      color,
      fontSize,
      ...props
    } = this.props

    props.style = {
      color: color,
      fontSize: fontSize,
      ...props.style
    }

    return (
      <i style={props.style} className={`fa fa-${name} fa-lg`} />
    )
  }
}
