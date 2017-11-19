import React from 'react'
import styles from './Board.styles'
import { connect } from 'react-redux'
import { setBoardAnalytics, setUsersAnalytics, resetBoardAnalytics } from '../../../../store/actions'
import DateFilter from '../../DateFilter/DateFilter'
import { fetchBoardAnalytics } from '../../../../services/Analytics.services'
import NumbersOverTime from './Charts/NumbersOverTime'
import NumbersCreationOverTime from './Charts/NumbersCreationOverTime'
import DashboardNav from '../Nav/Nav'
import LoadingPage from '../../../../pages/LoadingPage/loading.page'
import {displayNotification} from '../../../../services/Notification.service'
import NumberHighlight from '../../Charts/NumberHighlight'
import UserHighlight from '../../Charts/UserHighlight'
import { max, min } from 'underscore'

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
      secondDate: '',
      fetched: false
    }
    this.shouldUpdateData = this.shouldUpdateData.bind(this)
  }
  componentWillUnmount () {
    resetBoardAnalytics()
  }
  componentWillReceiveProps (props) {
    console.log(props.board)
    if (props.board._id !== '' && props.board.createdAt && this.state.firstDate === '' && this.state.secondDate === '') {
      let date1 = new Date(props.board.createdAt)
      date1 = `${date1.getFullYear()}-${date1.getMonth() + 1}-${date1.getDate()}`
      let date2 = new Date(Date.now())
      date2 = `${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()}`
      this.setState({
        firstDate: date1,
        secondDate: date2
      })
      let provider = props.board.provider || 'TheMightyPrello'
      setUsersAnalytics(provider, this.props._id, 'day', date1, date2)
      fetchBoardAnalytics(provider, props._id, 'day', date1, date2).then(analytics => {
        setBoardAnalytics(analytics)
        this.numbers = analytics
        this.setState({
          fetched: true
        })
      }).catch(err => {
        this.setState({
          fetched: true
        })
        displayNotification({type: 'error', title: 'Error', content: 'An error occured while fetching analytics... It may be Nick\'s fault!'})
        console.error(err)
      })
    }
  }

  onFilterChange (d1, d2) {
    if (this.shouldUpdateData(d1, d2, 'day')) {
      fetchBoardAnalytics(this.props.provier || 'TheMightyPrello', this.props._id, 'day', this.state.firstDate, this.state.secondDate).then(analytics => {
        setBoardAnalytics(analytics)
        this.numbers = analytics
        this.setState({
          fetched: true
        })
      }).catch(err => {
        this.setState({
          fetched: true
        })
        displayNotification({type: 'error', title: 'Error', content: 'An error occured while fetching analytics... It may be Nick\'s fault!'})
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
    return `${date.getDate() - 1 > 9 ? date.getDate() - 1 : `0${date.getDate() - 1}`}/${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}/${date.getFullYear()}`
  }

  render () {
    let mostActiveUser = max(this.props.analytics.users, (entry) => {
      if (entry.numbers > 0) {
        return entry.numbers[entry.numbers.length - 1].cumulateNumberOfModifications
      } else {
        return 0
      }
    }).user

    let minActiveUser = min(this.props.analytics.users, (entry) => {
      if (entry.numbers > 0) {
        return entry.numbers[entry.numbers.length - 1].cumulateNumberOfModifications
      } else {
        return 0
      }
    }).user
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

    if (this.state.fetched) {
      return (
        <div className='host'>
          <div className='header'>
            <div className='title'>
              { this.props.board.title }
            </div>
            <DashboardNav provider={this.props.board.provider || 'TheMightyPrello'} boardId={this.props._id} currentPage='board' />
            { data.length > 0
              ? <div className='bigNumbers'>
                <div className='number'><NumberHighlight title='Number of cards' value={data[data.length - 1].nbCards} /></div>
                <div className='number'><NumberHighlight title='Number of lists' value={data[data.length - 1].nbLists} /></div>
                <div className='number'><UserHighlight title='Most active user' user={mostActiveUser} /></div>
                <div className='number'><UserHighlight title='Less active user' user={minActiveUser} /></div>
              </div>
              : null
            }
          </div>
          <div className='charts'>
            <div className='chart'>
              <NumbersOverTime
                dataKeys={['nbCards', 'nbLists', 'nbCardsArchived', 'nbListsArchived']}
                nameKey='name'
                data={data}
              />
            </div>
            <div className='chart'>
              <NumbersCreationOverTime
                dataKeys={['nbCardsCreated', 'nbListsCreated']}
                nameKey='name'
                data={data}
              />
            </div>
          </div>
          <div className='date-filter'><DateFilter minDate={this.props.board.createdAt} maxDate={Date.now()} onChange={this.onFilterChange.bind(this)}/></div>
          <style jsx>{styles}</style>
        </div>
      )
    } else {
      return <LoadingPage />
    }
  }
}
