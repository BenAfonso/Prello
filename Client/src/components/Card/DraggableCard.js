import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Card from './Card'
import CardDetails from './CardDetails/CardDetails'
import { Draggable } from 'react-beautiful-dnd'

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board
  }
})
export default class DraggableCard extends React.Component {
  static propTypes = {
    id: PropTypes.any,
    listId: PropTypes.any,
    connectCardDragSource: PropTypes.func.isRequired,
    checklists: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      index: PropTypes.number,
      items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.any,
        index: PropTypes.number,
        text: PropTypes.string.isRequired,
        isChecked: PropTypes.boolean,
        doneDate: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.instanceOf(Date)
        ])
      }))
    })),
    content: PropTypes.string.isRequired,
    shadowColor: PropTypes.any,
    index: PropTypes.number.isRequired,
    collaborators: PropTypes.arrayOf(PropTypes.any),
    responsible: PropTypes.any,
    labels: PropTypes.any,
    bgColor: PropTypes.any,
    listIndex: PropTypes.number
  }

  static defaultProps = {
    checklists: []
  }

  componentDidMount () {
  }

  displayCardDetails () {
    this.props.popoverManager.setRenderedComponent(
      <CardDetails {...this.props} dismissPopover={this.props.popoverManager.dismissPopover} />
    )
    this.props.popoverManager.displayPopover()
  }

  render () {
    const {
      id,
      checklists,
      attachments,
      index,
      nbChecklists,
      nbComments,
      bgColor,
      listIndex,
      content,
      collaborators,
      responsible,
      labels } = this.props
    let col = collaborators.map((c) => {
      if (!c._id) {
        let filterCollab = this.props.board.collaborators.filter(c2 => c === c2._id)
        if (filterCollab.length !== 0) {
          return filterCollab[0]
        }
      } else {
        return c
      }
      return undefined
    })
    if (col[0] === undefined) {
      col = []
    }
    let resp
    if (responsible) {
      if (!responsible._id) {
        let filterResp = this.props.board.collaborators.filter(c => responsible === c._id)
        if (filterResp.length !== 0) {
          resp = filterResp[0]
        }
      } else {
        resp = responsible
      }
    }

    return (
      <Draggable draggableId={id} type='CARD'>
        {(provided, snapshot) => (
          <div>
            <div
              className='host'
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              style={{
                ...provided.draggableStyle
              }}
              onClick={this.displayCardDetails.bind(this)}>
              <Card
                id={id}
                style={{ opacity: 1, backgroundColor: bgColor }}
                index={index}
                isDragging={snapshot.isDragging}
                listIndex={listIndex}
                content={content}
                nbComments={nbComments}
                nbChecklists={nbChecklists}
                checklists={checklists}
                collaborators={col}
                responsible={resp}
                attachments={attachments}
                labelsExpanded={this.props.currentBoard.labelsExpanded}
                labels={
                  labels
                    ? labels.map(l => l._id
                      ? l
                      : this.props.board.labels.filter(l2 => l === l2._id)[0])
                    : null
                } />
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    )
  }
}
