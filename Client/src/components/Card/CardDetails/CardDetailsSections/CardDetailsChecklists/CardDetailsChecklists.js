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
      index: PropTypes.number,
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
    this.updateItemStatus = this.updateItemStatus.bind(this)
  }

  deleteChecklist (id) {
    deleteChecklist(this.props.board._id, this.props.lists[this.props.listIndex]._id, this.props.cardId, id)
  }

  updateChecklist (id, newTitle) {
    updateChecklist(this.props.board._id, this.props.lists[this.props.listIndex]._id, this.props.cardId, id, newTitle)
  }

  deleteChecklistItem (checklistIndex, itemIndex) {
    deleteItem(this.props.cardId, checklistIndex, itemIndex)
  }

  addChecklistItem (checklistId, content) {
    console.log(this.props.board._id, this.props.lists[this.props.listIndex]._id, this.props.cardId, checklistId, content)
    addItem(this.props.board._id, this.props.lists[this.props.listIndex]._id, this.props.cardId, checklistId, content)
  }

  updateItemStatus (checklistIndex, itemIndex, content, doneDate = null) {
    updateItem(this.props.cardId, checklistIndex, itemIndex, content, doneDate)
  }

  render () {
    const list = this.props.board.lists[this.props.listIndex]
    const card = list.cards.filter(c => c._id === this.props.cardId)[0]
    const checklists = card.checklists
    return (
      <div className='host'>
        <CardDetailsSection title='Checklists' icon='check' />
        {checklists.map((checklist, index) => (
          <div key={parseInt(index, 10)} className='checklist'>
            <Checklist
              id={checklist._id}
              index={parseInt(index, 10)}
              onItemStatusChange={this.updateItemStatus}
              onDelete={this.deleteChecklist}
              onItemAdd={this.addChecklistItem}
              onItemDelete={this.deleteChecklistItem}
              onItemUpdate={this.updateItemStatus}
              onUpdate={this.updateChecklist}
              key={checklist.index}
              title={checklist.text}
              items={checklist.items} />
          </div>
        ))}
        <style jsx>{`
        `}</style>
      </div>
    )
  }
}
