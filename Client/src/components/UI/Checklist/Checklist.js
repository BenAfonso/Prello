import React from 'react'
import ChecklistItem from './ChecklistItem'
import PropTypes from 'prop-types'
import styles from './Checklist.styles'
import Input from '../Input/Input'
import Button from '../Button/Button'

export default class Checklist extends React.Component {

  static propTypes = {
    items: PropTypes.array,
    title: PropTypes.string.isRequired,
    percentageDone: PropTypes.number
  }

  static defaultProps = {
    items: [],
    percentageDone: 0
  }

  constructor (props) {
    super(props)
    this.state = {
      items: props.items,
      displayNewItemForm: false,
      displayEditTitleForm: false,
      title: props.title,
      percentageDone: props.percentageDone
    }
    this.displayNewItemForm = this.displayNewItemForm.bind(this)
    this.addItem = this.addItem.bind(this)
    this.hideNewItemForm = this.hideNewItemForm.bind(this)
    this.displayEditTitleForm = this.displayEditTitleForm.bind(this)
    this.hideEditTitleForm = this.hideEditTitleForm.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.updateItemStatus = this.updateItemStatus.bind(this)
    this.recalculatePercentageDone=this.recalculatePercentageDone.bind(this)
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
    if(this.titleInput.input.value.length > 0)
      this.setState({title: this.titleInput.input.value, displayEditTitleForm: false})
  }

  addItem () {
    if(this.textInput.input.value.length > 0) {
      let newItemsList = this.state.items.slice()
      newItemsList.push({content: this.textInput.input.value, done: false})
      this.setState({items: newItemsList}, () => {
        this.setState({percentageDone: this.recalculatePercentageDone(newItemsList)})
      })
      this.textInput.input.value = ''
    }
  }

  deleteItem (index) {
    console.log('index '+index)
    let newItemsList = this.state.items.slice()
    newItemsList.splice(index, 1)
    newItemsList.forEach(item => console.log(item.content))
    this.setState({items: newItemsList}, () => {
      this.setState({percentageDone: this.recalculatePercentageDone(newItemsList)})
    })
  }

  updateItemStatus (index, done) {
    console.log('toggle checkbox '+index+' new status '+done)
    let newItemsList = this.state.items.slice()
    newItemsList[index].done = done
    this.setState({items: newItemsList}, () => {
      this.setState({percentageDone: this.recalculatePercentageDone(newItemsList)})
    })
  }

  recalculatePercentageDone (list) {
    if(this.state.items.length === 0)
      return 0
    const size = this.state.items.length
    return parseInt(list.filter((item) => item.done).length / size * 100, 10)
  }

  hideNewItemForm () {
    this.setState({displayNewItemForm: false})
  }

  render () {
    console.log(`newPercentageDone ${this.state.percentageDone}`)
    const actualProgressBarStyles = {
      paddingBottom: 30,
      width: this.state.percentageDone+'%',
      position: 'absolute',
      borderStyle: 'groove',
      backgroundColor: '#0F0',
      zIndex: 2
    }

    return (
      <div className='Checklist'>
        {!this.state.displayEditTitleForm ?
        <div> 
          <h2 onClick={this.displayEditTitleForm} className='checklistTitle'>{this.state.title}</h2>
          <span className='percentageDone'>{this.state.percentageDone}%</span>
        </div>
        :
        <div className='editTitleForm'>
          <Input ref={(v) => this.titleInput = v} placeholder={this.state.title} />
          <Button onClick={this.updateTitle} bgColor='#3cb221' color='#FFF'>Update title</Button>
          <Button onClick={this.hideEditTitleForm} bgColor='#F00' color='#FFF'>X</Button>
        </div> }
        <div className='progressBar' />
        <div className='actualProgressBar' style={actualProgressBarStyles}/>
        <br /><br /><br /><br />
        {this.state.items.map((item, key) => (<div>
          <ChecklistItem index={key} content={item.content} onToggle={this.updateItemStatus} onDelete={this.deleteItem} />
          </div>))}
        {!this.state.displayNewItemForm ? <div>
          <br /><br /><br /><br />
          <Button onClick={this.displayNewItemForm} >Add an item</Button>
        </div> : <div className='addItemDiv'>
          <br /><br /><br /><br />
          <Input ref={(v) => this.textInput = v} placeholder='Describe your item...' />
          <Button onClick={this.addItem} >Confirm</Button>
          <Button onClick={this.hideNewItemForm} >Cancel</Button>
        </div>}
        <style jsx>{styles}</style>
      </div>
    )
  }
}
