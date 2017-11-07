import PageLayout from '../../layouts/page'
import React from 'react'
import { connect } from 'react-redux'
import Image from '../../components/UI/Image/Image'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import defaultAvatar from './default-avatar.png'
import styles from './profilePage.style'
import { updateProfile } from '../../services/User.services'
import { updateProfileAction } from '../../store/actions'
import { updateProfileLocalStorage } from '../../services/Authentication.services'

@connect(store => {
  return {
    currentUser: store.currentUser
  }
})
export default class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      displayModifyProfileForm: false,
      avatar: this.props.currentUser.picture === '' ? defaultAvatar : this.props.currentUser.picture
    }

    this.renderModifyProfileForm = this.renderModifyProfileForm.bind(this)
    this.displayModifyProfileForm = this.displayModifyProfileForm.bind(this)
    this.hideModifyProfileForm = this.hideModifyProfileForm.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
  }

  displayModifyProfileForm () {
    this.setState({ displayModifyProfileForm: true })
  }

  hideModifyProfileForm () {
    this.setState({ displayModifyProfileForm: false })
  }

  updateProfile () {
    let name = this.nameInput.input.value
    let username = this.usernameInput.input.value
    let picture = this.avatarInput.input.value
    if (name.length > 0 && username.length > 0 && picture.length > 0) {
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
      <form>
        <label>Full name : </label>
        <Input placeholder={this.props.currentUser.name} ref={e => { this.nameInput = e }} width='50px' font-size='14px'/>
        <label>User name : </label>
        <Input placeholder={this.props.currentUser.username} ref={e => { this.usernameInput = e }} width='50px' font-size='14px'/>
        <label>Avatar URL : </label>
        <Input ref={e => { this.avatarInput = e }} width='50px' font-size='14px'/>
        <div className='saveButton'>
          <Button bgColor='#28af28'
            onClick={this.updateProfile}
            color='#FFF'>Save</Button>
        </div>
        <Button onClick={this.hideModifyProfileForm}>Cancel</Button>
      </form>
    )
  }
  render () {
    return (
      <div className='profilePage'>
        <PageLayout>
          {!this.state.displayModifyProfileForm
            ? <div className='profileInfos'>
              <Image
                rounded
                src={this.props.currentUser.picture} // TODO : remplacer par props plus tard avec le store etc..
                height='10%'
                width='10%'
                alt='Avatar picture' />
              <p>Username: {this.props.currentUser.username}</p>
              <p>Full name: {this.props.currentUser.name}</p>
              <Button onClick={this.displayModifyProfileForm}
                bgColor='#999'>Modify</Button>
            </div>
            : this.renderModifyProfileForm()
          }
        </PageLayout>
        <style jsx>{styles}</style>
      </div>
    )
  }
}
