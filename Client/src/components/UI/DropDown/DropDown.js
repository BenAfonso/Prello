import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './DropDown.styles'
import Color from 'color'
import Button from '../Button/Button'

export default class DropDown extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    layour: PropTypes.oneOf(['custom', 'auto']),
    orientation: PropTypes.oneOf(['left', 'right']),
    buttonStyle: PropTypes.object,
    dropdownStyle: PropTypes.object,
    menuElements: PropTypes.oneOf([PropTypes.arrayOf(PropTypes.shape({
      action: PropTypes.func,
      placeholder: PropTypes.string,
      description: PropTypes.string
    })), 'separator'])
  }

  static defaultProps = {
    orientation: 'left',
    layout: 'auto'
  }

  constructor (props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.toggleDropdown = this.toggleDropdown.bind(this)
  }

  toggleDropdown () {
    this.setState({ expanded: !this.state.expanded })
  }

  closeDropdown () {
    this.setState({ expanded: false })
  }

  openDropdown () {
    this.setState({ expanded: true })
  }

  render () {
    const {
      menuElements,
      orientation,
      title,
      children,
      layout,
      button,
      ...props
    } = this.props

    props.style = {
      ...props.style
    }

    const dropDownStyles = {
      left: orientation === 'left' ? 0 : '',
      right: orientation === 'right' ? 0 : ''
    }



    if (layout === 'auto') {
      return (
        <div {...props} className='host'>
          <div onClick={this.toggleDropdown}>{children}</div>
          {
            this.state.expanded
            ? <div className='dropdown-content'>
              {
                title !== undefined
                  ? <div className='dropdown-title'>Mes boards</div>
                  : null
              }
                <ul id='dropdown' style={{...dropDownStyles}}>
                {
                  this.props.menuElements.map((e, i) => (
                      e === 'separator'
                        ? <li key={i} className='separator' />
                        : <li key={i} onClick={e.action}>
                          <div className='element-title'>{e.placeholder}</div>
                          <div className='element-description'>{e.description}</div>
                      </li>
                  ))
                }
                </ul>
              </div>
            : null
          }
          <style jsx>{styles}</style>
        </div>
      )
    } else if (layout === 'custom') {
      return (
        <div {...props} className='host'>
          <div onClick={this.toggleDropdown}>{button}</div>
          {
            this.state.expanded
            ? <div className='dropdown-content'>
              {
                title !== undefined
                  ? <div className='dropdown-title'>Mes boards</div>
                  : null
              }
                {children}
              </div>
            : null
          }
          <style jsx>{styles}</style>
        </div>
      ) 
    }
  }
}
