import PageLayout from '../../../../layouts/page'
import React from 'react'
import styles from './Lists.styles'
import { connect } from 'react-redux'
import { setAnalyticsBoard, setBoardAnalytics } from '../../../../store/actions'
import DateFilter from '../../DateFilter/DateFilter'
import { BarChart, Bar, LineChart, CartesianGrid, XAxis, YAxis, Line, Legend, Tooltip } from 'recharts'
import { fetchBoardAnalytics } from '../../../../services/Analytics.services'
import BaseChart from '../../Charts/BaseChart'

@connect(store => {
  return {
    analytics: store.analytics,
    board: store.analytics.board
  }
})
export default class BoardAnalytics extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstDate: '',
      secondDate: ''
    }
    this.shouldUpdateData = this.shouldUpdateData.bind(this)
  }

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
    if (this.shouldUpdateData(d1, d2, 'day')) {
      fetchBoardAnalytics(this.props.provier || 'TheMightyPrello', this.props._id, 'day', this.state.firstDate, this.state.secondDate).then(analytics => {
        setBoardAnalytics(analytics)
        this.numbers = analytics
      }).catch(err => {
        console.error(err)
      })
    }
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
    let data = this.props.analytics.board.numbers.map(a => (
      {
        name: this.renderDate(a.date),
        nbCards: a.numberOfCards,
        nbLists: a.numberOfLists,
        nbCardsArchived: a.numberOfCardsArchived,
        nbListsArchived: a.numberOfListsArchived,
        nbCardsCreated: a.numberOfCardsCreated,
        nbListsCreated: a.numberOfListsCreated
      }))
    return (<PageLayout>
      <div className='host'>
        <div className='header'>
          <div className='title'>{ this.props.board.title }</div>
          { data.length > 0
            ? <div className='bigNumbers'>
              <span className='number'>{data[data.length - 1].nbCards}<span>Cards</span></span>
              <span className='number'>{data[data.length - 1].nbLists}<span>Lists</span></span>
            </div>
            : null
          }
        </div>
        <div className='charts'>
          <div className='chart'>
            <BaseChart>
              <LineChart data={data}
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
                <Bar dataKey="nbCardsCreated" fill="#8884d8" />
                <Bar dataKey="nbListsCreated" fill="#82ca9d" />
              </BarChart>
            </BaseChart>
          </div>
        </div>

        <div className='date-filter'><DateFilter minDate={this.props.board.createdAt} maxDate={Date.now()} onChange={this.onFilterChange.bind(this)}/></div>

        <style jsx>{styles}</style>
      </div>
    </PageLayout>)
  }
}
