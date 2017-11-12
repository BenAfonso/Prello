import React from 'react'
import Dashboard from '../components/Dashboard/Dashboard'
import PopupManager from '../components/PopupManager/PopupManager'

export default (props) => (
  <PopupManager>
    <Dashboard
      _id={props.match.params.id}
    />
  </PopupManager>
)
