import React from 'react'
import BoardAnalytics from '../components/Dashboard/Analytics/Board/Board'
import ListsAnalytics from '../components/Dashboard/Analytics/Lists/Lists'
import PopupManager from '../components/PopupManager/PopupManager'

export default (props) => {
  console.log(props)
  if (props.analytics === 'board') {
    return <PopupManager>
      <BoardAnalytics
        _id={props.match.params.id}
      />
    </PopupManager>
  }
  if (props.analytics === 'lists') {
    return <PopupManager>
      <ListsAnalytics
        _id={props.match.params.id}
      />
    </PopupManager>
  }
  return null
}
