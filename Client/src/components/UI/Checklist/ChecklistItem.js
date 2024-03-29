import React from 'react'
import PropTypes from 'prop-types'
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
    isChecked: PropTypes.bool,
    doneDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string
    ])
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

  updateText (text) {
    if (text.length > 0) {
      this.setState({isEditable: false, text: text.value}, () => {
        if (this.props.onChange !== null) { this.props.onChange(this.props.id, text, this.state.isChecked) }
      })
    }
  }

  cancelEdit () {
    this.setState({ isEditable: false })
  }

  onToggle () {
    this.setState({ isChecked: !this.checkbox.checked }, () => {
      if (!this.props.isChecked) {
        this.setState({ doneDate: new Date() }, () => {
          if (this.props.onChange !== null) { this.props.onChange(this.props.id, this.props.text, !this.props.isChecked) }
        })
      } else {
        this.setState({ doneDate: null }, () => {
          if (this.props.onChange !== null) { this.props.onChange(this.props.id, this.props.text, !this.props.isChecked) }
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
            <input type='checkbox' className='checkbox' ref={t => { this.checkbox = t }} onChange={this.onToggle} checked={this.props.isChecked} onClick={this.onToggle} />
            <span className='itemContent' onClick={this.setEditable}>{this.props.text}</span>
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
          : <div className='editChecklistItem'>
            <input type='checkbox' className='checkboxEditItem' ref={t => { this.checkbox = t }} checked={this.props.isChecked} onClick={this.onToggle} />
            <div className='editItemDiv'>
              <div className='content'>
                <textarea className='card' ref={(v) => { this.textInput = v }} placeholder={this.props.text}/>
              </div>
              <div className='button'>
                <div className='saveButton' onClick={() => this.updateText(this.textInput.value)}>
                          Save
                </div>
                <div className='cancelButton' onClick={() => this.cancelEdit()}>
                          Cancel
                </div>
              </div>
            </div>
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
          </div> }
        <style jsx>{styles}</style>
      </div>
    )
  }
}
