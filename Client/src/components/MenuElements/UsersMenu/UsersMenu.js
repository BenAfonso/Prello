import React from 'react'
import { connect } from 'react-redux'
import Icon from '../../UI/Icon/Icon'
import AvatarThumbnail from '../../UI/AvatarThumbnail/AvatarThumbnail'
import AddCollaboratorMenu from './AddCollaboratorMenu/AddCollaboratorMenu'


@connect(store => {
  return {
    boardId: store.board._id,
    collaborators: store.board.collaborators,
    owner: store.board.owner
  }
})

export default class UsersMenu extends React.Component {

  constructor (props) {
    super(props)
    this.getInitials = this.getInitials.bind(this)
  }

  getInitials (username) {
    const matches = username.match(/\b(\w)/g)
    const initials = matches.join('')
    return initials
  }

  render () {

    const { collaborators, owner, boardId } = this.props

    return (
      <div className='host'>
        <div className='usermenu-title'>
          List of collaborators
        </div>
        <div className='usermenu-separator' />
        <div className='usermenu-collaborators'>
          <ul className='collaborators-content'>
          <li className='collaborators'>
            {
              collaborators.map((user, i)=>(
                <div className='collaborator' key={i}>
                  {
                    user.id===owner.id ? <div className='ownerIcon'><Icon  color='#ffff00' name='star' fontSize='20px' /></div> : null
                  }
                  <AvatarThumbnail
                  size='30px'
                  fontSize=''
                  //thumbnail={user.picture}
                  initials={this.getInitials(user.username)}
                  bgColor='pink'
                  color='black' >  </AvatarThumbnail>
                </div>
              
              ))
            }
          </li>
            
          </ul>
        </div>
        <div className='usermenu-separator' />

        <AddCollaboratorMenu boardId={boardId}/>
        <style jsx>
          {`

          .collaborators {
            padding: 10px 5px
          }

          .collaborator {
            display:inline-block;
            position: relative;
            width: auto;
            height: auto;
            
          }

          .ownerIcon {
            position: absolute;
            right: -5px;
            top: -5px;
          }

          
        `}
        </style>
      </div>
    )
  }
}
