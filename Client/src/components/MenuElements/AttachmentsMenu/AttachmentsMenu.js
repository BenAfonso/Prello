import React from 'react'
import { connect } from 'react-redux'
import File from '../../UI/File/File'
import AvatarThumbnail from '../../UI/AvatarThumbnail/AvatarThumbnail'
import Icon from '../../UI/Icon/Icon'
import { deleteAttachment } from '../../../services/Attachment.services'
import { removeAttachment } from '../../../store/actions'

@connect(store => {
  return {
    board: store.currentBoard.board
  }
})
export default class AttachmentsMenu extends React.Component {
  getInitials (user) {
    let initials = ''
    if (user && user.name) {
      const matches = user.name.match(/\b(\w)/g)
      initials = matches.join('').toUpperCase()
    }
    return initials
  }

  deleteAttachment (a) {
    deleteAttachment(this.props.board._id, a._id).then(res => removeAttachment(a._id))
  }

  render () {
    return (
      <div>
        <ul className='attachments'>
          {
            this.props.board.attachments.map(a => (
              <li key={a._id}>
                <File attachment={a} boardId={this.props.board._id} />
                <div className='user'>
                  <AvatarThumbnail thumbnail={a.owner._id ? a.owner.picture : ''} initials={this.getInitials(a.owner)} size='19px' fontSize='13px' />
                </div>
                <div className='removeIcon' onClick={this.deleteAttachment.bind(this, a)}>
                  <Icon name='times' color='red' />
                </div>
              </li>
            ))
          }
        </ul>
        <style jsx>{`
        ul {
          height: 100%;
          overflow-y: auto;
          padding-top: 10px;
        }

        .attachments {
          display: flex;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .attachments li {
          position: relative;
          margin-bottom: 10px;
        }

        .user {
          position: absolute;
          top: -5px;
          left: 25px;
        }

        .removeIcon {
          display: none;
          position: absolute;
          cursor: pointer;
          top: -10px;
          right: 23px;
        }

        .attachments li:hover .removeIcon {
          display: block
        }
        `}</style>
      </div>
    )
  }
}
