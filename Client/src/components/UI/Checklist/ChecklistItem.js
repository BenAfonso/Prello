import React from 'react'
import PropTypes from 'prop-types'
import Input from '../Input/Input'
import Button from '../Button/Button'
import styles from './Checklist.styles'
import Icon from '../Icon/Icon'

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
      done: props.done
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
      this.setState({isEditable: false, content: this.textInput.input.value}, () => {
        if (this.props.onContentChange !== null) { this.props.onContentChange(this.props.index, this.state.content) }
      })
    }
  }

  cancelEdit () {
    this.setState({ isEditable: false })
  }

  onToggle () {
    this.setState({ done: this.checkbox.checked }, () => {
      if (this.props.onToggle !== null) { this.props.onToggle(this.props.index, this.state.done) }
    })
  }

  onDelete () {
    if (this.props.onDelete !== null) { this.props.onDelete(this.props.index) }
  }

  render () {
    return (
      <div className='checklistItem'>
        {!this.state.isEditable
        ? <div className='readOnlyMode'>
          <input type='checkbox' className='checkbox' ref={(t) => this.checkbox = t} checked={this.state.done} onClick={this.onToggle} />
          <span className='itemContent' onClick={this.setEditable}>{this.state.content}</span>
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
          <Input ref={(v) => this.textInput = v} placeholder={this.state.content} />
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
