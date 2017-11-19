import React from 'react'
import styles from './Lists.styles'
import { connect } from 'react-redux'
import { setListsAnalytics } from '../../../../store/actions'
import {shuffle, object} from 'underscore'
import ListCardsProportionPieChart from './Charts/ListCardsProportionPieChart'
import NumberCardsPerList from './Charts/NumberCardsPerList'
import AverageTimeCards from './Charts/AverageTimeCards'
import NumberOfCardsOverTimePerList from './Charts/List/NumberOfCardsOverTime'
import AverageTimeCardsPerList from './Charts/List/AverageTimeCards'
import DashboardNav from '../Nav/Nav'
import CumulativeFlowDiagram from './Charts/CumulativeFlowDiagram'
import CompletionBarChart from './Charts/CompletionBarChart'
import DateFilter from '../../DateFilter/DateFilter'
import LoadingPage from '../../../../pages/LoadingPage/loading.page'
import {displayNotification} from '../../../../services/Notification.service'
import COLORS from '../../Charts/Colors'

@connect(store => {
  return {
    board: store.analytics.board,
    lists: store.analytics.lists
  }
})
export default class ListsAnalytics extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstDate: '',
      secondDate: '',
      fetched: false,
      listFocused: -1
    }
    this.shouldUpdateData = this.shouldUpdateData.bind(this)
    this.colors = shuffle(COLORS)
  }

  componentDidMount () {
    setListsAnalytics(this.props.provider || 'TheMightyPrello', this.props._id, 'day').then(res => {
      this.setState({ fetched: true })
    }).catch(err => {
      this.setState({
        fetched: true
      })
      displayNotification({type: 'error', title: 'Error', content: 'An error occured while fetching analytics... It may be Nick\'s fault!'})
      console.error(err)
    })
  }

  componentWillReceiveProps (props) {
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
      console.log(props.board)
      setListsAnalytics(provider, props._id, 'day', date1, date2).then(res => {
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
    } else {
      this.setState({
        fetched: true
      })
    }
  }

  focusList (i) {
    this.setState({ listFocused: i })
  }

  onFilterChange (d1, d2) {
    if (this.shouldUpdateData(d1, d2, 'day')) {
      setListsAnalytics(this.props.provider || 'TheMightyPrello', this.props._id, 'day', this.state.firstDate, this.state.secondDate)
        .then(res => {
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

  filterList (i) {
    if (this.state.listFocused === i) {
      return this.unfilterList()
    }
    this.setState({ listFocused: i })
  }

  unfilterList () {
    this.setState({ listFocused: -1 })
  }

  render () {
    let data = this.props.lists.map(l => (
      {
        name: l.name,
        nbCards: l.numbers ? l.numbers[l.numbers.length - 1].numberOfCards : 0,
        averageTimeSpentPerCard: l.numbers ? l.numbers[l.numbers.length - 1].averageTimeSpentPerCard : 0,
        numberOfCardsDone: l.numberOfCardsDone,
        numberOfCardsToDo: l.numberOfCardsToDo
      }
    ))
    let names = this.props.lists ? this.props.lists.map(l => (
      l.name
    )) : []
    let values = this.props.lists ? this.props.lists.map(l => l.numbers ? l.numbers.map(n => n.numberOfCards) : []) : []
    let dates = this.props.lists.length > 0 ? this.props.lists[0].numbers ? this.props.lists[0].numbers.map(n => n.date) : [] : []
    let cumulativeData = dates.map((d, i) => ({
      date: this.renderDate(d),
      ...object(names, values.map(v => v[i]))
    }))

    if (this.state.fetched) {
      return (
        <div className='host'>
          <div className='header'>
            <div className='title'>
              { this.props.board.title }
            </div>
            <DashboardNav boardId={this.props._id} currentPage='lists' />
            <div className='legend'>
              {
                this.props.lists.map((l, i) => (
                  <div key={i} className='list-legend'>
                    <div
                      className={`color ${this.state.listFocused === i ? 'selected' : ''}`}
                      onClick={this.filterList.bind(this, i)}
                      style={{ backgroundColor: this.colors[i] }}
                    />
                    {l.name}
                  </div>)
                )}
            </div>
            { this.state.listFocused < 0
              ? <div className='title'>Global lists analytics</div>
              : null
            }
          </div>
          { this.state.fetched
            ? <div className='charts'>
              { this.state.listFocused < 0 ? <div className='chart block'>
                <CumulativeFlowDiagram
                  fullWidth
                  nameKey='date'
                  dataKey='value'
                  names={names}
                  data={cumulativeData}
                  colors={this.colors}
                />
              </div>
                : null }
              { this.state.listFocused < 0 ? <div className='chart'>
                <ListCardsProportionPieChart
                  dataKey='value'
                  nameKey='name'
                  data={this.props.lists.map(l => ({ value: l.numbers[l.numbers.length - 1].numberOfCards, name: l.name }))}
                  colors={this.colors}
                />
              </div>
                : null }
              { this.state.listFocused < 0 ? <div className='chart'>
                <NumberCardsPerList
                  dataKey='value'
                  nameKey='name'
                  data={this.props.lists.map(l => ({ value: l.numbers[l.numbers.length - 1].numberOfCards, name: l.name }))}
                  colors={this.colors}
                />
              </div>
                : null }
              { this.state.listFocused < 0 ? <div className='chart'>
                <AverageTimeCards
                  dataKey='averageTimeSpentPerCard'
                  nameKey='name'
                  data={data}
                  colors={this.colors}
                />
              </div>
                : null }
              { this.state.listFocused < 0 ? <div className='chart'>
                <CompletionBarChart
                  dataKeys={['numberOfCardsDone', 'numberOfCardsToDo']}
                  nameKey='name'
                  data={data}
                  colors={this.colors}
                />
              </div>
                : null }
              {
                this.props.lists.map((l, index) => {
                  if (index === this.state.listFocused || this.state.listFocused < 0) {
                    let data = l.numbers.map(n => (
                      {
                        date: this.renderDate(n.date),
                        nbCards: n.numberOfCards,
                        averageTimeSpentPerCard: n.averageTimeSpentPerCard
                      }
                    ))
                    return (
                      <div key={index} className='chart-group'>
                        <div className='title'>{l.name}</div>
                        <div className='group'>
                          <div className='chart'>
                            <NumberOfCardsOverTimePerList
                              dataKey='nbCards'
                              nameKey='date'
                              data={data}
                              color={this.colors[index]}
                            />
                          </div>
                          <div className='chart'>
                            <AverageTimeCardsPerList
                              dataKey='averageTimeSpentPerCard'
                              nameKey='date'
                              data={data}
                              color={this.colors[index]}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  } else {
                    return null
                  }
                })
              }
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
