import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Boardslist.styles'
import BoardThumbnail from '../BoardThumbnail/BoardThumbnail'
import Icon from '../UI/Icon/Icon'
import Button from '../UI/Button/Button'
import NewBoardForm from '../CreateMenu/Forms/NewBoardForm/NewBoardForm'
import {connect} from 'react-redux'
import { setBoardslist, setTeamslist } from '../../store/actions'
import { subscribeToBoardslist } from '../../services/api'

@connect(store => {
  return {
    boardslist: store.boardslist,
    teamslist: store.teamslist,
    currentUser: store.currentUser
  }
})

export default class Boardslist extends React.Component {
  constructor (props) {
    super(props)
    this.findBoard = this.findBoard.bind(this)
  }

  componentDidMount () {
    setBoardslist(this.props.dispatch).then(() => {
      subscribeToBoardslist('testID')
    }).catch(err => {
      console.error(err)
    })
    setTeamslist(this.props.dispatch).then(() => {
    }).catch(err => {
      console.error(err)
    })
  }

  findBoard (id) {
    const board = this.props.boardslist.boards.filter((l) => l._id === id)[0]
    return {
      board,
      index: this.props.boardslist.boards.indexOf(board)
    }
  }

  render () {
    return (<div className='host'>
      <div className='titleSection'>
        <Icon color='#dcdcda' name='window-restore' fontSize='40px' />
        <h1>My boards</h1>
      </div>

      <ul className='boards'>
        {
          this.props.boardslist.boards.map((board, i) => (

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
          <NewBoardForm
            self
            button={
              <div className='createBoard'>
                <div className='createBoard-title'>
                  Create a board...
                </div>
              </div>
            }
          />
        </li>
      </ul>

      <div className='titleSection'>
        <Icon color='#dcdcda' name='users' fontSize='40px' />
        <h1>My teams</h1>
      </div>
      <ul className='teams'>
        {
          this.props.teamslist.teams.map((team, i) => (
            <li key={i}>
              <div className='teamSection'>
                <div className='team-title'>
                  <h2>{team.name}</h2>
                  <div className='team-buttons'>
                    <div className='team-button'>
                      <Link to={`/teams/${team._id}`}>
                        <Button
                          bgColor='rgba(255,255,255,0.1)'
                          hoverBgColor='rgba(255,255,255,0.3)'
                          color='#dcdcda'
                          gradient
                          size='small'
                          onClick={null}>
                          <Icon color='#dcdcda' name='window-restore' fontSize='20px' />&nbsp;Boards
                        </Button>
                      </Link>
                    </div>
                    <div className='team-button'>
                      <Link to={`/teams/${team._id}/members`}>
                        <Button
                          bgColor='rgba(255,255,255,0.1)'
                          hoverBgColor='rgba(255,255,255,0.3)'
                          color='#dcdcda'
                          gradient
                          size='small'
                          onClick={null}>
                          <Icon color='#dcdcda' name='user' fontSize='20px' />&nbsp;Members
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <ul className='teamBoards'>
                  {
                    team.boards.map((teamBoard, i) => (
                      <li key={teamBoard._id}>
                        <Link to={`/boards/${teamBoard._id}`}>
                          <BoardThumbnail
                            id={teamBoard._id}
                            title={teamBoard.title}
                            index={i}
                            background={teamBoard.background}
                            isFavorite={teamBoard.isFavorite}
                          />
                        </Link>
                      </li>
                    ))
                  }
                  <li>
                    <NewBoardForm
                      currentTeam={team}
                      button={
                        <div className='createBoard'>
                          <div className='createBoard-title'>
                            Create a board...
                          </div>
                        </div>
                      }
                    />
                  </li>
                </ul>
              </div>
            </li>
          ))
        }
      </ul>
      <style jsx>{styles}</style>
    </div>
    )
  }
}
