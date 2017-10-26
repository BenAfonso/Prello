import React from 'react'
import PropTypes from 'prop-types'
import CardDetailsSection from '../../CardDetailsSection/CardDetailsSection'
import Checklist from '../../../../UI/Checklist/Checklist'
import { addChecklistItem, deleteChecklistItem, updateChecklistItem } from '../../../../../store/actions'
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
    this.addChecklistItem = this.addChecklistItem.bind(this)
    this.deleteChecklistItem = this.deleteChecklistItem.bind(this)
    this.updateItemStatus = this.updateItemStatus.bind(this)
  }

  deleteChecklist (index) {
    this.props.onDelete(index)
  }

  deleteChecklistItem (checklistIndex, itemIndex) {
    deleteChecklistItem(this.props.cardId, checklistIndex, itemIndex)
  }

  addChecklistItem (checklistIndex, content) {
    addChecklistItem(this.props.cardId, checklistIndex, content)
  }

  updateItemStatus (checklistIndex, itemIndex, content, doneDate = null) {
    updateChecklistItem(this.props.cardId, checklistIndex, itemIndex, content, doneDate)
  }

  render () {
    return (
      <div className='host'>
        <CardDetailsSection title='Checklists' icon='check' />
        {this.props.checklists.map((checklist, index) => (
          <div className='checklist'>
            <Checklist
              index={parseInt(index, 10)}
              onItemStatusChange={this.updateItemStatus}
              onDelete={this.deleteChecklist}
              onItemAdd={this.addChecklistItem}
              onItemDelete={this.deleteChecklistItem}
              onItemUpdate={this.updateItemStatus}
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
