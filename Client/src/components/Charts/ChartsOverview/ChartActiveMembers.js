import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'

export default class ChartActiveMembers extends React.Component {
  getActiveMembers () {
    console.log(this.props.data)
    let boardCollaborators = []
    this.props.data.collaborators.map((collaborator) => {
      boardCollaborators.push(collaborator._id)
    })
    console.log(boardCollaborators)

    let cardsCollaborators = []
    this.props.data.lists.map((list) => {
      list.cards.map((card) => {
        if (!card.isArchived) {
          card.collaborators.map((coll) => {
            cardsCollaborators.push(coll)
          })
        }
      })
    })
    cardsCollaborators = cardsCollaborators.filter((item, pos, arr) => {
      return arr.indexOf(item) === pos
    })
    console.log(cardsCollaborators)
    const activeMembers = cardsCollaborators.length
    const inactiveMembers = boardCollaborators.length - activeMembers
    const data = [{name: 'Active', value: activeMembers}, {name: 'Inactive', value: inactiveMembers}]
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
