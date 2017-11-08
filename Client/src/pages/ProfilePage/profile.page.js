import PageLayout from '../../layouts/page'
import React from 'react'
import { connect } from 'react-redux'
// import Image from '../../components/UI/Image/Image'
// import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import styles from './profilePage.style'
import { updateProfile } from '../../services/User.services'
import { updateProfileAction } from '../../store/actions'
import { updateProfileLocalStorage } from '../../services/Authentication.services'
import AvatarThumbnail from '../../components/UI/AvatarThumbnail/AvatarThumbnail'

@connect(store => {
  return {
    currentUser: store.currentUser
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
    console.log(name, username, picture)
    if (name.length > 0 && username.length > 0 && picture.length > 0) {
      console.log('la')
      const datas = {
        name,
        username,
        picture
      }
      updateProfile(datas)
        .then(updatedUser => {
          console.log(updatedUser)
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
          <label>Biopic : </label>
          <textarea className='textarea' ref={e => { this.biopicInput = e }} rows='5'/>
        </div>
        <div className='saveButton'>
          <Button bgColor='#28af28'
            onClick={this.updateProfile}
            color='#FFF'>Save</Button>
        </div>
        <Button onClick={this.hideModifyProfileForm}>Cancel</Button>
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
              {/* <Image
                rounded
                src={this.props.currentUser.picture} // TODO : remplacer par props plus tard avec le store etc..
                height='10%'
                width='10%'
                alt='Avatar picture' /> */ }
              {this.renderUserAvatar(this.props.currentUser)}
              <span className='nameSpan'>{this.props.currentUser.name}</span>
              <span className='usernameSpan'>@{this.props.currentUser.username}</span>
              <Button onClick={this.displayModifyProfileForm}
                bgColor='#999'>Modify</Button>
            </div>
            : this.renderModifyProfileForm()
          }
        </PageLayout>
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }
}
