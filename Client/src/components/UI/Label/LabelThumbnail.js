import React from 'react'
import PropTypes from 'prop-types'

export default class LabelThumbnail extends React.Component {
  constructor () {
    super()
    this.state = {
      isExpanded: false
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
    isItem: PropTypes.bool,
    isThumbnail: PropTypes.bool
  }

  static defaultProps = {
    height: '30px',
    width: '90px',
    color: '#fff',
    backgroundColor: '#000',
    fontWeight: 'bold',
    borderRadius: '3px',
    fontSize: '10px',
    centeredText: true,
    isItem: false,
    isThumbnail: false
  }

  expandLabel (event) {
    event.stopPropagation()
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
      width: '50px',
      height: this.state.isExpanded ? '30px' : '15px',
      fontSize,
      fontWeight,
      backgroundColor,
      borderRadius,
      color,
      textAlign: centeredText ? 'center' : 'left',
      ...props.style
    }

    if (this.state.isExpanded) return <div onClick={(e) => this.expandLabel} style={props.style}>{this.props.labelText}</div>
    else return <div onClick={this.expandLabel} style={props.style}></div>
  }
}
