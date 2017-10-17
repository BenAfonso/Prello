import React from 'react'
import ChecklistItem from './ChecklistItem'
import styles from './Checklist.styles'
import Input from '../Input/Input'
import Button from '../Button/Button'

export default class Checklist extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: this.props.items,
      displayNewItemForm: false
    }
    this.displayNewItemForm = this.displayNewItemForm.bind(this)
    this.addItem = this.addItem.bind(this)
    this.hideNewItemForm = this.hideNewItemForm.bind(this)
  }

  displayNewItemForm () {
    this.setState({displayNewItemForm: true})
  }

  addItem (text) {
    this.setState({items: this.state.items.slice().push(this.newItemInput.value)})
  }

  hideNewItemForm () {
    this.setState({displayNewItemForm: false})
  }

  render () {
    return (
      <div className='Checklist'>
        <div className='progressBar' />
        <div className='actualProgressBar' />
        {this.state.items.map(item => (<ChecklistItem content={item.content} />))}
        {!this.state.displayNewItemForm ? <div>
          <input type='button' onClick={this.displayNewItemForm} value='Add an item' />
        </div> : <div className='addItemDiv'>
          <input type='text' ref={(t) => { this.newItemInput = t }} placeholder='Describe your item...' />
          <Input placeholder='Describe your item...' />
          <input type='button' onClick={this.addItem} value='Confirm' />
          <input type='button' onClick={this.hideNewItemForm} value='Cancel' />
        </div>}
        <style jsx>{styles}</style>
      </div>
    )
  }
}
