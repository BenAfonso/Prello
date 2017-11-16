import React from 'react'
import BoardAnalytics from '../components/Dashboard/Analytics/Board/Board'
import ListsAnalytics from '../components/Dashboard/Analytics/Lists/Lists'
import PopupManager from '../components/PopupManager/PopupManager'
import DashboardLayout from '../layouts/dashboard'

export default (props) => {
  if (props.analytics === 'lists') {
    return <DashboardLayout>
      <PopupManager>
        <ListsAnalytics
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
