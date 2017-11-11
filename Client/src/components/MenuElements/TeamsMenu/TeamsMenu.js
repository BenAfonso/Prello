import React from 'react'
import {connect} from 'react-redux'
import Icon from '../../UI/Icon/Icon'
import AddTeamMenu from './AddTeamMenu/AddTeamMenu'

@connect(store => {
  return {
    currentboard: store.currentBoard,
    board: store.currentBoard.board,
    currentUser: store.currentUser
  }
})

export default class TeamsMenu extends React.Component {
  render () {
    const { teams } = this.props.board
    return (
      <div className='host'>
        <div className='teammenu-title'>
          List of teams
        </div>
        <div className='teammenu-separator' />
        <div className='teammenu-teams'>
          <ul className='teams'>
            {
              teams.map((team, i) => (
                <div className='team' key={i}>
                  <div className='team-name'>{team.name}</div>
                  <div className='team-remove'><Icon color='#444' name='remove' fontSize='20px' /></div>
                </div>))
            }
          </ul>
        </div>
        <div className='teammenu-separator' />
        <AddTeamMenu board={this.props.board} />
        <style jsx>
          {`

          .teammenu-separator {
            content: '';
            height: 1px;
            padding: 0;
            background-color: #aaa;
            width: 90%;
            margin: 8px 0 8px 5%;
          }

          .teams {
            display: flex;
            flex-wrap: wrap;
            padding: 10px 5px
            max-height: 100px;
            overflow-y: auto;
          }

          .team {
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
        `}
        </style>
      </div>
    )
  }
}
