import PageLayout from '../../../../layouts/page'
import React from 'react'
import styles from './Lists.styles'
import { connect } from 'react-redux'
import { setListsAnalytics } from '../../../../store/actions'
import { BarChart, Bar, LineChart, Pie, Cell, PieChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts'
import BaseChart from '../../Charts/BaseChart'
import {shuffle} from 'underscore'

@connect(store => {
  return {
    analytics: store.analytics,
    board: store.analytics.board,
    lists: store.analytics.board.lists
  }
})
export default class BoardAnalytics extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstDate: '',
      secondDate: '',
      fetched: false
    }
    this.shouldUpdateData = this.shouldUpdateData.bind(this)
  }

  componentDidMount () {
    if (this.state.fetched) {
      return
    }
    setListsAnalytics(this.props.provider || 'TheMightyPrello', this.props._id, 'day').then(res => {
      this.setState({ fetched: true })
    })
  }

  onFilterChange (d1, d2) {
  }

  shouldUpdateData (d1, d2, per) {
    let date1 = `${d1.split('/')[2]}-${d1.split('/')[1]}-${d1.split('/')[0]}`
    let date2 = `${d2.split('/')[2]}-${d2.split('/')[1]}-${d2.split('/')[0]}`
    if (date1 !== this.state.firstDate) {
      this.setState({ firstDate: date1 })
      return true
    }
    if (date2 !== this.state.secondDate) {
      this.setState({ secondDate: date2 })
      return true
    }
    return false
  }

  renderDate (date) {
    date = new Date(date)
    return `${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}/${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}/${date.getFullYear()}`
  }

  render () {
    let data = this.props.lists.map(l => (
      {
        name: l.name,
        nbCards: l.numbers ? l.numbers[0].numberOfCards : 0,
        averageTimeSpentPerCard: l.numbers ? l.numbers[0].averageTimeSpentPerCard : 0
      }
    ))

    let colors = shuffle(['#8884d8', '#82ca9d', '#F9A825', '#FF1744', '#F06292', '#AB47BC', '#651FFF', '#80D8FF', '#00E5FF', '#69F0AE'])
    return (<PageLayout>
      <div className='host'>
        <div className='header'>
          <div className='title'>{ this.props.board.title }</div>
        </div>
        { this.state.fetched
          ? <div className='charts'>
            <div className='chart'>
              <BaseChart>
                <PieChart>
                  <Pie data={this.props.lists.map(l => ({ value: l.numbers[0].numberOfCards, name: l.name }))} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {
                      this.props.lists.map(l => ({ value: l.numbers[0].numberOfCards, name: l.name })).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]}/>
                      ))
                    }
                  </Pie>
                  <Tooltip verticalAlign="top" height={36} />
                  <Legend />
                </PieChart>
              </BaseChart>
            </div>
            <div className='chart'>
              <BaseChart>
                <BarChart data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#444" />
                  <YAxis stroke="#444" />
                  <Tooltip verticalAlign="top" height={36} />
                  <Legend />
                  <Bar dataKey="nbCards" fill="#8884d8">
                    {
                      data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]}/>
                      ))
                    }
                  </Bar>
                </BarChart>
              </BaseChart>
            </div>
            <div className='chart'>
              <BaseChart>
                <BarChart data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#444" />
                  <YAxis stroke="#444" />
                  <Tooltip verticalAlign="top" height={36} />
                  <Legend />
                  <Bar dataKey="averageTimeSpentPerCard" fill="#82ca9d">
                    {
                      data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]}/>
                      ))
                    }
                  </Bar>
                </BarChart>
              </BaseChart>
            </div>
            {
              this.props.lists.map((l, index) => {
                let data2 = l.numbers.map(n => (
                  {
                    date: this.renderDate(n.date),
                    nbCards: n.numberOfCards,
                    averageTimeSpentPerCard: n.averageTimeSpentPerCard
                  }
                ))
                return (
                  <div>
                    <div className='title'>{l.name}</div>
                    <div className='chart'>
                      <BaseChart>
                        <BarChart data={data2}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" stroke="#444" />
                          <YAxis stroke="#444" />
                          <Tooltip verticalAlign="top" height={36} />
                          <Legend />
                          <Bar dataKey="nbCards" fill={colors[index]} />
                        </BarChart>
                      </BaseChart>
                    </div>
                    <div className='chart'>
                      <BaseChart>
                        <LineChart data={data2}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" stroke="#444" />
                          <YAxis stroke="#444" />
                          <Tooltip verticalAlign="top" height={36} />
                          <Legend />
                          <Line type='monotone' dataKey="averageTimeSpentPerCard" stroke={colors[index]} />
                        </LineChart>
                      </BaseChart>
                    </div>
                  </div>
                )
              })
            }
          </div>
          : null
        }
        <style jsx>{styles}</style>
      </div>
    </PageLayout>)
  }
}
