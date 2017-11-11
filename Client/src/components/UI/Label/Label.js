import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Icon from '../Icon/Icon'
import styles from './Label.styles'

export default class Label extends React.Component {
  constructor () {
    super()
    this.state = {
      isExpanded: false,
      labelTitle: '',
      displayLabelEditForm: false
    }
    this.expandLabel = this.expandLabel.bind(this)
    this.onDeleteBoardLabel = this.onDeleteBoardLabel.bind(this)
    this.displayLabelEditForm = this.displayLabelEditForm.bind(this)
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
    height: '15px',
    width: '90px',
    color: '#fff',
    backgroundColor: '#000',
    fontWeight: 'bold',
    borderRadius: '3px',
    fontSize: '10px',
    centeredText: true,
    isItem: false
  }

  expandLabel () {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  onDeleteBoardLabel () {
    this.props.onDeleteBoardLabel(this.props.labelId)
  }

  displayLabelEditForm () {
    this.setState({
      displayLabelEditForm: !this.displayLabelEditForm
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
      height,
      fontSize,
      fontWeight,
      backgroundColor,
      borderRadius,
      color,
      textAlign: centeredText ? 'center' : 'left',
      ...props.style
    }
    if (!this.props.isItem) return <div style={props.style}>{this.props.labelText}</div>
    else if (this.props.isItem) {
      return (
        <div className='labelItem'>
          <div style={props.style}>{this.props.labelText}</div>
          <div>
            <Button
              onClick={this.onDeleteBoardLabel}
              bgColor='rgba(0,0,0,0)'
              color='#70727c'
              hoverBgColor='#ddd'
              size='small'>
              <Icon name='times' color='#70727c' />
            </Button>
          </div>
          <div>
            <Button
              onClick={this.onDeleteBoardLabel}
              bgColor='rgba(0,0,0,0)'
              color='#70727c'
              hoverBgColor='#ddd'
              size='small'>
              <Icon name='pencil' color='#70727c' />
            </Button>
            {this.state.displayLabelEditForm
              ? <div>
                <Input ref={(v) => { this.labelTitle = v } } placeholder='Label title'/>
                <Input ref={(v) => { this.labelColor = v } } placeholder='#c5c5c5'/>
                <Button onClick={null}>Save Label</Button>
              </div> : null}
          </div>
          <style jsx>{styles}</style>
        </div>
      )
    }
  }
}
