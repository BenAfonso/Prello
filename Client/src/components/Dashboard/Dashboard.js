import PageLayout from '../../layouts/page'
import React from 'react'
import styles from './Dashboard.styles'
import { connect } from 'react-redux'
import { setAnalyticsBoard, setBoardAnalytics } from '../../store/actions'
import DateFilter from './DateFilter/DateFilter'
import { LineChart, CartesianGrid, XAxis, YAxis, Line, Legend, Tooltip } from 'recharts'
import { fetchBoardAnalytics } from '../../services/Analytics.services'

@connect(store => {
  return {
    analytics: store.analytics,
    board: store.analytics.board
  }
})
export default class Dashboard extends React.Component {
  componentDidMount () {
    setAnalyticsBoard(this.props.provider || 'TheMightyPrello', this.props._id)
    fetchBoardAnalytics(this.props.provier || 'TheMightyPrello', this.props._id, 'day', '2017-11-05', '2017-11-15').then(analytics => {
      setBoardAnalytics(analytics)
      this.numbers = analytics
    }).catch(err => {
      console.error(err)
    })
  }

  onFilterChange (d1, d2) {
  }

  render () {
    let data = this.props.analytics.board.numbers.map(a => ({name: a.date, nbCards: a.numberOfCards, nbLists: a.numberOfLists, nbCardsArchived: a.numberOfCardsArchived, nbListsArchived: a.numberOfListsArchived}))
    console.log(data)
    return (<PageLayout>
      <div className='host'>
        <h1>Analytics dashboard for board {this.props.board.title}</h1>
        <div className='chart'>
          <LineChart width={730} height={250} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#444" />
            <YAxis stroke="#444" />
            <Tooltip verticalAlign="top" height={36} />
            <Legend />
            <Line type="monotone" dataKey="nbCards" stroke="#8884d8" />
            <Line type="monotone" dataKey="nbLists" stroke="#82ca9d" />
            <Line type="monotone" dataKey="nbCardsArchived" stroke="#889ad3" />
            <Line type="monotone" dataKey="nbListsArchived" stroke="#82942d" />
          </LineChart>
        </div>

        <div className='date-filter'><DateFilter minDate={this.props.board.createdAt} maxDate={Date.now()} onChange={this.onFilterChange.bind(this)}/></div>

        <style jsx>{styles}</style>
      </div>
    </PageLayout>)
  }
}
