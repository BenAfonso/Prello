import React from 'react'
import {connect} from 'react-redux'
import Icon from '../../UI/Icon/Icon'
import { Link } from 'react-router-dom'
import AddTeamMenu from './AddTeamMenu/AddTeamMenu'
import AvatarThumbnail from '../../UI/AvatarThumbnail/AvatarThumbnail'
import { removeTeamFromBoard } from '../../../store/actions'

@connect(store => {
  return {
    currentboard: store.currentBoard,
    board: store.currentBoard.board,
    currentUser: store.currentUser
  }
})

export default class TeamsMenu extends React.Component {
  removeTeam (teamId) {
    removeTeamFromBoard(this.props.board._id, teamId)
  }

  getInitials (name) {
    const matches = name.match(/\b(\w)/g)
    const initials = matches.join('').toUpperCase()
    return initials
  }

  renderUserAvatar (user) {
    return (
      <div className='avatar'>
        <AvatarThumbnail
          size='30px'
          fontSize=''
          thumbnail={user.picture}
          initials={this.getInitials(user.name)}
          bgColor={user.bgColor}
          color='black'
        />
        <style jsx>
          {`
          .avatar {
            display: inline-block;
            padding: 5px 5px;
            cursor: pointer;
          }
        `}
        </style>
      </div>
    )
  }

  render () {
    const { teams } = this.props.board
    return (
      <div className='host'>
        <div className='teammenu-title'>
          List of teams
        </div>
        <div className='teammenu-teams'>
          <ul className='teams'>
            {
              teams.map((team, i) => (
                <li className='team' key={i}>
                  <div className='team-content'>
                    <Link to={`/teams/${team._id}`}>
                      <div className='team-name'>{team.name}</div>
                    </Link>
                    <div className='team-remove' onClick={() => this.removeTeam(team._id)}><Icon color='#444' name='remove' fontSize='20px' /></div>
                  </div>
                  <ul className='team-users'>
                    {
                      team.users.map((user, i) =>
                        <div className='user' key={i}>
                          {this.renderUserAvatar(user)}
                        </div>
                      )
                    }
                  </ul>
                  <div className='separator' />
                </li>
              ))
            }
          </ul>
        </div>
        <div className='add-team-button'>
          <AddTeamMenu board={this.props.board} />
        </div>
        <style jsx>
          {`

          .separator {
            content: '';
            height: 1px;
            background-color: #aaa;
            width: 100%;
            margin: 8px 0 8px 0;
          }

          .teams {
            display: flex;
            flex-wrap: wrap;
            padding: 10px 0;
            max-height: 800px;
            overflow-y: auto;
            font-weight: bold;
          }

          .team {
            width: 100%;
          }

          .team-content {
            width: 100%;
            display: flex;
            justify-content: space-between;
          }

          .team-users {
            display: flex;
            flex-wrap: wrap;
            padding: 10px 5px
            max-height: 100px;
            overflow-y: auto;
          }

          .user {
            display: inline-block;
            width: auto;
            height: auto;
          }

          .user-name {
            font-weight: normal;
            font-size: 12px;
          }

          .team-remove {
            cursor: pointer;
          }

          .add-team-button {
            padding: 10px 0;
          }
        `}
        </style>
      </div>
    )
  }
}
