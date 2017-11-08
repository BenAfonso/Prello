import React from 'react'
import styles from './Team.styles'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import BoardThumbnail from '../BoardThumbnail/BoardThumbnail'
import AvatarThumbnail from '../UI/AvatarThumbnail/AvatarThumbnail'
import Button from '../UI/Button/Button'
import Tabs from '../UI/Tabs/Tabs'
import Icon from '../UI/Icon/Icon'
import TabPanel from '../UI/TabPanel/TabPanel'
import MembersTab from './TabsContent/MembersTabs/MembersTab'

import { setTeam } from '../../store/actions'

@connect(store => {
  return {
    currentTeam: store.currentTeam,
    team: store.currentTeam.team,
    currentUser: store.currentUser
  }
})

export default class Team extends React.Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  constructor (props) {
    super(props)
    let tabIndex
    this.props.tab
      ? this.props.tab === 'members'
        ? tabIndex = 1
        : tabIndex = 2
      : tabIndex = 0
    this.state = {
      tabIndex: tabIndex
    }
  }

  componentDidMount () {
    setTeam(this.props.dispatch, this.props._id).then(team => {
      // subscribeToTeam(team)
    }).catch(err => {
      console.error(err)
    })
  }

  componentWillUnmount () {
    // resetTeam()
  }

  render () {
    const team = this.props.team
    const currentUser = this.props.currentUser
    console.log('team', team)

    return (
      <div className='host'>
        <div className='teamProfileSection'>
          <div className='teamProfileBlock'>
            <div className='team-avatar'>
              <AvatarThumbnail
                size='100px'
                thumbnail={team.picture === '' ? 'https://randomuser.me/api/portraits/men/33.jpg' : team.picture}
              />
            </div>
            <div className='team-infos'>
              <div className='team-name'>{team.name}</div>
              <div className='team-privacy'><Icon color='white' name='lock' fontSize='15px' />&nbsp;({team.visibility})</div>
              <div className='team-edit'>
                <Button
                  bgColor='#eee'
                  color='#444'
                  hoverBgColor='#ccc'
                  block
                  shadow
                >
                  <Icon color='#000' name='edit' fontSize='20px' /> Edit Team Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className='tabsSection'>
          <Tabs selected={this.state.tabIndex}>
            <TabPanel label="Boards">
              <div>
                <ul className='boards'>
                  {
                    this.props.team.boards.map((board, i) => (

                      <li key={board._id}>
                        <Link to={`/boards/${board._id}`}>
                          <BoardThumbnail
                            id={board._id}
                            title={board.title}
                            index={i}
                            background={board.background}
                            isFavorite={board.isFavorite}
                          />
                        </Link>
                      </li>
                    ))
                  }
                  <li>
                    <div className='createBoard'>
                      <div className='createBoard-title'>
                        Create a board...
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </TabPanel>
            <TabPanel label="Members">
              <div className='members'>
                <MembersTab
                  currentUserId={currentUser._id}
                />
              </div>
            </TabPanel>
            <TabPanel label="Settings">
              <div>
                This is my tab 3 contents!
              </div>
            </TabPanel>
          </Tabs>
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}
