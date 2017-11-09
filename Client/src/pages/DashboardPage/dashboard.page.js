import PageLayout from '../../layouts/page'
import React from 'react'
import { connect } from 'react-redux'
import styles from './dashboard.styles'
import ChartDoneCardsMembers from '../../components/Charts/ChartsMembers/ChartDoneCardsMembers'
import ChartDoneCardsOwners from '../../components/Charts/ChartsOwners/ChartDoneCardsOwners'
// import PropTypes from 'prop-types'
// import { updateProfile } from '../../services/User.services'
// import { updateProfileAction, setTeamslist } from '../../store/actions'
// import { updateProfileLocalStorage } from '../../services/Authentication.services'
// import AvatarThumbnail from '../../components/UI/AvatarThumbnail/AvatarThumbnail'
// import { Link } from 'react-router-dom'

@connect(store => {
  return {
    currentUser: store.currentUser,
    teamslist: store.teamslist
  }
})
export default class DashboardPage extends React.Component {
  render () {
    return (
      <div className='dashboardPage'>
        <PageLayout>
          <ChartDoneCardsMembers />
          <ChartDoneCardsOwners />
        </PageLayout>
        <style jsx>{styles}</style>
      </div>
    )
  }
}
