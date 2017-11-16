import React from 'react'
import { Link } from 'react-router-dom'
import styles from './SearchBar.styles'
import {connect} from 'react-redux'
import DropDown from '../UI/DropDown/DropDown'
import AvatarThumbnail from '../UI/AvatarThumbnail/AvatarThumbnail'
import { setBoardslist, setTeamslist, fetchMatchingUsers } from '../../store/actions'
import { subscribeToBoardslist } from '../../services/api'

@connect(store => {
  return {
    boardslist: store.boardslist,
    teamslist: store.teamslist
  }
})

export default class SearchBar extends React.Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  constructor (props) {
    super(props)
    this.state = {
      matchingBoards: [],
      matchingTeams: [],
      matchingCards: [],
      matchingUsers: []
    }
    this.onChange = this.onChange.bind(this)
    this.setMatchingBoards = this.setMatchingBoards.bind(this)
    this.setMatchingCards = this.setMatchingCards.bind(this)
    this.setMatchingUsers = this.setMatchingUsers.bind(this)
    this.setMatchingTeams = this.setMatchingTeams.bind(this)
    this.renderUser = this.renderUser.bind(this)
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

  setMatchingBoards (input) {
    const reg = new RegExp(input, 'i')
    let newMatchingBoards = []
    this.props.boardslist.boards.map(board => board.title.match(reg) ? newMatchingBoards.push(board) : null)
    this.setState({matchingBoards: newMatchingBoards.slice(0, 10)})
  }

  setMatchingCards (input) {
  }

  setMatchingUsers (input) {
    let newMatchingUsers = []
    fetchMatchingUsers(input).then(users => {
      users.map(user =>
        newMatchingUsers.push(user)
      )
      this.setState({matchingUsers: newMatchingUsers.slice(0, 10)})
    })
  }

  setMatchingTeams (input) {
    const reg = new RegExp(input, 'i')
    let newMatchingTeams = []
    this.props.teamslist.teams.map(team => team.name.match(reg) ? newMatchingTeams.push(team) : null)
    this.setState({matchingTeams: newMatchingTeams.slice(0, 10)})
  }

  renderBoard (board) {
  }

  renderCard (card) {
  }

  renderTeam (team) {
  }

  renderUser (user) {
    return (
      <div className='user'>
        <div className='user-thumbnail'>
          <AvatarThumbnail
            size='30px'
            fontSize=''
            thumbnail={user.picture}
            initials={this.getInitials(user.name)}
            bgColor={user.bgColor}
            color='black'
          />
        </div>
        <div className='user-infos'>
          <div className='user-name'>{user.name}</div>
          <div className='user-email'>{user.email}</div>
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }

  onChange () {
    const input = this.input.value
    if (input !== '') {
      this.setMatchingBoards(input)
      this.setMatchingCards(input)
      this.setMatchingUsers(input)
      this.setMatchingTeams(input)
    } else {
      this.setState({
        matchingBoards: [],
        matchingCards: [],
        matchingTeams: [],
        matchingUsers: []
      })
    }
  }

  handleFocus (event) {
    event.target.select()
  }

  getInitials (name) {
    const matches = name.match(/\b(\w)/g)
    const initials = matches.join('').toUpperCase()
    return initials
  }

  render () {
    const { matchingBoards, matchingCards, matchingTeams, matchingUsers } = this.state
    return (
      <div className='host'>
        <DropDown
          layout='custom'
          orientation='left'
          button={<input type='text' className='search-input' ref={(input) => { this.input = input }} onFocus={this.handleFocus} onChange={this.onChange} />}
        >
          <div className='search-content'>
            <ul className='search-column'>
              <li className='section'>
                <div className='section-title'>Boards</div>
                <ul className='section-elements'>
                  {
                    matchingBoards.length === 0
                      ? <li className='element'>
                        <div className='element-text'>Nothing! Yaaay</div>
                      </li>
                      : matchingBoards.map(board =>
                        <Link to={`/boards/${board._id}`}>
                          <li className='element' key={board._id}>
                            <div className='content'>
                              <div className='element-title'>{board.title}</div>
                            </div>
                            <div className='separator' />
                          </li>
                        </Link>
                      )
                  }
                </ul>
              </li>
              <li className='section'>
                <div className='section-title'>Cards</div>
                <ul className='section-elements'>
                  {
                    matchingCards.length === 0
                      ? <li className='element'>
                        <div className='element-text'>Nothing! Yaaay</div>
                      </li>
                      : matchingCards.map(card =>
                        <li className='element'>{this.renderCard(card)}</li>
                      )
                  }
                </ul>
              </li>
            </ul>
            <ul className='search-column'>
              <li className='section'>
                <div className='section-title'>Teams</div>
                <ul className='section-elements'>
                  {
                    matchingTeams.length === 0
                      ? <li className='element'>
                        <div className='element-text'>Nothing! Yaaay</div>
                      </li>
                      : matchingTeams.map(team =>
                        <Link to={`/teams/${team._id}`}>
                          <li className='element'>
                            <div className='content'>
                              <div className='element-title'>{team.name}</div>
                              <div className='element-text'>{team.users.length} {team.users.length > 1 ? 'members' : 'member'}</div>
                            </div>
                            <div className='separator' />
                          </li>
                        </Link>
                      )
                  }
                </ul>
              </li>
              <li className='section'>
                <div className='section-title'>Users</div>
                <ul className='section-elements'>
                  {
                    matchingUsers.length === 0
                      ? <li className='element'>
                        <div className='element-text'>Nothing! Yaaay</div>
                      </li>
                      : matchingUsers.map(user =>
                        <Link to={`/users/${user._id}/profile`}>
                          <li className='element'>{this.renderUser(user)}</li>
                        </Link>
                      )
                  }
                </ul>
              </li>
            </ul>
          </div>
        </DropDown>
        <style jsx>{styles}</style>
      </div>
    )
  }
}
