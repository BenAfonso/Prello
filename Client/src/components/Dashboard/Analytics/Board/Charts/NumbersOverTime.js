import React from 'react'
import { CartesianGrid, XAxis, YAxis, Line, LineChart, Legend, Tooltip } from 'recharts'
import BaseChart from '../../../Charts/BaseChart'

export default (props) => (
  <BaseChart title='Number evolution over time'>
    <LineChart data={props.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey={props.nameKey} stroke='#444' />
      <YAxis stroke='#444' />
      <Tooltip verticalAlign='top' height={36} />
      <Legend />
      <Line type='monotone' dataKey={props.dataKeys[0]} stroke='#8884d8' />
      <Line type='monotone' dataKey={props.dataKeys[1]} stroke='#82ca9d' />
      <Line type='monotone' dataKey={props.dataKeys[2]} stroke='#889ad3' />
      <Line type='monotone' dataKey={props.dataKeys[3]} stroke='#82942d' />
    </LineChart>
  </BaseChart>
)
