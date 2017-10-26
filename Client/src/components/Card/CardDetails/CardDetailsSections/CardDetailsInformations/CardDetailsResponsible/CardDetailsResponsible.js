import React from 'react'
import {connect} from 'react-redux'
import AvatarThumbnail from '../../../../../UI/AvatarThumbnail/AvatarThumbnail'

@connect(store => {
  return {
    board: store.board
  }
})

export default class CardDetailsResponsible extends React.Component {
  constructor (props) {
    super(props)
    this.getInitials = this.getInitials.bind(this)
  }

  getInitials (name) {
    if (name !== undefined) {
      const matches = name.match(/\b(\w)/g)
      const initials = matches.join('').toUpperCase()
      return initials
    }
  }

  render () {
    const list = this.props.board.lists[this.props.listIndex]
    const card = list.cards.filter(c => c._id === this.props.id)[0]
    const responsible = card.responsible

    return (
      <div className='host'>
        {
          responsible
            ? <div className='user'>
              <div className='user-thumbnail'>
                <AvatarThumbnail
                  size='30px'
                  fontSize=''
                  thumbnail={responsible.picture}
                  initials={this.getInitials(responsible.name)}
                  bgColor={responsible.bgColor}
                  color='black'
                />
              </div>
              <div className='user-infos'>
                <div className='user-username'>{responsible.username}</div>
                <div className='user-email'>{responsible.email}</div>
              </div>
            </div>
            : <div className='no-responsible'>There isn't any responsible for this card yet</div>
        }
        <style jsx>{`

      .host {
         width: 250px;
      }

      .no-responsible {
        font-style: italic;
        padding: 5px 0;
        font-size: 12px;
        color: #999;
      }

      .user-infos {
        float: right;
        display: inline-block;
        padding: 0 10px;
        overflow: hidden;
        width: 200px;
        text-overflow: ellipsis;    
      }

      .user-thumbnail {
        float: left;  
      }

      .user-username {
        font-weight: bold;
        text-align: left;
        color: #000;
      }

      .user-email {
        font-style: italic;
        padding: 5px 0;
        font-size: 10px;
        color: #999;        
      }
    `}
        </style>
      </div>
    )
  }
}
