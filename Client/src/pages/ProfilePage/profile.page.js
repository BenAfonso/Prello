import PageLayout from '../../layouts/page'
import React from 'react'
import { connect } from 'react-redux'
// import Image from '../../components/UI/Image/Image'
// import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Icon from '../../components/UI/Icon/Icon'
import styles from './profilePage.style'
import { updateProfile } from '../../services/User.services'
import { updateProfileAction, setTeamslist } from '../../store/actions'
import { updateProfileLocalStorage } from '../../services/Authentication.services'
import AvatarThumbnail from '../../components/UI/AvatarThumbnail/AvatarThumbnail'
import { Link } from 'react-router-dom'

@connect(store => {
  return {
    currentUser: store.currentUser,
    teamslist: store.teamslist
  }
})
export default class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      displayModifyProfileForm: false
    }

    this.renderModifyProfileForm = this.renderModifyProfileForm.bind(this)
    this.displayModifyProfileForm = this.displayModifyProfileForm.bind(this)
    this.hideModifyProfileForm = this.hideModifyProfileForm.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
    this.renderUserAvatar = this.renderUserAvatar.bind(this)
  }

  componentDidMount () {
    setTeamslist(this.props.dispatch).then(() => {
      console.log(this.props.teamslist.teams)
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

  updateProfile () {
    let name = this.nameInput.value
    let username = this.usernameInput.value
    let picture = this.avatarInput.value
    let bio = this.biopicInput.value
    if (name.length > 0 && username.length > 0 && picture.length > 0) {
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
        })
      this.hideModifyProfileForm()
    }
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
          <input className='input' defaultValue={this.props.currentUser.picture} ref={e => { this.avatarInput = e }}/>
        </div>
        <div className='formDiv'>
          <label>Biopic : (facultative)</label>
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
              color='black'><Icon name='check' fontSize='10px' style={{marginRight: '5px'}}/>Save
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

  getInitials (name) {
    const matches = name.match(/\b(\w)/g)
    const initials = matches.join('').toUpperCase()
    return initials
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
          <div className='teamPart'>
            <div className='teamLine'>
              <Icon name='users'
                fontSize='24px'
                color='white'
                style={{marginTop: '10%', marginLeft: '2%', marginRight: '20px'}}/>
              <span className='teamsTitle'>My teams</span>
            </div>
            <ul>
              {this.props.teamslist.teams.map(team => (
                <div>
                  <Link to={`/teams/${team._id}`}>
                    <li key={team._id} className='teamLi'>{team.name}
                      {team.visibility === 'Private'
                        ? <Icon name='lock' fontSize='12px' style={{marginLeft: '5px'}}/>
                        : <Icon name='truc' fontSize='12px' style={{marginLeft: '5px'}}/>
                      }
                    </li>
                  </Link>
                  <hr className='teamSeparator'/>
                </div>
              ))}
            </ul>
          </div>
        </PageLayout>
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }
}
