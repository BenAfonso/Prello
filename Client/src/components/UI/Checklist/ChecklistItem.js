import React from 'react'
import PropTypes from 'prop-types'
import Input from '../Input/Input'
import Button from '../Button/Button'
import styles from './Checklist.styles'

export default class ChecklistItem extends React.Component {

  static propTypes = {
    content: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onToggle: PropTypes.func,
    onDelete: PropTypes.func,
    onContentChange: PropTypes.func,
    done: PropTypes.bool
  }

  static defaultProps = {
    done: false,
    onToggle: null,
    onDelete: null,
    onContentChange: null
  }

  constructor (props) {
    super(props)
    this.state = {
      isEditable: false,
      content: props.content,
      done: props.done,
    }
    this.setEditable = this.setEditable.bind(this)
    this.updateText = this.updateText.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.onToggle = this.onToggle.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  setEditable () {
    this.setState({ isEditable: true})
  }

  updateText () {
    if (this.textInput.input.value.length > 0) {
      this.setState({ isEditable: false, content: this.textInput.input.value}, () => {
        if(this.props.onContentChange !== null)
          this.props.onContentChange(this.props.index, this.state.content)
      })
    }
  }

  cancelEdit () {
    this.setState({ isEditable: false })
  }

  onToggle () {
    this.setState({ done: this.checkbox.checked }, () => {
      if(this.props.onToggle !== null)
        this.props.onToggle(this.props.index, this.state.done)
    })
  }

  onDelete () {
    if(this.props.onDelete !== null)
      this.props.onDelete(this.props.index)
  }
    
  render() {
    return (
      <div className='ChecklistItem'>
        {!this.state.isEditable ? <div className='readOnlyMode'>
          <input type='checkbox' ref={(t) => this.checkbox = t} checked={this.state.done} onClick={this.onToggle} />
          <span className='checklistSpan' onClick={this.setEditable}>{this.state.content}</span>
          <Button onClick={this.onDelete} bgColor='#F00' color='#FFF' >X</Button>
        </div> : 
        <div className='editMode'>
          <Input ref={(v) => this.textInput = v} placeholder={this.state.content} />
          <Button onClick={this.updateText} bgColor='#3cb221' color='#FFF' >Update</Button>
          <Button onClick={this.cancelEdit} bgColor='#F00' color='#FFF' >Cancel</Button>
        </div> }
        <style jsx>{styles}</style>
      </div>
    )
  }
}





