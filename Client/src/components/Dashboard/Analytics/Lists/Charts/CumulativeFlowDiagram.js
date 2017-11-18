import React from 'react'
import { CartesianGrid, XAxis, YAxis, Tooltip, ComposedChart, Area } from 'recharts'
import BaseChart from '../../../Charts/BaseChart'

export default (props) => (
  <BaseChart title='Cumulative Flow Diagram' fullWidth>
    <ComposedChart width={730} height={250} data={props.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        {
          props.names.map((n, i) =>
            <linearGradient key={i} id={i} x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={props.colors[i]} stopOpacity={0.8} />
              <stop offset='95%' stopColor={props.colors[i]} stopOpacity={0} />
            </linearGradient>
          )
        }
      </defs>
      <XAxis dataKey={props.nameKey} />
      <YAxis />
      <CartesianGrid strokeDasharray='3 3' />
      <Tooltip />
      {
        props.names.map((n, i) =>
          <Area key={i} type='monotone' dataKey={n} stroke={props.colors[i]} fillOpacity={1} fill={`url(#${i})`} />
        )
      }
    </ComposedChart>
  </BaseChart>
)
