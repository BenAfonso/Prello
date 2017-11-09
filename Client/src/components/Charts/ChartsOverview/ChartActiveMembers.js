import React from 'react'
// import { getOwnersAnlytics } from '../../../services/Charts.services'
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
import { connect } from 'react-redux'

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board
  }
})
export default class ChartActiveMembers extends React.Component {
  getActiveMembers () {
    const data = [{name: 'Active', value: 30}, {name: 'Inactive', value: 70}]
    return data
  }
  render () {
    const data = this.getActiveMembers()
    const colors = ['#0366d6', '#dc3912']
    return (
      <div>
        <div>Active members</div>
        <PieChart width={730} height={250}>
          <Tooltip />
          <Legend />
          <Pie data={data} nameKey='name' dataKey='value' fill='#0366d6' label >
            {
              data.map((entry, index) => <Cell fill={colors[index]} />)
            }
          </Pie>
        </PieChart>
      </div>
    )
  }
}
