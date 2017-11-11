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
import NewBoardForm from '../CreateMenu/Forms/NewBoardForm/NewBoardForm'

import { setTeam, updateTeam } from '../../store/actions'

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
      tabIndex: tabIndex,
      editFormDisplayed: false,
      inputName: this.props.team.name,
      selected: this.props.team.visibility
    }

    this.displayEditForm = this.displayEditForm.bind(this)
    this.undisplayEditForm = this.undisplayEditForm.bind(this)
    this.updateTeam = this.updateTeam.bind(this)
  }

  componentDidMount () {
    setTeam(this.props.dispatch, this.props._id).then(team => {
      // subscribeToTeam(team)
    }).catch(err => {
      console.error(err)
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.team !== nextProps.team) {
      this.setState({
        inputName: nextProps.team.name,
        selected: nextProps.team.visibility
      })
    }
  }

  displayEditForm () {
    this.setState({editFormDisplayed: true})
  }

  undisplayEditForm () {
    this.setState({editFormDisplayed: false})
  }

  updateTeam () {
    if (this.name.value !== '') {
      updateTeam(this.props.team._id, { name: this.name.value, visibility: this.visibility.value })
      this.setState({editFormDisplayed: false})
    }
  }

  renderTeamProfile (team) {
    return (
      <div className='team-profile'>
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
              onClick={this.displayEditForm}
            >
              <Icon color='#000' name='edit' fontSize='20px' /> Edit Team Profile
            </Button>
          </div>
        </div>
        <style jsx>{`
        .team-avatar {
          display: inline-block;
        }
        
        .team-infos {
          display: inline-block;
          padding-left: 20px;
        }
        
        .team-name {
          display: inline-block;
          font-size: 30px;
          font-weight: bold;
          padding-bottom: 15px;
        }
        
        .team-privacy {
          display: inline-block;
          font-size: 15px;
          padding-left: 20px;
          padding-bottom: 15px;  
        }
        
        `}</style>
      </div>
    )
  }

  renderEditForm (team) {
    return (
      <div className='edit-form'>
        <div className='team-avatar'>
          <AvatarThumbnail
            size='100px'
            thumbnail={team.picture === '' ? 'https://randomuser.me/api/portraits/men/33.jpg' : team.picture}
          />
        </div>
        <div className='team-infos'>
          <div className='team-title'>Name</div>
          <input ref={(name) => { this.name = name }} defaultValue={this.state.inputName} />
          <div className='team-title'>Visibility</div>
          <select ref={(select) => { this.visibility = select }} defaultValue={this.state.selected}>
            <option value='Public'>Public</option>
            <option value='Private'>Private</option>
          </select>
          <div className='team-buttons'>
            <Button
              bgColor='#5AAC44'
              color='white'
              shadow
              onClick={this.updateTeam}
            >
              Save
            </Button>
            <Button
              bgColor='#eee'
              color='#444'
              hoverBgColor='#ccc'
              shadow
              onClick={this.undisplayEditForm}
            >
              Cancel
            </Button>
          </div>
        </div>
        <style jsx>{`
        input {
          width: 100%;
          padding: 8px;
          border-radius: 3px;
        }

        select {
          width: 100%;
          border-radius: 3px;
          padding: 8px;
        }

        .edit-form {
          display: flex;
          align-items: center;
        }

        .team-avatar {
          display: inline-block;
        }
        
        .team-infos {
          display: inline-block;
          padding-left: 20px;
        }

        .team-title {
          font-weight: bold;
          padding-top: 10px;
          padding-bottom: 5px;          
        }

        .team-buttons {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
        }
        `}</style>
      </div>
    )
  }

  render () {
    const team = this.props.team
    const currentUser = this.props.currentUser

    return (
      <div className='host'>
        <div className='teamProfileSection'>
          <div className='teamProfileBlock'>
            {
              this.state.editFormDisplayed
                ? this.renderEditForm(team)
                : this.renderTeamProfile(team)
            }
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
                    <NewBoardForm currentTeam={team} teams={currentUser.teams} />
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
