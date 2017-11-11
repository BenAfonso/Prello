import React from 'react'
// import { getOwnersAnlytics } from '../../../services/Charts.services'
import { BarChart, CartesianGrid, YAxis, XAxis, Bar, Legend, Tooltip } from 'recharts'
import { connect } from 'react-redux'

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board
  }
})
export default class ChartCardsPerList extends React.Component {
  getCardsPerList () {
    // make axios call with boardId to get analytics data
    // const data = getOwnersAnlytics(this.props.board._id)
    let listData = []
    const lists = this.props.data
    lists.map((list) => {
      if (!list.isArchived) {
        let cardsNumber = 0
        list.cards.map((card) => {
          if (!card.isArchived) {
            cardsNumber = cardsNumber + 1
          }
        })
        listData.push({name: list.name, cards: cardsNumber})
      }
    })
    console.log(listData)
    // const data = [{owner: 'Ana', doneCards: 11, pastDueCards: 10}, {owner: 'Ana', doneCards: 11, pastDueCards: 10}, {owner: 'Ana', doneCards: 11, pastDueCards: 10}, {owner: 'Jack', doneCards: 3, pastDueCards: 20}]
    return listData
  }
  render () {
    const data = this.getCardsPerList()
    return (
      <div>
        <div>Number of cards per list</div>
        <BarChart width={730} height={250} data={data} barGap={0}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='cards' fill='#0366d6' barSize={50} />
        </BarChart>
      </div>
    )
  }
}
