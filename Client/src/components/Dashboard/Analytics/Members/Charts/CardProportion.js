import React from 'react'
import BaseChart from '../../../Charts/BaseChart'
import { Pie, Cell, PieChart, Legend, Tooltip } from 'recharts'

export default (props) => {
  let data = props.data.map(u => (
    {
      numberOfCards: u.numberOfCardsToDo + u.numberOfCardsDone,
      name: u.user.name
    }
  ))
  return (
    <BaseChart title='Card repartition'>
      <PieChart>
        <Pie data={data} dataKey='numberOfCards' nameKey={'name'} cx='50%' cy='50%' innerRadius={60} outerRadius={100} label>
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={props.colors[index]} />
            ))
          }
        </Pie>
        <Tooltip verticalAlign='top' height={36} />
        <Legend />
      </PieChart>
    </BaseChart>
  )
}
