import PageLayout from '../../layouts/page'
import React from 'react'
import { connect } from 'react-redux'
import ChartDoneCardsMembers from '../../components/Charts/ChartsMembers/ChartDoneCardsMembers'
import ChartDoneCardsOwners from '../../components/Charts/ChartsOwners/ChartDoneCardsOwners'

@connect(store => {
  return {
    currentUser: store.currentUser,
    teamslist: store.teamslist
  }
})
export default class DashboardPage extends React.Component {
  render () {
    return (
      <PageLayout>
        <ChartDoneCardsMembers />
        <ChartDoneCardsOwners />
      </PageLayout>
    )
  }
}
