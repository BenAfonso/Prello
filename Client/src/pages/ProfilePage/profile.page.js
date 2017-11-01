import PageLayout from '../../layouts/page'
import React from 'react'
import { connect } from 'react-redux'
import Image from '../../components/UI/Image/Image'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import defaultAvatar from './default-avatar.png'
import styles from './profilePage.style'

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
  }

  displayModifyProfileForm () {
    this.setState({ displayModifyProfileForm: true })
  }

  hideModifyProfileForm () {
    this.setState({ displayModifyProfileForm: false })
  }

  renderModifyProfileForm () {
    return (
      <form>
        <label>Full name : </label>
        <Input placeholder={this.props.currentUser.name} />
        <label>User name : </label>
        <Input placeholder={this.props.currentUser.username} />
        <div className='saveButton'>
          <Button bgColor='#28af28'
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
              <Image rounded src={this.props.currentUser.picture === '' ? defaultAvatar : this.props.currentUser.picture}
                height='5%'
                width='5%'
                alt='Avatar picture' />
              <p>Username: {this.props.currentUser.username}</p>
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
