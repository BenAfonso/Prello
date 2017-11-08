import React from 'react'
import {connect} from 'react-redux'
import AvatarThumbnail from '../../../../../UI/AvatarThumbnail/AvatarThumbnail'
import ResponsibleMenu from '../../../CardDetailsMenu/ResponsibleMenu/ResponsibleMenu'

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board
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
    const members = card.collaborators
    const cardId = this.props.id

    return (
      <div className='host'>
        {
          responsible
            ? <div className='responsible'>
              <div className='user'>
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
              <div className='modify-responsible-block'><ResponsibleMenu
                responsible={responsible}
                members={members}
                cardId={cardId}
                listIndex={this.props.listIndex}
                orientation='right'
                button={<span className='modify-responsible'>Modify</span>} /></div>
            </div>
            : <div className='no-responsible'>
                There isn't any responsible for this card yet.&nbsp;
              <ResponsibleMenu
                members={members}
                cardId={cardId}
                listIndex={this.props.listIndex}
                orientation='right'
                button={<span className='add-responsible'>Add one</span>} />
            </div>

        }
        <style jsx>{`

      .host {
        display: flex;
         border-radius: 3px;
         background: #eee;
         padding: 8px;
         
      }

      .no-responsible {
        font-style: italic;
        text-align: center;
        padding: 5px 0;
        font-size: 13px;
        color: #999;
      }

      .responsible {
        position: relative;
      }

      .add-responsible {
        text-decoration: underline;
        cursor: pointer;
      }

      .modify-responsible-block {
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
      }

      .modify-responsible {
        font-size: 12px;
        text-decoration: underline;
        color: #999;
      }

      .user {
        display: inline-block;
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
