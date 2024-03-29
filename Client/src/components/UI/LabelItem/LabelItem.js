import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'

export default class LabelItem extends React.Component {
  constructor () {
    super()
    this.state = {
      isExpanded: true
    }
    this.onDelete = this.onDelete.bind(this)
    this.onAddCardLabel = this.onAddCardLabel.bind(this)
  }
  static propTypes = {
    labelText: PropTypes.string,
    width: PropTypes.string,
    style: PropTypes.object,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontWeight: PropTypes.string,
    onDeleteLabel: PropTypes.func,
    onAddCardLabel: PropTypes.func
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

  onDelete () {
    this.props.onDeleteLabel(this.props.labelText)
  }

  onAddCardLabel () {
    this.props.onAddCardLabel(this.props.labelText, this.props.backgroundColor)
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
    return (
      <div>
        <div style={props.style} onClick={this.props.onAddCardLabel}>{this.props.labelText}</div>
        <div className='deleteLabelButton'>
          <Button
            onClick={this.onDelete}
            bgColor='rgba(0,0,0,0)'
            color='#70727c'
            hoverBgColor='#ddd'
            size='small'>
            <Icon name='times' color='#70727c' />
          </Button>
        </div>
      </div>
    )
  }
}
