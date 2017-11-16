import React from 'react'
import DashboardBoards from '../components/Dashboard/Boards/Boards'
import PopupManager from '../components/PopupManager/PopupManager'
import PageLayout from '../layouts/page'

export default (props) => (
  <PopupManager>
    <PageLayout>
      <DashboardBoards />
    </PageLayout>
  </PopupManager>
)
