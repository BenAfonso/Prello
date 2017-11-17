import React from 'react'
import BoardAnalytics from '../components/Dashboard/Analytics/Board/Board'
import ListsAnalytics from '../components/Dashboard/Analytics/Lists/Lists'
import PopupManager from '../components/PopupManager/PopupManager'
import DashboardLayout from '../layouts/dashboard'
import MembersAnalytics from '../components/Dashboard/Analytics/Members/Members'
import { setAnalyticsBoard } from '../store/actions'
import {logout} from '../services/Authentication.services'

export default class BoardDasboardPage extends React.Component {
  componentDidMount () {
    setAnalyticsBoard(this.props.provider || 'TheMightyPrello', this.props.match.params.id).then(res => {
      console.log(res)
    }).catch(err => {
      logout()
      console.error(err)
      return null
    })
  }

  render () {
    if (this.props.analytics === 'lists') {
      return <DashboardLayout>
        <PopupManager>
          <ListsAnalytics
            _id={this.props.match.params.id}
            provider={this.props.provider || 'TheMightyPrello'}
          />
        </PopupManager>
      </DashboardLayout>
    } else if (this.props.analytics === 'users') {
      return <DashboardLayout>
        <PopupManager>
          <MembersAnalytics
            _id={this.props.match.params.id}
          />
        </PopupManager>
      </DashboardLayout>
    } else {
      return <DashboardLayout>
        <PopupManager>
          <BoardAnalytics
            _id={this.props.match.params.id}
          />
        </PopupManager>
      </DashboardLayout>
    }
  }
}
