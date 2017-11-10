import PageLayout from '../../layouts/page'
import React from 'react'
import styles from './Dashboard.styles'
import { connect } from 'react-redux'
import Tabs from '../../components/UI/Tabs/Tabs'
import TabPanel from '../../components/UI/TabPanel/TabPanel'
import Icon from '../../components/UI/Icon/Icon'
import ChartDoneCardsMembers from '../../components/Charts/ChartsMembers/ChartDoneCardsMembers'
import ChartDoneCardsResponsibles from '../../components/Charts/ChartsResponsibles/ChartDoneCardsResponsibles'
import ChartActiveMembers from '../../components/Charts/ChartsOverview/ChartActiveMembers'
import { setBoard } from '../../store/actions'
import { subscribeToBoard } from '../../services/api'

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board
  }
})
export default class Dashboard extends React.Component {
  componentDidMount () {
    setBoard(this.props.dispatch, this.props._id).then(board => {
      subscribeToBoard(board)
    }).catch(err => {
      console.error(err)
    })
  }
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
            <ChartActiveMembers data={this.props.board} />
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
        <div className = 'activityDiv'>
          <div className='activityLine'>
            <Icon name='users'
              fontSize='24px'
              color='white'
              style={{marginLeft: '2%', marginRight: '20px'}}/>
            <span className='activityTitle'>Lists</span>
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
    console.log(this.props.board)
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
              <TabPanel label='Lists'>
                {this.renderListsTab()}
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
