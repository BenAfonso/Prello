import React from 'react'
import { CartesianGrid, XAxis, YAxis, Bar, BarChart, Legend, Tooltip } from 'recharts'
import BaseChart from '../../../../Charts/BaseChart'

export default (props) => (
  <BaseChart title='Number of cards over time'>
    <BarChart data={props.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey={props.nameKey} stroke='#444' />
      <YAxis stroke='#444' />
      <Tooltip verticalAlign='top' height={36} />
      <Legend />
      <Bar dataKey={props.dataKey} fill={props.color} />
    </BarChart>
  </BaseChart>
)
