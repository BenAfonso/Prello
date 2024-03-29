import React from 'react'
import styles from './Members.styles'
import { connect } from 'react-redux'
import DashboardNav from '../Nav/Nav'
import { setUsersAnalytics } from '../../../../store/actions'
import {shuffle, max, min} from 'underscore'
import CardProportion from './Charts/CardProportion'
import ActivityProportion from './Charts/ActivityProportion'
import DailyActivityPerUser from './Charts/DailyActivityPerUser'
import DateFilter from '../../DateFilter/DateFilter'
import LoadingPage from '../../../../pages/LoadingPage/loading.page'
import {displayNotification} from '../../../../services/Notification.service'
import UserHighlight from '../../Charts/UserHighlight'
import COLORS from '../../Charts/Colors'

@connect(store => {
  return {
    board: store.analytics.board,
    users: store.analytics.users
  }
})
export default class MembersAnalytics extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstDate: '',
      secondDate: '',
      fetched: false,
      userFocused: -1
    }
    this.shouldUpdateData = this.shouldUpdateData.bind(this)
    this.colors = shuffle(COLORS)
  }

  componentDidMount () {
    if (this.state.fetched) {
      return
    }
    setUsersAnalytics(this.props.provider || 'TheMightyPrello', this.props._id, 'day').then(res => {
      this.setState({ fetched: true })
    }).catch(err => {
      this.setState({
        fetched: true
      })
      displayNotification({type: 'error', title: 'Error', content: 'An error occured while fetching analytics... It may be Nick\'s fault!'})
      console.error(err)
    })
  }

  onFilterChange (d1, d2) {
    if (this.shouldUpdateData(d1, d2, 'day')) {
      setUsersAnalytics(this.props.provider || 'TheMightyPrello', this.props._id, 'day', this.state.firstDate, this.state.secondDate)
    }
  }

  componentWillReceiveProps (props) {
    if (props.board.createdAt && this.state.firstDate === '' && this.state.secondDate === '') {
      let date1 = new Date(props.board.createdAt)
      date1 = `${date1.getFullYear()}-${date1.getMonth() + 1}-${date1.getDate()}`
      let date2 = new Date(Date.now())
      date2 = `${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()}`
      this.setState({
        firstDate: date1,
        secondDate: date2
      })
      let provider = props.board.provider || 'TheMightyPrello'
      console.log(props.board)
      setUsersAnalytics(provider, this.props._id, 'day', this.state.firstDate, this.state.secondDate).then(res => {
        this.setState({ fetched: true })
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
    return `${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}/${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}/${date.getFullYear()}`
  }

  filterUser (i) {
    if (this.state.userFocused === i) {
      return this.unfilterList()
    }
    this.setState({ userFocused: i })
  }

  unfilterUser () {
    this.setState({ userFocused: -1 })
  }

  render () {
    let mostActiveUserToday = max(this.props.users, (entry) => {
      if (entry.numbers.length > 0) {
        return entry.numbers[entry.numbers.length - 1].numberOfModifications
      } else {
        return 0
      }
    }).user
    let doesEverything = max(this.props.users, (entry) => {
      if (!entry.numberOfCardsDone) {
        return 0
      } else {
        return entry.numberOfCardsDone + entry.numberOfCardsDone
      }
    }).user
    let mostAccurate = min(this.props.users, (entry) => {
      if (!entry.numberOfCardsDone && !entry.numberOfCardsDoneLate) {
        return 0
      } else {
        return entry.numberOfCardsDoneLate / entry.numberOfCardsDone
      }
    }).user
    let alwaysLate = max(this.props.users, (entry) => {
      if (!entry.numberOfCardsDone && !entry.numberOfCardsDoneLate) {
        return 0
      } else {
        return entry.numberOfCardsDoneLate / entry.numberOfCardsDone
      }
    }).user

    if (this.state.fetched) {
      return (
        <div className='host'>
          <div className='header'>
            <div className='title'>
              { this.props.board.title }
            </div>
            <DashboardNav boardId={this.props._id} currentPage='users' />
            { this.state.userFocused < 0
              ? <div className='title'>Global users analytics</div>
              : null
            }
          </div>
          { this.state.fetched
            ? <div className='charts'>
              <div className='bigNumbers'>
                <div className='number'><UserHighlight title='Most active today' user={mostActiveUserToday} /></div>
                <div className='number'><UserHighlight title='Does everything' user={doesEverything} /></div>
                <div className='number'><UserHighlight title='On-time' user={mostAccurate} /></div>
                <div className='number'><UserHighlight title='Always late' user={alwaysLate} /></div>
              </div>
              { this.state.userFocused < 0 ? <div className='chart block'>
                <DailyActivityPerUser
                  data={this.props.users}
                  colors={this.colors}
                />
              </div>
                : null }
              { this.state.userFocused < 0 ? <div className='chart'>
                <CardProportion
                  data={this.props.users}
                  colors={this.colors}
                />
              </div>
                : null }
              { this.state.userFocused < 0 ? <div className='chart'>
                <ActivityProportion
                  data={this.props.users}
                  colors={this.colors}
                />
              </div>
                : null }
            </div>
            : null
          }
          <div className='date-filter'><DateFilter minDate={this.props.board.createdAt} maxDate={Date.now()} onChange={this.onFilterChange.bind(this)}/></div>
          <style jsx>{styles}</style>
        </div>
      )
    } else {
      return <LoadingPage />
    }
  }
}
