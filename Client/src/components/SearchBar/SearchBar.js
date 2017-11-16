import React from 'react'
import { Link } from 'react-router-dom'
import styles from './SearchBar.styles'
import {connect} from 'react-redux'
import DropDown from '../UI/DropDown/DropDown'
import AvatarThumbnail from '../UI/AvatarThumbnail/AvatarThumbnail'
import Icon from '../UI/Icon/Icon'
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
      emptySearch: true,
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
    const reg = new RegExp(input, 'i')
    let newMatchingCards = []
    this.props.boardslist.boards.map(board => {
      board.lists.map(list => {
        list.cards.map(card => card.text.match(reg) ? newMatchingCards.push({card: card, board: board, list: list}) : null)
        this.setState({matchingCards: newMatchingCards.slice(0, 10)})
        return null
      })
      return null
    })
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
      this.setState({emptySearch: false})
      this.setMatchingBoards(input)
      this.setMatchingCards(input)
      this.setMatchingUsers(input)
      this.setMatchingTeams(input)
    } else {
      this.setState({
        emptySearch: true,
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
            {
              this.state.emptySearch
                ? null
                : <div>
                  <ul className='search-column'>
                    <li className='section'>
                      <div className='section-title'>Boards</div>
                      <ul className='section-elements'>
                        {
                          matchingBoards.length === 0
                            ? <li className='element'>
                              <div className='element-nothing'>We found nothing at all there..</div>
                            </li>
                            : matchingBoards.map(board =>
                              <Link to={`/boards/${board._id}`} key={board._id}>
                                <li className='element'>
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
                              <div className='element-nothing'>We found nothing at all there..</div>
                            </li>
                            : matchingCards.map(card =>
                              <li className='element' key={card.card._id}>
                                <div className='content'>
                                  <div className='element-title'>{card.card.text}</div>
                                  <div className='element-text'>in <span className='text-emphasis'>{card.list.name}</span> on <span className='text-emphasis'>{card.board.title}</span></div>
                                  <div className='element-icons'>
                                    <div className='icon'>
                                      <div className='icon-text'>{card.card.collaborators.length}</div>
                                      <Icon fontSize='13px' name='users' color='#999'/>
                                    </div>
                                  </div>
                                </div>
                                <div className='separator' />
                              </li>
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
                              <div className='element-nothing'>We found nothing at all there..</div>
                            </li>
                            : matchingTeams.map(team =>
                              <Link to={`/teams/${team._id}`} key={team._id}>
                                <li className='element'>
                                  <div className='content'>
                                    <div className='element-title'>{team.name}</div>
                                    <div className='element-icons'>
                                      <div className='icon'>
                                        <div className='icon-text'>{team.users.length}</div>
                                        <Icon fontSize='13px' name='users' color='#999'/>
                                      </div>
                                      <div className='icon'>
                                        <div className='icon-text'>{team.boards.length}</div>
                                        <Icon fontSize='13px' name='window-restore' color='#999'/>
                                      </div>
                                    </div>
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
                              <div className='element-nothing'>We found nothing at all there..</div>
                            </li>
                            : matchingUsers.map(user =>
                              <Link to={`/users/${user._id}/profile`} key={user._id}>
                                <li className='element'>{this.renderUser(user)}</li>
                              </Link>
                            )
                        }
                      </ul>
                    </li>
                  </ul>
                </div>
            }
          </div>
        </DropDown>
        <style jsx>{styles}</style>
      </div>
    )
  }
}
