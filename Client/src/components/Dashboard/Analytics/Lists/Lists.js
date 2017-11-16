import React from 'react'
import styles from './Lists.styles'
import { connect } from 'react-redux'
import { setListsAnalytics } from '../../../../store/actions'
import {shuffle} from 'underscore'
import ListCardsProportionPieChart from './Charts/ListCardsProportionPieChart'
import NumberCardsPerList from './Charts/NumberCardsPerList'
import AverageTimeCards from './Charts/AverageTimeCards'
import NumberOfCardsOverTimePerList from './Charts/List/NumberOfCardsOverTime'
import AverageTimeCardsPerList from './Charts/List/AverageTimeCards'
import DashboardNav from '../Nav/Nav'

@connect(store => {
  return {
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
      fetched: false,
      listFocused: -1
    }
    this.shouldUpdateData = this.shouldUpdateData.bind(this)
    this.colors = shuffle(['#8884d8', '#82ca9d', '#F9A825', '#FF1744', '#F06292', '#AB47BC', '#651FFF', '#80D8FF', '#00E5FF', '#69F0AE'])
  }

  componentDidMount () {
    if (this.state.fetched) {
      return
    }
    setListsAnalytics(this.props.provider || 'TheMightyPrello', this.props._id, 'day').then(res => {
      this.setState({ fetched: true })
    })
  }

  focusList (i) {
    this.setState({ listFocused: i })
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
        nbCards: l.numbers ? l.numbers[0].numberOfCards : 0,
        averageTimeSpentPerCard: l.numbers ? l.numbers[0].averageTimeSpentPerCard : 0
      }
    ))

    return (
      <div className='host'>
        <div className='header'>
          <div className='title'>
            { this.props.board.title }
          </div>
          <DashboardNav boardId={this.props.board._id} currentPage='lists' />
          <div className='legend'>
            {
              this.props.lists.map((l, i) => (
                <div className='list-legend'>
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

            { this.state.listFocused < 0 ? <div className='chart'>
              <ListCardsProportionPieChart
                dataKey='value'
                nameKey='name'
                data={this.props.lists.map(l => ({ value: l.numbers[0].numberOfCards, name: l.name }))}
                colors={this.colors}
              />
            </div>
              : null }
            { this.state.listFocused < 0 ? <div className='chart'>
              <NumberCardsPerList
                dataKey='value'
                nameKey='name'
                data={this.props.lists.map(l => ({ value: l.numbers[0].numberOfCards, name: l.name }))}
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
                    <div className='chart-group'>
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
        <style jsx>{styles}</style>
      </div>
    )
  }
}
