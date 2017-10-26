import React from 'react'
import PropTypes from 'prop-types'
import CardDetailsSection from '../../CardDetailsSection/CardDetailsSection'
import Checklist from '../../../../UI/Checklist/Checklist'
import { deleteChecklist, updateChecklist } from '../../../../../services/Checklist.services'
import { addItem, deleteItem, updateItem } from '../../../../../services/Item.services'
import { connect } from 'react-redux'

@connect(store => {
  return {
    board: store.board,
    lists: store.board.lists
  }
})
export default class CardDetailsChecklists extends React.Component {
  static propTypes = {
    listIndex: PropTypes.number,
    cardId: PropTypes.any,
    onDelete: PropTypes.func,
    checklists: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
      items: PropTypes.array
    }))
  }

  static defaultProps = {
    checklists: []
  }

  constructor (props) {
    super(props)
    this.deleteChecklist = this.deleteChecklist.bind(this)
    this.updateChecklist = this.updateChecklist.bind(this)
    this.addChecklistItem = this.addChecklistItem.bind(this)
    this.deleteChecklistItem = this.deleteChecklistItem.bind(this)
    this.updateItem = this.updateItem.bind(this)
  }

  deleteChecklist (id) {
    deleteChecklist(this.props.board._id, this.props.lists[this.props.listIndex]._id, this.props.cardId, id)
  }

  updateChecklist (id, newTitle) {
    updateChecklist(this.props.board._id, this.props.lists[this.props.listIndex]._id, this.props.cardId, id, newTitle)
  }

  deleteChecklistItem (checklistId, itemId) {
    deleteItem(this.props.board._id, this.props.lists[this.props.listIndex]._id, this.props.cardId, checklistId, itemId)
  }

  addChecklistItem (checklistId, content) {
    addItem(this.props.board._id, this.props.lists[this.props.listIndex]._id, this.props.cardId, checklistId, content)
  }

  updateItem (checklistId, itemId, content, isChecked) {
    console.log(this.props.board._id, this.props.lists[this.props.listIndex]._id, this.props.cardId, checklistId, itemId, content, isChecked)
    updateItem(this.props.board._id, this.props.lists[this.props.listIndex]._id, this.props.cardId, checklistId, itemId, content, isChecked)
  }

  render () {
    const list = this.props.board.lists[this.props.listIndex]
    const card = list.cards.filter(c => c._id === this.props.cardId)[0]
    const checklists = card.checklists
    return (
      <div className='host'>
        <CardDetailsSection title='Checklists' icon='check' />
        {checklists.map((checklist) => (
          <Checklist
            listIndex={this.props.listIndex}
            cardId={this.props.cardId}
            id={checklist._id}
            onItemStatusChange={this.updateItem}
            onDelete={this.deleteChecklist}
            onItemAdd={this.addChecklistItem}
            onItemDelete={this.deleteChecklistItem}
            onItemUpdate={this.updateItem}
            onUpdate={this.updateChecklist}
            key={checklist._id}
            title={checklist.text}
            items={checklist.items} />
        ))}
        <style jsx>{`
        `}</style>
      </div>
    )
  }
}
