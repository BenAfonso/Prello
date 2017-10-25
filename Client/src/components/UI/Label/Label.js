import React from 'react'
import PropTypes from 'prop-types'

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
    width: PropTypes.string,
    style: PropTypes.object,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontWeight: PropTypes.string
  }

  static defaultProps = {
    height: '1pc',
    width: '150px',
    color: '#fff',
    backgroundColor: '#000',
    fontWeight: 'bold',
    borderRadius: '3px',
    fontSize: '12px',
    centeredText: true
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
      height: this.state.isExpanded ? '16px' : '8px',
      fontSize,
      fontWeight,
      backgroundColor,
      borderRadius,
      color,
      textAlign: centeredText ? 'center' : 'left',
      ...props.style
    }
    if (this.state.isExpanded) return <div style={props.style} onClick={this.expandLabel} checked>{this.props.labelText}</div>
    else return <div style={props.style} onClick={this.expandLabel} />
  }
}
