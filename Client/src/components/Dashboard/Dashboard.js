import PageLayout from '../../layouts/page'
import React from 'react'
import styles from './Dashboard.styles'
import { connect } from 'react-redux'
import Tabs from '../../components/UI/Tabs/Tabs'
import TabPanel from '../../components/UI/TabPanel/TabPanel'
import Icon from '../../components/UI/Icon/Icon'
import ChartDoneCardsMembers from './Charts/ChartsMembers/ChartDoneCardsMembers'
import ChartDoneCardsResponsibles from './Charts/ChartsResponsibles/ChartDoneCardsResponsibles'
import ChartActiveMembers from './Charts/ChartsOverview/ChartActiveMembers'
import ChartCardsPerList from './Charts/ChartsLists/ChartCardsPerList'
import { setAnalyticsBoard } from '../../store/actions'

@connect(store => {
  return {
    board: store.analytics.board
  }
})
export default class Dashboard extends React.Component {
  componentDidMount () {
    setAnalyticsBoard(this.props._id).then(board => {
    }).catch(err => {
      console.error(err)
    })
  }

  renderOverviewTab () {
    return (
      <div className='profileTab'>
        <div className='teamPart'>
          <div className='teamLine'>
            <Icon name='users'
              fontSize='24px'
              color='white'
              style={{marginLeft: '2%', marginRight: '20px'}}/>
            <h2 className='teamsTitle'>Cards done by members</h2>
          </div>
          <hr className='titleAndContentSeparator'/>
          <ul>
            <ChartActiveMembers data={this.props.board} />
            <ChartCardsPerList data={this.props.board.lists} />
          </ul>
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
            <h2 className='teamsTitle'>Cards done by members</h2>
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
            <h2 className='activityTitle'>Active members</h2>
          </div>
          <hr className='titleAndContentSeparator'/>
          <ul>
            <ChartDoneCardsMembers />
          </ul>
        </div>
        <div className = 'activityDiv'>
          <div className='activityLine'>
            <Icon name='users'
              fontSize='24px'
              color='white'
              style={{marginLeft: '2%', marginRight: '20px'}}/>
            <h2 className='activityTitle'>Lists</h2>
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

  renderListsTab () {
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
          <div className='profileTab'>
            <div><ChartActiveMembers data={this.props.board}/></div>
            <div><ChartDoneCardsResponsibles /></div>
          </div>
          <div className='profileTab'>
            <div><ChartActiveMembers data={this.props.board}/></div>
            <div><ChartDoneCardsMembers /></div>
          </div>
        </div>
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }

  render () {
    if (this.props.board.title) {
      return (<PageLayout>
        <div className='host'>
          <h1>Analytics dashboard for board {this.props.board.title}</h1>
          <div className='tabSection'>
            <Tabs selected='0'>
              <TabPanel label='Overview'>
                {this.renderOverviewTab()}
              </TabPanel>
              <TabPanel label='Members'>
                {this.renderMembersTab()}
              </TabPanel>
              <TabPanel label='Lists'>
                {this.renderListsTab()}
              </TabPanel>
            </Tabs>
          </div>
          <style jsx>
            {styles}
          </style>
        </div>
      </PageLayout>)
    } else {
      return null
    }
  }
}
