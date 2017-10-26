import React from 'react'
import ChecklistItem from './ChecklistItem'
import PropTypes from 'prop-types'
import styles from './Checklist.styles'
import Input from '../Input/Input'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import {connect} from 'react-redux'

  @connect(store => {
    return {
      board: store.board,
      lists: store.board.lists
    }
  })

export default class Checklist extends React.Component {
  static propTypes = {
    listIndex: PropTypes.string,
    cardId: PropTypes.string,
    id: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      isChecked: PropTypes.bool
    })),
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
      listIndex: props.listIndex,
      cardId: props.cardId,
      id: props.id,
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
    this.onDelete = this.onDelete.bind(this)
    this.updateItem = this.updateItem.bind(this)
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

  updateTitle (text) {
    if (text.length > 0) {
      this.setState({title: text, displayEditTitleForm: false}, () => {
        this.props.onUpdate(this.props.id, this.state.title)
      })
    }
  }

  addItem () {
    if (this.textInput.input.value.length > 0) {
      this.props.onItemAdd(this.props.id, this.textInput.input.value)
      this.textInput.input.value = ''
    }
  }

  deleteItem (id) {
    this.props.onItemDelete(this.props.id, id)
  }

  onDelete () {
    this.props.onDelete(this.props.id)
  }

  updateItem (id, newContent, isChecked) {
    this.props.onItemUpdate(this.props.id, id, newContent, isChecked)
  }

  recalculatePercentageDone (items) {
    if (items.length === 0) { return 0 }
    const size = items.length
    return parseInt(items.filter((item) => item.isChecked).length / size * 100, 10)
  }

  hideNewItemForm () {
    this.setState({displayNewItemForm: false})
  }

  render () {
    const list = this.props.board.lists[this.props.listIndex]
    const card = list.cards.filter(c => c._id === this.props.cardId)[0]
    const checklists = card.checklists
    const items = checklists.filter(i => i._id === this.props.id)[0].items
    const actualProgressBarStyle = {
      width: this.recalculatePercentageDone(items) + '%' // 80% width for the total progress bar in the CSS
    }
    return (
      <div className='Checklist'>
        {!this.state.displayEditTitleForm
        // Title
          ? <div className='title'>
            <span><Icon name='check-square-o' color='#888' /></span>
            <h2 onClick={this.displayEditTitleForm} className='checklistTitle'>{this.state.title}</h2>
            <div className='trash'>
              <Button
                onClick={this.onDelete}
                size='small'
                bgColor='rgba(0,0,0,0)'
                hoverBgColor='#ddd'>
                <Icon name='trash-o' color='#70727c' />
              </Button>
            </div>
          </div>
          : <div className='editDescriptionForm'>
            <div className='content'>
              <div className='card' contentEditable ref={v => { this.titleInput = v }} placeholder={this.state.title} /></div>
            <div>
            </div>
            <div className='button'>
              <div className='saveButton' onClick={() => this.updateTitle(this.titleInput.innerHTML)}>
                        Save
              </div>
              <div className='cancelButton' onClick={() => this.hideEditTitleForm()}>
                        Cancel
              </div>
            </div>
          </div> }
        {/* Display progression in any case */}
        <div className='progressPart'>
          <span className='percentageDone'>{this.recalculatePercentageDone(items)}%</span>
          <div className='progressBar'>
            <div className='actualProgressBar' style={actualProgressBarStyle} />
          </div>
        </div>
        {/* Display checklist items */}
        {items.map((item) => (
          <ChecklistItem
            id={item._id}
            key={item._id}
            isChecked={item.isChecked}
            text={item.text}
            onChange={this.updateItem}
            onDelete={this.deleteItem} />
        ))}

        {!this.state.displayNewItemForm
          ? <Button onClick={this.displayNewItemForm}
            color='#444'
            size='x-small'
            bgColor='rgba(0,0,0,0)'
            hoverBgColor='#ddd'
            block>Add an item...</Button>
          // Form to add an item
          : <div className='addItemDiv'>
            <Input ref={(v) => { this.textInput = v }} placeholder='Describe your item...' />
            <div className='button'>
              <div className='saveButton' onClick={() => this.addItem()}>
                        Save
              </div>
              <div className='cancelButton' onClick={() => this.hideNewItemForm()}>
                        Cancel
              </div>
            </div>
          </div>
        }
        <style jsx>{styles}</style>
      </div>
    )
  }
  }
