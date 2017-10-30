import React from 'react'
import {connect} from 'react-redux'
import Card from '../../Card/Card'
import { restoreCard, restoreList } from '../../../store/actions'

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board
  }
})
export default class ArchivedMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cardTab: false
    }
  }

  switchTab () {
    this.setState({ cardTab: !this.state.cardTab })
  }
  render () {
    return (
      <div className='host'>
        <div className='title'>
          ARCHIVED { this.state.cardTab ? 'CARDS' : 'LISTS' }
          <span onClick={this.switchTab.bind(this)}>Switch to { this.state.cardTab ? 'lists' : 'cards' }</span>
        </div>
        <ul>
          {
            this.props.board.lists.map(l => (
              this.state.cardTab
                ? l.cards.map(c => c.isArchived
                  ? <li>
                    <Card
                      content={c.text}
                      createdAt={c.createdAt}
                      index={0}
                      listIndex={0}
                      collaborators={c.collaborators}
                      id={c._id} />
                    <div className='restoreButton' onClick={() => restoreCard(this.props.board._id, l._id, c)}>Restore</div>
                  </li>
                  : null
                )
                : l.isArchived
                  ? <li>
                    <Card
                      content={l.name}
                      createdAt={l.createdAt}
                      index={0}
                      listIndex={0}
                      collaborators={[]}
                      bgColor='#eee'
                      id={l._id} />
                    <div className='restoreButton' onClick={() => restoreList(this.props.board._id, l)}>Restore</div>
                  </li>
                  : null
            ))
          }
        </ul>
        <style jsx>{`
          li {
            margin-bottom: 10px;
          }

          li:hover {
            transform: rotate(3deg);
          }

          .title {
            font-weight: bold;
            margin-bottom: 20px;
          }

          .title span {
            display: block;
            font-size: 14px;
            font-weight: normal;
            cursor: pointer;
            color: #999;
            text-decoration: underline;
          }

          .restoreButton {
            cursor: pointer;
            font-size: 14px;
            color: #999;
          }
        `}
        </style>
      </div>
    )
  }
}
