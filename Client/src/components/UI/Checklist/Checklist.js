import React from 'react'
import ChecklistItem from './ChecklistItem'
import PropTypes from 'prop-types'
import styles from './Checklist.styles'
import Input from '../Input/Input'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'

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
    console.log('ah')
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
    this.updateItemContent = this.updateItemContent.bind(this)
    this.recalculatePercentageDone = this.recalculatePercentageDone.bind(this)
  }

  componentDidMount () {
    // Make sure to calculate the percentage done with given items at creation
    if (this.state.items.length > 0) { this.setState({percentageDone: this.recalculatePercentageDone(this.state.items)}) }
  }

  displayNewItemForm () {
    this.setState({displayNewItemForm: true})
  }

  displayEditTitleForm () {
    this.setState({displayEditTitleForm: true})
  }

  hideEditTitleForm () {
    this.setState({displayEditTitleForm: false})
  }

  updateTitle () {
    if (this.titleInput.input.value.length > 0) { this.setState({title: this.titleInput.input.value, displayEditTitleForm: false}) }
  }

  addItem () {
    if (this.textInput.input.value.length > 0) {
      let newItemsList = this.state.items.slice()
      newItemsList.push({index: newItemsList.length, content: this.textInput.input.value, done: false})
      this.setState({items: newItemsList}, () => {
        this.setState({percentageDone: this.recalculatePercentageDone(newItemsList)})
      })
      this.textInput.input.value = ''
    }
  }

  deleteItem (index) {
    let newItemsList = this.state.items.slice()
    newItemsList.splice(index, 1)
    this.setState({items: newItemsList}, () => {
      this.setState({percentageDone: this.recalculatePercentageDone(newItemsList)})
    })
  }

  updateItemContent (index, newContent) {
    let newItemsList = this.state.items.slice()
    newItemsList[index].content = newContent
    this.setState({items: newItemsList})
  }

  updateItemStatus (index, done) {
    let newItemsList = this.state.items.slice()
    newItemsList[index].done = done
    this.setState({items: newItemsList}, () => {
      this.setState({percentageDone: this.recalculatePercentageDone(newItemsList)})
    })
  }

  recalculatePercentageDone (list) {
    if (this.state.items.length === 0) { return 0 }
    const size = this.state.items.length
    return parseInt(list.filter((item) => item.done).length / size * 100, 10)
  }

  hideNewItemForm () {
    this.setState({displayNewItemForm: false})
  }

  render () {
    const actualProgressBarStyle = {
      width: this.state.percentageDone + '%' // 80% width for the total progress bar in the CSS
    }

    return (
      <div className='Checklist'>
        {!this.state.displayEditTitleForm
        // Title
        ? <div className='title'>
          <span><Icon name='check-square-o' color='#888' /></span>
          <h2 onClick={this.displayEditTitleForm} className='checklistTitle'>{this.state.title}</h2>
        </div>
        :
        // Form in order to edit the title of the checklist
        <div className='editTitleForm'>
          <div className='textarea'><Input ref={(v) => this.titleInput = v} placeholder={this.state.title} /></div>
          <Button
            onClick={this.updateTitle}
            bgColor='#3cb221'
            hoverBgColor='#148407'
            color='#FFF'
            size='x-small'>
            <Icon name='check' color='#FFF' />
          </Button>
          <Button
            onClick={this.hideEditTitleForm}
            bgColor='rgba(0,0,0,0)'
            hoverBgColor='#ddd'
            color='#70727c'
            size='x-small'>
            <Icon name='times' color='#70727c' />
          </Button>
        </div> }
        {/* Display progression in any case */}
        <div className='progressPart'>
          <span className='percentageDone'>{this.state.percentageDone}%</span>
          <div className='progressBar'>
            <div className='actualProgressBar' style={actualProgressBarStyle} />
          </div>
        </div>
        {/* Display checklist items */}
        {this.state.items.map((item, index) => (<ChecklistItem key={item.index} done={item.done} index={parseInt(index, 10)} content={item.content} onContentChange={this.updateItemContent} onToggle={this.updateItemStatus} onDelete={this.deleteItem} />))}

        {!this.state.displayNewItemForm
          ? <Button onClick={this.displayNewItemForm}
            color='#444'
            size='x-small'
            bgColor='rgba(0,0,0,0)'
            hoverBgColor='#ddd'
            block>Add an item...</Button>
        :
        // Form in order to add a new item
          <div className='addItemDiv'>
            <Input ref={(v) => this.textInput = v} placeholder='Describe your item...' />
            <div className='button'>
              <Button
                onClick={this.addItem}
                bgColor='#3cb221'
                hoverBgColor='#148407'
                color='#FFF'
                size='small'>
              Save
            </Button>
            </div>
            <div className='button'>
              <Button
                onClick={this.hideNewItemForm}
                bgColor='rgba(0,0,0,0)'
                hoverBgColor='#ddd'
                color='#70727c'
                size='small'>
                <Icon name='times' color='#70727c' />
              </Button>
            </div>
          </div>}
        <style jsx>{styles}</style>
      </div>
    )
  }
}
