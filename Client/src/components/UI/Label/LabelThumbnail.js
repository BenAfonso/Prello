import React from 'react'
import PropTypes from 'prop-types'
import {toggleLabelsExpanded} from '../../../store/actions'
import { TimelineMax } from 'gsap'
import GSAP from 'react-gsap-enhancer'

@GSAP()
export default class LabelThumbnail extends React.Component {
  constructor (props) {
    super(props)
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

  componentWillReceiveProps (props) {
    if (props.isExpanded) {
      this.addAnimation(this.animateExpand.bind(this))
    } else {
      this.addAnimation(this.animateCollapse.bind(this))
    }
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

  expandLabel (e) {
    toggleLabelsExpanded()
    e.stopPropagation()
  }

  animateExpand ({ target }) {
    console.log('Expand anim')
    return new TimelineMax().to(this.label, 0.25, { width: '60px' }).to(this.label, 0.25, { height: '15px' }).to(this.labelText, 0, { opacity: 1 })
  }

  animateCollapse ({ target }) {
    console.log('Collapse anim')
    return new TimelineMax().to(this.label, 0.25, { height: '8px' }).to(this.label, 0.25, { width: '40px' })
  }

  render () {
    const {
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
      width: '40px',
      height: '8px',
      fontSize,
      fontWeight,
      backgroundColor,
      borderRadius,
      color,
      marginRight: '2px',
      textAlign: centeredText ? 'center' : 'left',
      ...props.style
    }

    if (this.props.isExpanded) {
      let labelText = this.props.labelText.length > 8 ? this.props.labelText.substring(0, 8) + '...' : this.props.labelText
      return <div ref={l => { this.label = l }} onClick={this.expandLabel} style={props.style}>
        <span ref={l => { this.labelText = l }} style={{ opacity: 0 }}>{labelText}</span>
      </div>
    } else {
      return <div ref={l => { this.label = l }} onClick={this.expandLabel} style={props.style}></div>
    }
  }
}
