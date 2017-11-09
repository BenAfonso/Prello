import React from 'react'
import { BarChart, CartesianGrid, YAxis, XAxis, Bar, Legend, Tooltip } from 'recharts'
// import { connect } from 'react-redux'

export default class ChartDoneCardsMembers extends React.Component {
  constructor (props) {
    super(props)
    this.getDoneCardsMembers = this.getDoneCardsMembers.bind(this)
  }
  getDoneCardsMembers () {
    // make axios call with boardId to get analytics data
    const data = [{user: 'Ana', doneCards: 5, pastDueCards: 10}, {user: 'Jack', doneCards: 25, pastDueCards: 3}]
    return data
  }
  render () {
    const data = this.getDoneCardsMembers()
    return (
      <div>
        <div>Cards done in time by members</div>
        <BarChart width={730} height={250} data={data} barGap={0}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="user" />
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
