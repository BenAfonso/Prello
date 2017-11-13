import React from 'react'
import PropTypes from 'prop-types'

export default class LabelThumbnail extends React.Component {
  constructor (props) {
    super(props)
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
      marginRight,
      fontSize,
      centeredText,
      ...props
    } = this.props

    props.style = {
      width: '50px',
      height: '15px',
      fontSize,
      fontWeight,
      backgroundColor,
      borderRadius,
      color,
      marginRight: '2px',
      textAlign: centeredText ? 'center' : 'left',
      ...props.style
    }

    if (this.state.isExpanded) return <div onMouseLeave={this.expandLabel} style={props.style}>{this.props.labelText}</div>
    else return <div onMouseEnter={this.expandLabel} style={props.style}></div>
  }
}
