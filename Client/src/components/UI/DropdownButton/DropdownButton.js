import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './DropdownButton.styles'
import Color from 'color'

export default class DropdownButton extends React.Component {
  static propTypes = {
    elements: PropTypes.array,
    bgColor: PropTypes.string,
    borderColor: PropTypes.string,
    color: PropTypes.string,
    hoverColor: PropTypes.string
  }

  static defaultProps = {
    elements: ['A','B','C'],
    bgColor: '#000',
    borderColor: '#444',
    color: 'black',
    hoverColor: 'red'
  }

  constructor (props) {
    super(props)
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.state = {
      dropdownDisplayed: true
    }

    this.renderDropDown = this.renderDropDown.bind(this)
  }

  renderDropDown (dropDownStyle) {
    return (
      <ul style={dropDownStyle}
        className='dropDown'>
        {
          this.props.elements.map((e) => (
            <li style={dropDownStyle}>{e}</li>
          ))
        }
        <style jsx>{styles}</style>
      </ul>
    )
  }

  toggleDropdown () {
    this.setState({
      dropdownDisplayed: !this.state.dropdownDisplayed
    })
  }

  undisplay () {
    this.setState({
      dropdownDisplayed: false
    })
  }

  render () {
    const {
      children,
      borderColor,
      bgColor,
      color,
      ...props
    } = this.props

    props.style = {
      ...props.style
    }

    let dropDownStyle = {
      borderColor: borderColor,
      backgroundColor: bgColor,
      color: color,
      width: '200px'
    }

    return (
      <div {...props} className='host'>
        <span onClick={this.toggleDropdown}>{children}</span>
        {
          this.state.dropdownDisplayed
            ? this.renderDropDown(dropDownStyle)
            : null
        }
        <style jsx>{styles}</style>
      </div>
    )
  }
}
