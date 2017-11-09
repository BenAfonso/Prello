import PageLayout from '../../layouts/page'
import React from 'react'
import styles from './dashboard.styles'
import { connect } from 'react-redux'
import Tabs from '../../components/UI/Tabs/Tabs'
import TabPanel from '../../components/UI/TabPanel/TabPanel'
import Icon from '../../components/UI/Icon/Icon'
import ChartDoneCardsMembers from '../../components/Charts/ChartsMembers/ChartDoneCardsMembers'
import ChartDoneCardsResponsibles from '../../components/Charts/ChartsResponsibles/ChartDoneCardsResponsibles'
import ChartActiveMembers from '../../components/Charts/ChartsOverview/ChartActiveMembers'

@connect(store => {
  return {
    currentUser: store.currentUser,
    teamslist: store.teamslist
  }
})
export default class DashboardPage extends React.Component {
  renderProfileTab () {
    return (
      <div className='profileTab'>
        <div className='teamPart'>
          <div className='teamLine'>
            <Icon name='users'
              fontSize='24px'
              color='white'
              style={{marginLeft: '2%', marginRight: '20px'}}/>
            <span className='teamsTitle'>Cards done by members</span>
          </div>
          <hr className='titleAndContentSeparator'/>
          <ul>
            <ChartActiveMembers />
          </ul>
        </div>
        <div className = 'activityDiv'>
          <div className='activityLine'>
            <Icon name='calendar-o'
              fontSize='24px'
              color='white'
              style={{marginLeft: '2%', marginRight: '20px'}}/>
            <span className='activityTitle'>Activity feed</span>
          </div>
          <hr className='titleAndContentSeparator'/>
        </div>
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }

  renderMembersTab () {
    return (
      <div className='profileTab'>
        <div className='teamPart'>
          <div className='teamLine'>
            <Icon name='users'
              fontSize='24px'
              color='white'
              style={{marginLeft: '2%', marginRight: '20px'}}/>
            <span className='teamsTitle'>Cards done by members</span>
          </div>
          <hr className='titleAndContentSeparator'/>
          <ul>
            <ChartDoneCardsResponsibles />
          </ul>
        </div>
        <div className = 'activityDiv'>
          <div className='activityLine'>
            <Icon name='users'
              fontSize='24px'
              color='white'
              style={{marginLeft: '2%', marginRight: '20px'}}/>
            <span className='activityTitle'>Active members</span>
          </div>
          <hr className='titleAndContentSeparator'/>
          <ul>
            <ChartDoneCardsMembers />
          </ul>
        </div>
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }

  render () {
    return (
      <PageLayout>
        <div className='dashboardPage'>
          <div><h1>Analytics dashboard</h1></div>
          <div className='tabSection'>
            <Tabs selected='0'>
              <TabPanel label='Overview'>
                {this.renderProfileTab()}
              </TabPanel>
              <TabPanel label='Members'>
                {this.renderMembersTab()}
              </TabPanel>
            </Tabs>
          </div>
        </div>
        <style jsx>
          {styles}
        </style>
      </PageLayout>
    )
  }
}
