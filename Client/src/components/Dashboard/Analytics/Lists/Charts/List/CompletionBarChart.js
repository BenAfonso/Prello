import React from 'react'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts'
import BaseChart from '../../../../Charts/BaseChart'

export default (props) => (
  <BaseChart title='List completion'>
    <BarChart data={props.data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey={props.nameKey} stroke='#444' />
      <YAxis stroke='#444' />
      <Tooltip verticalAlign='top' height={36} />
      <Legend />
      <Bar dataKey={props.dataKeys[0]} fill='#8884d8' />
      <Bar dataKey={props.dataKeys[1]} fill='#82ca9d' />
    </BarChart>
  </BaseChart>
)
