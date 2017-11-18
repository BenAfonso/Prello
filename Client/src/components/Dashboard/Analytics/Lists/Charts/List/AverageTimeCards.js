import React from 'react'
import { CartesianGrid, XAxis, YAxis, Line, LineChart, Legend, Tooltip } from 'recharts'
import BaseChart from '../../../../Charts/BaseChart'

export default (props) => (
  <BaseChart title='Average time spend for cards over time'>
    <LineChart data={props.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey={props.nameKey} stroke='#444' />
      <YAxis stroke='#444' />
      <Tooltip verticalAlign='top' height={36} />
      <Legend />
      <Line type='monotone' dataKey={props.dataKey} stroke={props.color} />
    </LineChart>
  </BaseChart>
)
