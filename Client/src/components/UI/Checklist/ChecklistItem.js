import React from 'react'
import PropTypes from 'prop-types'

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
    if (this.newContentInput.value.length > 0) {
      this.setState({ isEditable: false, content: this.newContentInput.value})
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
          <span onClick={this.setEditable}>{this.state.content}</span>
        </div> : 
        <div className='editMode'>
          <input type='text' ref={(t) => { this.newContentInput = t }} defaultValue={this.state.content} />
          <input type='button' onClick={this.updateText} value='Update' />
          <input type='button' onClick={this.cancelEdit} value='Cancel' /> 
        </div> }
      </div>
    )
  }
}





