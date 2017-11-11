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
      displayLabelEditForm: false,
      addedToCard: false
    }
    this.expandLabel = this.expandLabel.bind(this)
    this.onDeleteBoardLabel = this.onDeleteBoardLabel.bind(this)
    this.displayLabelEditForm = this.displayLabelEditForm.bind(this)
    this.updateBoardLabel = this.updateBoardLabel.bind(this)
    this.addCardLabel = this.addCardLabel.bind(this)
    this.deleteCardLabel = this.deleteCardLabel.bind(this)
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
      displayLabelEditForm: !this.state.displayLabelEditForm
    })
  }

  updateBoardLabel () {
    this.props.onUpdateBoardLabel(this.props.labelId, this.newlabelTitle.input.value, this.newlabelColor.input.value)
  }

  addCardLabel () {
    this.setState({
      addedToCard: !this.addedToCard
    })
    this.props.onAddCardLabel(this.props.labelId)
  }

  deleteCardLabel () {
    alert('hello')
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
      width: this.props.isThumbnail ? '50px' : '90px',
      height: this.props.isThumbnail ? '15px' : '30px',
      fontSize,
      fontWeight,
      backgroundColor,
      borderRadius,
      color,
      textAlign: centeredText ? 'center' : 'left',
      ...props.style
    }
    if (!this.props.isItem) return <div style={props.style}>{this.props.labelText}</div>
    else if (this.props.isItem && this.state.addedToCard) {
      return (
        <div className='labelItem'>
          <div style={props.style} onClick={ this.deleteCardLabel }>{this.props.labelText}<Icon name='check' color='70727c' /></div>
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
              onClick={this.displayLabelEditForm}
              bgColor='rgba(0,0,0,0)'
              color='#70727c'
              hoverBgColor='#ddd'
              size='small'>
              <Icon name='pencil' color='#70727c' />
            </Button>
            {this.state.displayLabelEditForm
              ? <div>
                <Input ref={(v) => { this.newlabelTitle = v } } placeholder='Label title'/>
                <Input ref={(v) => { this.newlabelColor = v } } placeholder='#c5c5c5'/>
                <Button onClick={this.updateBoardLabel}>Save Label</Button>
              </div> : null}
          </div>
          <style jsx>{styles}</style>
        </div>
      )
    } else if (this.props.isItem && !this.state.addedToCard) {
      return (
        <div className='labelItem'>
          <div style={props.style} onClick={ this.addCardLabel }>{this.props.labelText}</div>
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
              onClick={this.displayLabelEditForm}
              bgColor='rgba(0,0,0,0)'
              color='#70727c'
              hoverBgColor='#ddd'
              size='small'>
              <Icon name='pencil' color='#70727c' />
            </Button>
            {this.state.displayLabelEditForm
              ? <div>
                <Input ref={(v) => { this.newlabelTitle = v } } placeholder='Label title'/>
                <Input ref={(v) => { this.newlabelColor = v } } placeholder='#c5c5c5'/>
                <Button onClick={this.updateBoardLabel}>Save Label</Button>
              </div> : null}
          </div>
          <style jsx>{styles}</style>
        </div>
      )
    }
  }
}
