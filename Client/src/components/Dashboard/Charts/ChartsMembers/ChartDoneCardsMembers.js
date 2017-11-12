import React from 'react'
import PropTypes from 'prop-types'
import { BarChart, CartesianGrid, YAxis, XAxis, Bar, Legend, Tooltip } from 'recharts'
// import { getMembersAnalytics } from '../../../services/Charts.services'
import Button from '../../../../components/UI/Button/Button'
import { connect } from 'react-redux'

@connect(store => {
  return {
    board: store.analytics.board
  }
})
export default class ChartDoneCardsMembers extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isHidden: false
    }
    this.getDoneCardsMembers = this.getDoneCardsMembers.bind(this)
    this.hideChart = this.hideChart.bind(this)
  }

  static propTypes = {
    isHidden: PropTypes.bool
  }

  static defaultProps = {
    isHidden: false
  }

  hideChart () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  getDoneCardsMembers () {
    // make axios call with boardId to get analytics data
    // const data = getMembersAnalytics(this.props.board._id)
    const data = [{user: 'Ana', doneCards: 5, pastDueCards: 10}, {user: 'Jack', doneCards: 25, pastDueCards: 3}]
    return data
  }
  render () {
    const data = this.getDoneCardsMembers()
    if (this.state.isHidden) return <div><Button onClick={this.hideChart}>Show</Button></div>
    else {
      return (
        <div>
          <Button onClick={this.hideChart}>Hide</Button>
          <div>Cards done in time by members</div>
          <BarChart width={730} height={250} data={data} barGap={0}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="user" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='doneCards' fill='#0366d6' barSize={50} />
            <Bar dataKey='pastDueCards' fill='#dc3912' barSize={50} />
          </BarChart>
        </div>
      )
    }
  }
}
