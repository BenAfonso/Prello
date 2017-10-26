import React from 'react'
import PropTypes from 'prop-types'
import Input from '../Input/Input'
import Button from '../Button/Button'
import styles from './Checklist.styles'
import Icon from '../Icon/Icon'

export default class ChecklistItem extends React.Component {
  static propTypes = {
    id: PropTypes.any,
    text: PropTypes.string.isRequired,
    onToggle: PropTypes.func,
    onDelete: PropTypes.func,
    onChange: PropTypes.func,
    isChecked: PropTypes.boolean,
    doneDate: PropTypes.instanceOf(Date)
  }

  static defaultProps = {
    isChecked: false,
    doneDate: null,
    onToggle: null,
    onDelete: null,
    onChange: null
  }

  constructor (props) {
    super(props)
    this.state = {
      isEditable: false,
      text: props.text,
      isChecked: props.isChecked,
      doneDate: props.doneDate
    }
    this.setEditable = this.setEditable.bind(this)
    this.updateText = this.updateText.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.onToggle = this.onToggle.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  setEditable () {
    this.setState({isEditable: true})
  }

  updateText () {
    if (this.textInput.input.value.length > 0) {
      this.setState({isEditable: false, text: this.textInput.input.value}, () => {
        if (this.props.onChange !== null) { this.props.onChange(this.props.id, this.state.text, this.state.isChecked) }
      })
    }
  }

  cancelEdit () {
    this.setState({ isEditable: false })
  }

  onToggle () {
    this.setState({ isChecked: this.checkbox.checked }, () => {
      if (this.state.isChecked) {
        this.setState({ doneDate: new Date() }, () => {
          if (this.props.onChange !== null) { this.props.onChange(this.props.id, this.state.text, this.state.isChecked) }
        })
      } else {
        this.setState({ doneDate: null }, () => {
          if (this.props.onChange !== null) { this.props.onChange(this.props.id, this.state.text, this.state.isChecked) }
        })
      }
    })
  }

  onDelete () {
    if (this.props.onDelete !== null) { this.props.onDelete(this.props.id) }
  }

  render () {
    return (
      <div className='checklistItem'>
        {!this.state.isEditable
          ? <div className='readOnlyMode'>
            <input type='checkbox' className='checkbox' ref={t => { this.checkbox = t }} checked={this.state.isChecked} onClick={this.onToggle} />
            <span className='itemContent' onClick={this.setEditable}>{this.state.text}</span>
            <div className='deleteItemButton'>
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
          : <div className='editMode'>
            <Input ref={v => { this.textInput = v }} placeholder={this.state.text} />
            <Button
              onClick={this.updateText}
              bgColor='#3cb221'
              hoverBgColor='#148407'
              color='#FFF'
              size='x-small'
            >
              <Icon name='check' color='#FFF' />
            </Button>
            <Button
              onClick={this.cancelEdit}
              bgColor='rgba(0,0,0,0)'
              color='#444'
              size='x-small'
              hoverBgColor='#ddd'>
              <Icon name='times' color='#70727c' />
            </Button>
          </div> }
        <style jsx>{styles}</style>
      </div>
    )
  }
}
