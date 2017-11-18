import React from 'react'
import DashboardBoards from '../components/Dashboard/Boards/Boards'
import PopupManager from '../components/PopupManager/PopupManager'
import DashboardLayout from '../layouts/page'

export default (props) => (
  <PopupManager>
    <DashboardLayout>
      <DashboardBoards />
    </DashboardLayout>
  </PopupManager>
)
