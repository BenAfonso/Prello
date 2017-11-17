import React from 'react'
import BoardAnalytics from '../components/Dashboard/Analytics/Board/Board'
import ListsAnalytics from '../components/Dashboard/Analytics/Lists/Lists'
import PopupManager from '../components/PopupManager/PopupManager'
import DashboardLayout from '../layouts/dashboard'
import MembersAnalytics from '../components/Dashboard/Analytics/Members/Members'
import { setAnalyticsBoard } from '../store/actions'
import {logout} from '../services/Authentication.services'

export default (props) => {
  setAnalyticsBoard(props.provider || 'TheMightyPrello', props.match.params._id).catch(err => {
    logout()
    return err
  })
  if (props.analytics === 'lists') {
    return <DashboardLayout>
      <PopupManager>
        <ListsAnalytics
          _id={props.match.params.id}
          provider={props.provider || 'TheMightyPrello'}
        />
      </PopupManager>
    </DashboardLayout>
  } else if (props.analytics === 'users') {
    return <DashboardLayout>
      <PopupManager>
        <MembersAnalytics
          _id={props.match.params.id}
        />
      </PopupManager>
    </DashboardLayout>
  } else {
    return <DashboardLayout>
      <PopupManager>
        <BoardAnalytics
          _id={props.match.params.id}
        />
      </PopupManager>
    </DashboardLayout>
  }
}
