import PageLayout from '../../layouts/page'
import React from 'react'
import { connect } from 'react-redux'
import Button from '../../components/UI/Button/Button'
import Icon from '../../components/UI/Icon/Icon'
import styles from './profilePage.style'
import { updateProfile } from '../../services/User.services'
import { updateProfileAction, setTeamslist, setBoardslist } from '../../store/actions'
import { updateProfileLocalStorage } from '../../services/Authentication.services'
import { displayNotification } from '../../services/Notification.service'
import AvatarThumbnail from '../../components/UI/AvatarThumbnail/AvatarThumbnail'
import BoardThumbnail from '../../components/BoardThumbnail/BoardThumbnail'
import { Link } from 'react-router-dom'
import Tabs from '../../components/UI/Tabs/Tabs'
import TabPanel from '../../components/UI/TabPanel/TabPanel'
import TeamListElement from '../../components/UI/TeamListElement/TeamListElement'

@connect(store => {
  return {
    currentUser: store.currentUser,
    teamslist: store.teamslist,
    boardslist: store.boardslist
  }
})
export default class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      displayModifyProfileForm: false,
      avatarUrl: '',
      displayNewPasswordForm: false
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
  }

  componentDidMount () {
    setBoardslist(this.props.dispatch).then(() => {
      console.log(this.props.boardslist)
    }).catch(err => {
      console.error(err)
    })
    setTeamslist(this.props.dispatch).then(() => {
    }).catch(err => {
      console.error(err)
    })
  }

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
          console.log(updatedUser)
          updateProfileLocalStorage(updatedUser)
          updateProfileAction(updatedUser)
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
      const passwordHash = this.newPasswordInput.value
      updateProfile({ passwordHash: passwordHash })
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

  renderModifyProfileForm () {
    return (
      <form className='profileForm'>
        <div className='formDiv'>
          <label>Full name : </label>
          <input className='input' defaultValue={this.props.currentUser.name} ref={e => { this.nameInput = e }}/>
        </div>
        <div className='formDiv'>
          <label>User name : </label>
          <input className='input' defaultValue={this.props.currentUser.username} ref={e => { this.usernameInput = e }}/>
        </div>
        <div className='formDiv'>
          <label>Avatar URL : </label>
          <input className='input' defaultValue={this.props.currentUser.picture} ref={e => { this.avatarInput = e }} onChange={this.onAvatarInputChange}/>
          <div className='avatarPreview'>
            <AvatarThumbnail
              size='50px'
              fontSize='30px'
              thumbnail={this.state.avatarUrl === '' ? this.props.currentUser.picture : this.state.avatarUrl }
              initials={this.getInitials(this.props.currentUser.name)}
              bgColor={this.props.currentUser.bgColor}
              color='black'
            />
          </div>
        </div>
        <div className='formDiv'>
          <label>Bio : (facultative)</label>
          <textarea className='textarea' defaultValue={this.props.currentUser.bio} ref={e => { this.biopicInput = e }} rows='5'/>
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
      <form>
        <label>New password :</label>
        <input className='input' type='password' required ref={e => { this.newPasswordInput = e }}/>
        <label>Confirm new password :</label>
        <input className='input' type='password' required ref={e => { this.confirmPasswordInput = e }}/>
        <Button bgColor='#5AAC44'
          onClick={this.updatePassword}
          hoverBgColor='#07a801'
          fontSize='12px'
          bold
          shadow
          color='white'><Icon name='check' fontSize='10px' style={{marginRight: '5px'}} color='white'/>Confirm
        </Button>
        <Button onClick={this.hideNewPasswordForm}
          bgColor='#E2E4E6'
          hoverBgColor='#d6d6d6'
          color='black'
          fontSize='12px'
          bold
          shadow><Icon name='ban' fontSize='10px' style={{marginRight: '5px'}}/>Cancel
        </Button>
        <style jsx>{styles}</style>
      </form>
    )
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
            <span className='teamsTitle'>My teams</span>
          </div>
          <hr className='titleAndContentSeparator'/>
          <ul className='teamsList'>
            {this.props.teamslist.teams.map(team => (
              <li key={team._id} className='teamLi'><Link to={`teams/${team._id}`}><TeamListElement team={team}/></Link></li>
            ))}
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

  renderOptionsTab () {
    return (
      <div className='optionsTab'>
        {!this.state.displayNewPasswordForm
          ? <span className='linkText' onClick={this.displayNewPasswordForm}>Change password</span>
          : this.renderNewPasswordForm()
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
          initials={this.getInitials(user.name)}
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
          <span className='boardsTitle'>My boards</span>
        </div>
        <hr className='titleAndContentSeparator'/>
        <ul className='boardsList'>
          {this.props.boardslist.boards.map(board => (
            <li key={board._id} className='boardLi'>
              <Link to={`/boards/${board._id}`}>
                <BoardThumbnail index={0} id={board._id} title={board.title} background={board.background}/>
              </Link>
            </li>
          ))}
        </ul>
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }

  render () {
    return (
      <div className='profilePage'>
        <PageLayout>
          {!this.state.displayModifyProfileForm
            ? <div className='profileInfos'>
              {this.renderUserAvatar(this.props.currentUser)}
              <span className='nameSpan'>{this.props.currentUser.name}</span>
              <span className='usernameSpan'>@{this.props.currentUser.username}</span>
              <div className='biopicDiv'>{this.props.currentUser.bio}</div>
              <div className='modifyButton'>
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
            </div>
            : <div className='editProfilePart'>
              {this.renderUserAvatar(this.props.currentUser)}
              {this.renderModifyProfileForm()}
            </div>
          }
          <div className='tabSection'>
            <Tabs selected='0'>
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
        </PageLayout>
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }
}