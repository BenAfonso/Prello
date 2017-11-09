import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import styles from './Label.styles'

export default class Label extends React.Component {
  constructor () {
    super()
    this.state = {
      isExpanded: false,
      labelTitle: ''
    }
    this.expandLabel = this.expandLabel.bind(this)
  }
  static propTypes = {
    labelText: PropTypes.string,
    labelId: PropTypes.string,
    width: PropTypes.string,
    style: PropTypes.object,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontWeight: PropTypes.string,
    isItem: PropTypes.bool
  }

  static defaultProps = {
    height: '1pc',
    width: '150px',
    color: '#fff',
    backgroundColor: '#000',
    fontWeight: 'bold',
    borderRadius: '3px',
    fontSize: '12px',
    centeredText: true,
    isItem: false
  }

  expandLabel () {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  render () {
    const {
      labelText,
      width,
      height,
      fontWeight,
      backgroundColor,
      borderRadius,
      color,
      fontSize,
      centeredText,
      ...props
    } = this.props

    props.style = {
      width,
      height: (this.state.isExpanded || this.state.isItem) ? '16px' : '16px',
      fontSize,
      fontWeight,
      backgroundColor,
      borderRadius,
      color,
      textAlign: centeredText ? 'center' : 'left',
      ...props.style
    }
    if (this.state.isExpanded && !this.props.isItem) return <div style={props.style} onClick={this.expandLabel}>{this.props.labelText}</div>
    else if (!this.state.isExpanded && !this.props.isItem) return <div style={props.style} onClick={this.expandLabel} />
    else if (this.props.isItem) {
      return (
        <div className='labelItem'>
          <div style={props.style}>{this.props.labelText}</div>
          <div>
            <Button
              onClick={null}
              bgColor='rgba(0,0,0,0)'
              color='#70727c'
              hoverBgColor='#ddd'
              size='small'>
              <Icon name='times' color='#70727c' />
            </Button>
          </div>
          <style jsx>{styles}</style>
        </div>
      )
    }
  }
}
