import React from 'react'
import BaseChart from '../../../Charts/BaseChart'
import { Pie, Cell, PieChart, Legend, Tooltip } from 'recharts'

export default (props) => {
  let data = props.data.map(u => (
    {
      value: u.numbers ? u.numbers[u.numbers.length - 1] ? u.numbers[u.numbers.length - 1].cumulateNumberOfModifications : 0 : 0,
      name: u.user.name
    }
  ))
  return (
    <BaseChart title='Activity repartition'>
      <PieChart>
        <Pie data={data} dataKey={'value'} nameKey={'name'} cx='50%' cy='50%' innerRadius={60} outerRadius={100} label>
          {
            props.data.map((entry, index) => (
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
