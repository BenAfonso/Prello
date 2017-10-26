import React from 'react'
import {connect} from 'react-redux'
import Icon from '../../../../../UI/Icon/Icon'
import AvatarThumbnail from '../../../../../UI/AvatarThumbnail/AvatarThumbnail'
import MembersMenu from '../../../CardDetailsMenu/MembersMenu/MembersMenu'

@connect(store => {
  return {
    board: store.board
  }
})

export default class CardDetailsInformations extends React.Component {
  constructor (props) {
    super(props)
    this.getInitials = this.getInitials.bind(this)
    this.renderUserAvatar = this.renderUserAvatar.bind(this)
  }

  getInitials (name) {
    if (name !== undefined) {
      const matches = name.match(/\b(\w)/g)
      const initials = matches.join('').toUpperCase()
      return initials
    }
  }

  renderUserAvatar (user) {
    return (
      <div key={user._id ? user._id : user} className='avatar'>
        <AvatarThumbnail
          size='30px'
          fontSize=''
          thumbnail={user.picture}
          initials={this.getInitials(user.name)}
          bgColor={user.bgColor}
          color='black' />
        <style jsx>
          {`
            .avatar {
              display: inline-block
              padding: 5px 5px
              cursor: pointer;            
            }        
          `}
        </style>
      </div>
    )
  }

  render () {
    const list = this.props.board.lists[this.props.listIndex]
    const card = list.cards.filter(c => c._id === this.props.id)[0]
    const members = card.collaborators
    const cardId = this.props.id

    return (
      <div className='host'>
        <div className='members'>
          {
            members.map((member) => this.renderUserAvatar(member))
          }
        </div>
        <div className='buttonSection'>
          <MembersMenu
            members={members}
            cardId={cardId}
            listIndex={this.props.listIndex}
            orientation='left'
            button={<div className='addButton'><Icon name='plus' fontSize='15px' color='#aaa' /></div>} />
        </div>

        <style jsx>
          {`
            .host {
              display: flex;
            }

            .members {
              max-height: 80px;
              max-width: 175px;
              overflow-y: auto;
            }

            .buttonSection {
              padding: 5px 0;
            }

            .addButton {
              height: 30px;
              width: 30px;
              background-color: #eee;
              border-radius: 3px;
              text-align: center;
            }
  
            .addButton:hover {
              background-color: #ddd;
            }
          `}
        </style>
      </div>
    )
  }
}
