import React from 'react'
import BaseChart from '../../../Charts/BaseChart'
import { CartesianGrid, XAxis, YAxis, Bar, Cell, BarChart, Legend, Tooltip } from 'recharts'

export default (props) => (
  <BaseChart title='Average time cards spend per list (days)'>
    <BarChart data={props.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey={props.nameKey} stroke='#444' />
      <YAxis stroke='#444' />
      <Tooltip verticalAlign='top' height={36} />
      <Legend />
      <Bar dataKey={props.dataKey} fill='#82ca9d'>
        {props.data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={props.colors[index]} />
        ))}
      </Bar>
    </BarChart>
  </BaseChart>
)
