import React from 'react'
// import BoardAnalytics from '../components/Dashboard/Analytics/Board/Board'
// import ListsAnalytics from '../components/Dashboard/Analytics/Lists/Lists'
import PopupManager from '../components/PopupManager/PopupManager'
import Dashboard from '../components/Dashboard/Dashboard'

/* export default (props) => {
  if (props.analytics === 'board') {
    return <PopupManager>
      <BoardAnalytics
        _id={props.match.params.id}
        analytics={props.analytics}
      />
    </PopupManager>
  }
  if (props.analytics === 'list') {
    return <PopupManager>
      <ListsAnalytics
        _id={props.match.params.id}
      />
    </PopupManager>
  }
} */

export default (props) => (
  <PopupManager>
    <Dashboard
      _id={props.match.params.id}
    />
  </PopupManager>
)
