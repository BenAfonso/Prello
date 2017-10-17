import React from 'react'
import PropTypes from 'prop-types'
import Input from '../Input/Input'
import Button from '../Button/Button'
import styles from './Checklist.styles'

export default class ChecklistItem extends React.Component {

  static propTypes = {
    content: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      isEditable: false,
      content: props.content
    }
    this.setEditable = this.setEditable.bind(this)
    this.updateText = this.updateText.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
  }

  setEditable () {
    this.setState({ isEditable: true})
  }

  updateText () {
    if (this.textInput.input.value.length > 0) {
      this.setState({ isEditable: false, content: this.textInput.input.value})
    }
  }

  cancelEdit() {
    this.setState({ isEditable: false })
  }
    
  render() {
    const props = this.props

    return (
      <div className='ChecklistItem'>
        {!this.state.isEditable ? <div className='readOnlyMode'>
          <input type='checkbox' />
          <span className='checklistSpan' onClick={this.setEditable}>{this.state.content}</span>
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





