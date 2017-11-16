import React from 'react'
// import { getOwnersAnlytics } from '../../../services/Charts.services'
import { BarChart, CartesianGrid, YAxis, XAxis, Bar, Legend, Tooltip } from 'recharts'
import { connect } from 'react-redux'

@connect(store => {
  return {
    board: store.analytics.board
  }
})
export default class ChartDoneCardsResponsibles extends React.Component {
  constructor (props) {
    super(props)
    this.getDoneCardsOwners = this.getDoneCardsOwners.bind(this)
  }
  getDoneCardsOwners () {
    // make axios call with boardId to get analytics data
    // const data = getOwnersAnlytics(this.props.board._id)
    const data = [{owner: 'Ana', doneCards: 11, pastDueCards: 10}, {owner: 'Ana', doneCards: 11, pastDueCards: 10}, {owner: 'Ana', doneCards: 11, pastDueCards: 10}, {owner: 'Jack', doneCards: 3, pastDueCards: 20}]
    return data
  }
  render () {
    const data = this.getDoneCardsOwners()
    return (
      <div>
        <div>Cards done in time related to owners</div>
        <BarChart width={730} height={250} data={data} barGap={0}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='owner' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='doneCards' fill='#0366d6' barSize={50} />
          <Bar dataKey='pastDueCards' fill='#dc3912' barSize={50} />
        </BarChart>
      </div>
    )
  }
}
