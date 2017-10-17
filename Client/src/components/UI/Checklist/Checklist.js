import React from 'react'
import ChecklistItem from './ChecklistItem'
import PropTypes from 'prop-types'
import styles from './Checklist.styles'
import Input from '../Input/Input'
import Button from '../Button/Button'

export default class Checklist extends React.Component {

  static propTypes = {
    items: PropTypes.array,
    title: PropTypes.string.isRequired
  }

  static defaultProps = {
    items: []
  }

  constructor (props) {
    super(props)
    this.state = {
      items: props.items,
      displayNewItemForm: false,
      displayEditTitleForm: false,
      title: props.title
    }
    this.displayNewItemForm = this.displayNewItemForm.bind(this)
    this.addItem = this.addItem.bind(this)
    this.hideNewItemForm = this.hideNewItemForm.bind(this)
    this.displayEditTitleForm = this.displayEditTitleForm.bind(this)
    this.hideEditTitleForm = this.hideEditTitleForm.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
  }

  displayNewItemForm () {
    this.setState({displayNewItemForm: true})
  }

  displayEditTitleForm () {
    this.setState({displayEditTitleForm: true})
  }

  hideEditTitleForm() {
    this.setState({displayEditTitleForm: false})
  }

  updateTitle() {
    this.setState({title: this.titleInput.input.value, displayEditTitleForm: false})
  }

  addItem () {
    if(this.textInput.input.value.length > 0) {
      let newItemsList = this.state.items.slice()
      newItemsList.push({content: this.textInput.input.value, done: false})
      this.setState({items: newItemsList})
      this.textInput.input.value = ''
    }
  }

  deleteItem (index) {
    console.log('index '+index)
    let newItemsList = this.state.items.slice()
    newItemsList.splice(index, 1)
    this.setState({items: newItemsList})
  }

  hideNewItemForm () {
    this.setState({displayNewItemForm: false})
  }

  render () {
    return (
      <div className='Checklist'>
        {!this.state.displayEditTitleForm ? 
        <h2 onClick={this.displayEditTitleForm}>{this.state.title}</h2>
        :
        <div className='editTitleForm'>
          <Input ref={(v) => this.titleInput = v} placeholder={this.state.title} />
          <Button onClick={this.updateTitle} bgColor='#3cb221' color='#FFF'>Update title</Button>
          <Button onClick={this.hideEditTitleForm} bgColor='#F00' color='#FFF'>X</Button>
        </div> }
        <div className='progressBar' />
        <div className='actualProgressBar' />
        {this.state.items.map((item, key) => (<div>
          <ChecklistItem key={key} content={item.content} /> <Button onClick={(e) => this.deleteItem(key)} color='#FFF' bgColor='#F00'>X</Button>
          </div>))}
        {!this.state.displayNewItemForm ? <div>
          <Button onClick={this.displayNewItemForm} >Add an item</Button>
        </div> : <div className='addItemDiv'>
          <Input ref={(v) => this.textInput = v} placeholder='Describe your item...' />
          <Button onClick={this.addItem} >Confirm</Button>
          <Button onClick={this.hideNewItemForm} >Cancel</Button>
        </div>}
        <style jsx>{styles}</style>
      </div>
    )
  }
}
