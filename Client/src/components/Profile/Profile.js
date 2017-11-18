import React from 'react'
import { connect } from 'react-redux'
import Button from '../../components/UI/Button/Button'
import Icon from '../../components/UI/Icon/Icon'
import styles from './profile.style'
import { updateProfile } from '../../services/User.services'
import { updateProfileAction, updateProfilePageAction, setFetchedUser, setFetchedUserTeams, setFetchedUserBoards, setFetchedUserHistory } from '../../store/actions'
import { updateProfileLocalStorage } from '../../services/Authentication.services'
import { displayNotification } from '../../services/Notification.service'
import AvatarThumbnail from '../../components/UI/AvatarThumbnail/AvatarThumbnail'
import BoardThumbnail from '../../components/BoardThumbnail/BoardThumbnail'
import { Link } from 'react-router-dom'
import Tabs from '../../components/UI/Tabs/Tabs'
import TabPanel from '../../components/UI/TabPanel/TabPanel'
import TeamListElement from '../../components/UI/TeamListElement/TeamListElement'
import ModificationListElement from '../../components/UI/ModificationListElement/ModificationListElement'
import NewBoardForm from '../../components/CreateMenu/Forms/NewBoardForm/NewBoardForm'
import NewTeamForm from '../../components/CreateMenu/Forms/NewTeamForm/NewTeamForm'
import InfiniteScroll from 'react-infinite-scroller'

@connect(store => {
  return {
    currentUser: store.currentUser,
    teamslist: store.teamslist,
    boardslist: store.boardslist,
    userFetched: store.userFetched.user
  }
})
export default class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      displayModifyProfileForm: false,
      avatarUrl: '',
      displayNewPasswordForm: false,
      hasMoreItems: true,
      modifications: [],
      start: -5,
      response: undefined
    }

    this.renderModifyProfileForm = this.renderModifyProfileForm.bind(this)
    this.displayModifyProfileForm = this.displayModifyProfileForm.bind(this)
    this.hideModifyProfileForm = this.hideModifyProfileForm.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
    this.renderUserAvatar = this.renderUserAvatar.bind(this)
    this.renderProfileTab = this.renderProfileTab.bind(this)
    this.renderBoardsTab = this.renderBoardsTab.bind(this)
    this.onAvatarInputChange = this.onAvatarInputChange.bind(this)
    this.renderOptionsTab = this.renderOptionsTab.bind(this)
    this.displayNewPasswordForm = this.displayNewPasswordForm.bind(this)
    this.hideNewPasswordForm = this.hideNewPasswordForm.bind(this)
    this.renderNewPasswordForm = this.renderNewPasswordForm.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.currentUserIsInTeam = this.currentUserIsInTeam.bind(this)
    this.currentUserIsRelatedToBoard = this.currentUserIsRelatedToBoard.bind(this)
    this.loadMoreModifs = this.loadMoreModifs.bind(this)
  }

  componentDidMount () {
    setFetchedUser(this.props._id).then(() => {
    }).catch(err => {
      console.error(err)
    })
    setFetchedUserTeams(this.props._id).then(() => {
    }).catch(err => {
      console.error(err)
    })
    setFetchedUserBoards(this.props._id).then(() => {
    }).catch(err => {
      console.error(err)
    })
    this.loadMoreModifs()
  }

  /* componentWillReceiveProps (nextProps) {
    if (this.props._id !== nextProps._id) {
      setFetchedUser(this.props._id).then(() => {
      }).catch(err => {
        console.error(err)
      })
      setFetchedUserTeams(this.props._id).then(() => {
      }).catch(err => {
        console.error(err)
      })
      setFetchedUserBoards(this.props._id).then(() => {
      }).catch(err => {
        console.error(err)
      })
    }
  } */

  displayModifyProfileForm () {
    this.setState({ displayModifyProfileForm: true })
  }

  hideModifyProfileForm () {
    this.setState({ displayModifyProfileForm: false })
  }

  displayNewPasswordForm () {
    this.setState({ displayNewPasswordForm: true })
  }

  hideNewPasswordForm () {
    this.setState({ displayNewPasswordForm: false })
  }

  onAvatarInputChange () {
    this.setState({ avatarUrl: this.avatarInput.value })
  }

  updateProfile () {
    let name = this.nameInput.value
    let username = this.usernameInput.value
    let picture = this.avatarInput.value
    let bio = this.biopicInput.value
    if (name.length > 0 && username.length > 0) {
      const datas = {
        name,
        username,
        picture,
        bio
      }
      updateProfile(datas)
        .then(updatedUser => {
          updateProfileLocalStorage(updatedUser)
          updateProfileAction(updatedUser)
          updateProfilePageAction(updatedUser)
        })
      this.hideModifyProfileForm()
      displayNotification({type: 'success', title: 'Profile edited', content: 'Your profile has been well edited !'})
    } else if (name.length === 0) {
      displayNotification({type: 'error', title: 'Error', content: 'Full name is mandatory !'})
    } else if (username.length === 0) {
      displayNotification({type: 'error', title: 'Error', content: 'Username is mandatory !'})
    }
  }

  updatePassword () {
    if (this.newPasswordInput.value && this.confirmPasswordInput.value && this.newPasswordInput.value === this.confirmPasswordInput.value) {
      const password = this.newPasswordInput.value
      updateProfile({ password: password })
        .then(updatedUser => {
        })
      this.hideNewPasswordForm()
    } else {
      displayNotification({type: 'error', title: 'Error', content: 'The new password and the confirmation must match !'})
    }
  }

  getInitials (name) {
    const matches = name.match(/\b(\w)/g)
    const initials = matches.join('').toUpperCase()
    return initials
  }

  currentUserIsInTeam (team) {
    let isMember = team.users.filter(user => user._id === this.props.currentUser._id)[0] !== undefined
    let isAdmin = team.admins.filter(admin => admin._id === this.props.currentUser._id)[0] !== undefined
    return isMember || isAdmin
  }

  currentUserIsRelatedToBoard (board, teamsPopulated) {
    let isOwner = board.owner._id === this.props.currentUser._id
    let isCollaborator = board.collaborators.filter(collab => collab._id === this.props.currentUser._id)[0] !== undefined
    let isInTeam = board.teams.filter(team => (this.currentUserIsInTeam(team))).filter(result => result)[0] !== undefined
    return isOwner || isCollaborator || isInTeam
  }

  loadMoreModifs () {
    const start = this.state.start + 5
    setFetchedUserHistory(this.props._id, 5, start).then(newInfos => { // Take 5 elements, Skip page * 5 elements
      if (newInfos.length > 0) {
        let newHistory = this.state.modifications.concat(newInfos)
        // setFetchedUserHistoryLocally(newHistory)
        this.setState({ modifications: newHistory, start })
      } else {
        this.setState({ hasMoreItems: false })
      }
      this.setState({response: 'finished'})
    })
  }

  renderModifyProfileForm () {
    return (
      <form className='profileForm'>
        <div className='formDiv'>
          <label>Full name : </label>
          <input className='input' defaultValue={this.props.userFetched.name} ref={e => { this.nameInput = e }}/>
        </div>
        <div className='formDiv'>
          <label>User name : </label>
          <input className='input' defaultValue={this.props.userFetched.username} ref={e => { this.usernameInput = e }}/>
        </div>
        <div className='formDiv'>
          <label>Avatar URL : </label>
          <input className='input' defaultValue={this.props.userFetched.picture} ref={e => { this.avatarInput = e }} onChange={this.onAvatarInputChange}/>
          <div className='avatarPreview'>
            <AvatarThumbnail
              size='50px'
              fontSize='30px'
              thumbnail={this.state.avatarUrl === '' ? this.props.userFetched.picture : this.state.avatarUrl }
              initials={this.getInitials(this.props.userFetched.name)}
              bgColor={this.props.userFetched.bgColor}
              color='black'
            />
          </div>
        </div>
        <div className='formDiv'>
          <label>Bio : (optional)</label>
          <textarea className='textarea' defaultValue={this.props.userFetched.bio} ref={e => { this.biopicInput = e }} rows='5'/>
        </div>
        <div className='buttons'>
          <span className='saveButton'>
            <Button bgColor='#5AAC44'
              onClick={this.updateProfile}
              hoverBgColor='#07a801'
              fontSize='12px'
              bold
              shadow
              color='white'><Icon name='check' fontSize='10px' style={{marginRight: '5px'}} color='white'/>Save
            </Button>
          </span>
          <span className='cancelButton'>
            <Button onClick={this.hideModifyProfileForm}
              bgColor='#E2E4E6'
              hoverBgColor='#d6d6d6'
              color='black'
              fontSize='12px'
              bold
              shadow><Icon name='ban' fontSize='10px' style={{marginRight: '5px'}}/>Cancel
            </Button>
          </span>
        </div>
        <style jsx>{styles}</style>
      </form>
    )
  }

  renderNewPasswordForm () {
    return (
      <form className='newPasswordform'>
        <div className='formDiv'>
          <label className='passwordLabel'>New password :</label>
          <input className='passwordInput' type='password' required ref={e => { this.newPasswordInput = e }}/>
        </div>
        <div className='formDiv'>
          <label className='passwordLabel'>Confirm new password :</label>
          <input className='passwordInput' type='password' required ref={e => { this.confirmPasswordInput = e }}/>
        </div>
        <div className='newPasswordButtons'>
          <span className='saveButton'>
            <Button bgColor='#5AAC44'
              onClick={this.updatePassword}
              hoverBgColor='#07a801'
              fontSize='12px'
              bold
              shadow
              color='white'><Icon name='check' fontSize='10px' style={{marginRight: '5px'}} color='white'/>Confirm
            </Button>
          </span>
          <Button onClick={this.hideNewPasswordForm}
            bgColor='#E2E4E6'
            hoverBgColor='#d6d6d6'
            color='black'
            fontSize='12px'
            bold
            shadow><Icon name='ban' fontSize='10px' style={{marginRight: '5px'}}/>Cancel
          </Button>
        </div>
        <style jsx>{styles}</style>
      </form>
    )
  }

  renderProfileTab () {
    const { modifications } = this.state
    let modificationsToRender = modifications.filter(modif => modif.board !== null).map(modif => (
      <div className='modificationElement' key={modif._id}>
        <ModificationListElement modification={modif}/>
        <Link to={`/boards/${modif.board._id}`}><span className='modifBoardTitle'
          style={{color: 'black', textDecoration: 'underline', marginLeft: '20px'}}>Go to board</span></Link>
        <hr className='separator'/>
      </div>
    ))
    return (
      <div className='profileTab'>
        <div className='teamPart'>
          <div className='teamLine'>
            <Icon name='users'
              fontSize='24px'
              color='white'
              style={{marginLeft: '2%', marginRight: '20px'}}/>
            <span className='teamsTitle'>Teams</span>
          </div>
          <hr className='titleAndContentSeparator'/>
          <ul className='teamsList'>
            {this.props.userFetched.teams.map(team => (
              this.currentUserIsInTeam(team) || team.visibility === 'Public'
                ? <li key={team._id} className='teamLi'><Link to={`/teams/${team._id}`}><TeamListElement team={team}/></Link></li>
                : null
            ))}
            {this.props._id === this.props.currentUser._id
              ? <li className='newBoardButton'>
                <NewTeamForm
                  self
                  comingFromProfilePage
                  button={
                    <div className='createElement'>
                      <div className='createElement-title'>
                        Create a team
                      </div>
                    </div>
                  }
                />
              </li>
              : ''
            }
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
          <div className='activityFeedList'>
            <InfiniteScroll
              hasMore={this.state.hasMoreItems}
              useWindow={false}
              threshold={5}
              loadMore={this.loadMoreModifs}>
              {modificationsToRender}
            </InfiniteScroll>
          </div>
        </div>
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }

  renderOptionsTab () {
    return (
      <div className='optionsTab'>
        {this.props.currentUser._id === this.props._id && this.props.userFetched.provider !== 'google'
          ? !this.state.displayNewPasswordForm
            ? <span className='linkText' /* onClick={this.displayNewPasswordForm */>Change password</span>
            : this.renderNewPasswordForm()
          : ''
        }
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }

  renderUserAvatar (user) {
    return (
      <div className='avatar' onClick={this.onAvatarClick}>
        <AvatarThumbnail
          size='150px'
          fontSize='80px'
          thumbnail={user.picture}
          initials={this.getInitials(user.name.length === 0 ? 'a' : user.name)} // Little cheat here as render begins before promises finish in componentDidMount
          bgColor={user.bgColor}
          color='black'
        />
        <style jsx>{styles}</style>
      </div>
    )
  }

  renderBoardsTab () {
    return (
      <div className='boardsTab'>
        <div className='boardsLine'>
          <Icon name='bars'
            fontSize='24px'
            color='white'
            style={{marginLeft: '2%', marginRight: '20px'}}/>
          <span className='boardsTitle'>Boards</span>
        </div>
        <hr className='titleAndContentSeparator'/>
        <ul className='boardsList'>
          {this.props.userFetched.boards.map(board => (
            this.currentUserIsRelatedToBoard(board)
              ? <li key={board._id} className='boardLi'>
                <Link to={`/boards/${board._id}`}>
                  <BoardThumbnail index={0} id={board._id} title={board.title} background={board.background}/>
                </Link>
              </li>
              : null
          ))}
          {this.props._id === this.props.currentUser._id
            ? <li className='newBoardButton'>
              <NewBoardForm
                self
                comingFromProfilePage
                button={
                  <div className='createElement'>
                    <div className='createElement-title'>
                      Create a board
                    </div>
                  </div>
                }
              />
            </li>
            : ''
          }
        </ul>
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }

  render () {
    if (this.state.response) {
      return (
        <div className='host'>
          {!this.state.displayModifyProfileForm
            ? <div className='profileInfos'>
              {this.renderUserAvatar(this.props.userFetched)}
              <span className='nameSpan'>{this.props.userFetched.name}</span>
              <span className='usernameSpan'>@{this.props.userFetched.username}</span>
              <div className='biopicDiv'>{this.props.userFetched.bio}</div>
              {this.props.currentUser._id === this.props._id
                ? <div className='modifyButton'>
                  <Button onClick={this.displayModifyProfileForm}
                    bgColor='#E2E4E6'
                    hoverBgColor='#d6d6d6'
                    color='black'
                    fontSize='12px'
                    bold
                    block
                    shadow><Icon name='pencil' fontSize='10px' style={{marginRight: '5px'}}/>Edit
                  </Button>
                </div>
                : null}
            </div>
            : <div className='editProfilePart'>
              {this.renderUserAvatar(this.props.userFetched)}
              {this.renderModifyProfileForm()}
            </div>
          }
          <div className='tabSection'>
            <Tabs selected={0}>
              <TabPanel label='Profile'>
                {this.renderProfileTab()}
              </TabPanel>
              <TabPanel label='Boards'>
                {this.renderBoardsTab()}
              </TabPanel>
              <TabPanel label='Options'>
                {this.renderOptionsTab()}
              </TabPanel>
            </Tabs>
          </div>
          <style jsx>
            {styles}
          </style>
        </div>
      )
    } else {
      return (<p>Loading</p>)
    }
  }
}
