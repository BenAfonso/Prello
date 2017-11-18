import React from 'react'
import BaseChart from '../../../Charts/BaseChart'
import { Pie, Cell, PieChart, Legend, Tooltip } from 'recharts'

export default (props) => (
  <BaseChart title='Card repartition'>
    <PieChart>
      <Pie data={props.data} dataKey={props.dataKey} nameKey={props.nameKey} cx='50%' cy='50%' outerRadius={100} label>
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
