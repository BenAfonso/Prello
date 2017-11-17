import React from 'react'
import BaseChart from '../../../Charts/BaseChart'
import { CartesianGrid, XAxis, YAxis, Bar, BarChart, Legend, Tooltip } from 'recharts'
import {object} from 'underscore'

export default (props) => {
  const renderDate = (date) => {
    date = new Date(date)
    return `${date.getDate() - 1 > 9 ? date.getDate() - 1 : `0${date.getDate() - 1}`}/${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}/${date.getFullYear()}`
  }

  let names = props.data ? props.data.map(u => (
    u.user.name
  )) : []
  let values = props.data ? props.data.map(d => d.numbers ? d.numbers.map(n => n.numberOfModifications) : []) : []
  let dates = props.data.length > 0 ? props.data[0].numbers ? props.data[0].numbers.map(n => n.date) : [] : []
  let data = dates.map((d, i) => ({
    date: renderDate(d),
    ...object(names, values.map(v => v[i]))
  }))

  return (
    <BaseChart title='User activity over time'>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={'date'} stroke='#444' />
        <YAxis stroke='#444' />
        <Tooltip verticalAlign='top' height={36} />
        <Legend />
        {
          names.map((n, i) => (
            <Bar dataKey={n} fill={props.colors[i]} />
          ))
        }
      </BarChart>
    </BaseChart>
  )
}
