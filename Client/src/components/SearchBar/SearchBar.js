import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import styles from './SearchBar.styles'
import {connect} from 'react-redux'
import DropDown from '../UI/DropDown/DropDown'
import AvatarThumbnail from '../UI/AvatarThumbnail/AvatarThumbnail'
import Icon from '../UI/Icon/Icon'
import { fetchMatchingUsers } from '../../store/actions'

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
    this.redirectToCard = this.redirectToCard.bind(this)
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
        list.cards.map(card => card.text ? card.text.match(reg) ? newMatchingCards.push({card: card, board: board, list: list}) : null : '')
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
  redirectToCard (boardId, cardId) {
    this.setState({redirectTo: `/boards/${boardId}/cards/${cardId}`})
  }

  handleFocus (event) {
    event.target.select()
  }

  getInitials (name) {
    const matches = name.match(/\b(\w)/g)
    const initials = matches.join('').toUpperCase()
    return initials
  }

  getLateCards (cards) {
    const now = Date.now()
    let late = 0
    cards.map(card => {
      if (card.dueDate) {
        const dueDate = new Date(card.dueDate)
        late += now >= dueDate && !card.validated ? 1 : 0
      }
      return null
    })
    return late
  }

  getDueDateColor (validated, cardDueDate) {
    const dueDate = new Date(cardDueDate)
    const dueDateMinus24 = dueDate.getTime() - (60 * 60 * 24 * 1000)
    const dueDatePlus24 = dueDate.getTime() + (60 * 60 * 24 * 1000)
    const now = Date.now()
    if (validated) return '#5AAC44'
    else if (now >= dueDateMinus24 && now < dueDate) return 'rgba(220,200,0,1)'
    else if (now < dueDatePlus24 && now >= dueDate) return 'rgba(200,0,0,1)'
    else if (now >= dueDatePlus24) return 'rgba(200,0,0,0.3)'
  }

  getDueDateTextColor (validated, cardDueDate) {
    const dueDate = new Date(cardDueDate)
    const dueDateMinus24 = dueDate.getTime() - (60 * 60 * 24 * 1000)
    const now = Date.now()
    if (validated || now >= dueDateMinus24) return 'white'
  }

  getFormattedDueDate (cardDueDate) {
    const dueDate = new Date(cardDueDate)
    if (dueDate !== null) {
      const day = (dueDate.getDate() < 10 ? '0' : '') + dueDate.getDate()
      const month = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ')[dueDate.getMonth()]
      const formattedDate = month + ' ' + day
      return formattedDate
    }
  }

  render () {
    if (this.state.redirectTo) {
      return (<Redirect to={this.state.redirectTo} />)
    }
    const { matchingBoards, matchingCards, matchingTeams, matchingUsers } = this.state
    let cardNumber = []
    let lateCards = []
    return (
      <div className='host'>
        <DropDown
          layout='custom'
          orientation='left'
          input={
            <div className='input-block'>
              <div className='input-icon'>
                <Icon fontSize='20px' color='' name='search' />
              </div>
              <input type='text' className='search-input' placeholder='Search...' ref={(input) => { this.input = input }} onFocus={this.handleFocus} onChange={this.onChange} />
            </div>
          }
        >
          <div className='search-content'>
            {
              this.state.emptySearch
                ? null
                : <div>
                  <ul className='search-column'>
                    <li className='section'>
                      <div className='section-title'>Boards</div>
                      <ul className='section-elements' >
                        {
                          matchingBoards.length === 0
                            ? <li className='element'>
                              <div className='element-nothing'>We found nothing at all there..</div>
                            </li>
                            : matchingBoards.map(board =>
                              <Link to={`/boards/${board._id}`} key={board._id}>
                                <li className='element' onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                                  <div className='content'>
                                    <div className='content-title'>
                                      <div className='content-title-text' style={{color: board.background}}>{board.title}</div>
                                      <div className='content-title-info'>by <span className='text-emphasis'>{board.owner.name}</span></div>
                                    </div>
                                    <div className='element-icons'>
                                      <div className='icons-section left'>
                                        {
                                          board.lists.map(list => {
                                            lateCards[board._id]
                                              ? lateCards[board._id] += this.getLateCards(list.cards)
                                              : lateCards[board._id] = this.getLateCards(list.cards)
                                            return undefined
                                          })
                                        }
                                        {
                                          lateCards[board._id] === 0
                                            ? null
                                            : <div className='icon icon-late'>
                                              <div className='icon-text'>{lateCards[board._id]}</div>
                                              <Icon fontSize='13px' name='clock-o' color='' />
                                            </div>
                                        }
                                      </div>
                                      <div className='icons-section right'>
                                        <div className='icon' style={{ color: board.background }}>
                                          <div className='icon-text'>{board.collaborators.length}</div>
                                          <Icon fontSize='13px' name='user' color=''/>
                                        </div>
                                        <div className='icon' style={{ color: board.background }}>
                                          <div className='icon-text'>{board.teams.length}</div>
                                          <Icon fontSize='13px' name='users' color=''/>
                                        </div>
                                        <div className='icon' style={{ color: board.background }}>
                                          {
                                            board.lists.map(list => {
                                              cardNumber[board._id]
                                                ? cardNumber[board._id] += list.cards.length
                                                : cardNumber[board._id] = list.cards.length
                                              return undefined
                                            })
                                          }
                                          <div className='icon-text'>{cardNumber[board._id]}</div>
                                          <Icon fontSize='13px' name='list-alt' color=''/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='separator' />
                                </li>
                              </Link>
                            )
                        }
                      </ul>
                      <div className='section-blur' />
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
                              <li className='element' key={card.card._id} onClick={() => this.redirectToCard(card.board._id, card.card._id)}>
                                <div className='content'>
                                  <div className='content-title'>
                                    <div className='content-title-text'>{card.card.text}</div>
                                    {
                                      card.card.dueDate
                                        ? <div className='content-title-icon dueDate' style={{background: this.getDueDateColor(card.card.validated, card.card.dueDate)}}>
                                          <span className='icon-text' style={{
                                            color: this.getDueDateTextColor(card.card.validated, card.card.dueDate)
                                          }}>{this.getFormattedDueDate(card.card.dueDate)}</span>
                                          <span className='icon-icon' style={{color: this.getDueDateTextColor(card.card.validated, card.card.dueDate)}}><Icon fontSize='16px' name='clock-o' color='' /></span>
                                        </div>
                                        : null
                                    }
                                  </div>
                                  <div className='element-text'>in <span className='text-emphasis'>{card.list.name}</span> on <span className='text-emphasis' style={{color: card.board.background}}>{card.board.title}</span></div>
                                  <div className='element-icons'>
                                    <div className='icons-section left'>
                                      <div className='icon' style={{ color: '#999' }}>
                                        <div className='icon-text'>{card.card.checklists.length}</div>
                                        <Icon fontSize='13px' name='list' color=''/>
                                      </div>
                                      <div className='icon' style={{ color: '#999' }}>
                                        <div className='icon-text'>{card.card.attachments.length}</div>
                                        <Icon fontSize='13px' name='file' color=''/>
                                      </div>
                                    </div>
                                    <div className='icons-section right'>
                                      <div className='icon' style={{ color: '#999' }}>
                                        <div className='icon-text'>{card.card.collaborators.length}</div>
                                        <Icon fontSize='13px' name='user' color=''/>
                                      </div>
                                      <div className='icon' style={{ color: '#999' }}>
                                        <div className='icon-text'>{card.card.comments.length}</div>
                                        <Icon fontSize='13px' name='comment' color=''/>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='separator' />
                              </li>
                            )
                        }
                      </ul>
                      <div className='section-blur' />
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
                                    <div className='content-title'>
                                      <div className='content-title-text'>{team.name}</div>
                                    </div>
                                    <div className='element-icons'>
                                      <div className='icons-section left'>
                                      </div>
                                      <div className='icons-section right'>
                                        <div className='icon' style={{ color: '#999' }}>
                                          <div className='icon-text'>{team.users.length}</div>
                                          <Icon fontSize='13px' name='users' color=''/>
                                        </div>
                                        <div className='icon' style={{ color: '#999' }}>
                                          <div className='icon-text'>{team.boards.length}</div>
                                          <Icon fontSize='13px' name='window-restore' color=''/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='separator' />
                                </li>
                              </Link>
                            )
                        }
                      </ul>
                      <div className='section-blur' />
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
                                <li className='element'>
                                  {this.renderUser(user)}
                                  <div className='separator' />
                                </li>
                              </Link>
                            )
                        }
                      </ul>
                      <div className='section-blur' />
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
