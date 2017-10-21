import React from 'react'
import { connect } from 'react-redux'

import Button from '../../UI/Button/Button'
import Icon from '../../UI/Icon/Icon'
import AvatarThumbnail from '../../UI/AvatarThumbnail/AvatarThumbnail'
import DropDown from '../../UI/DropDown/DropDown'
import AddCollaboratorMenu from './AddCollaboratorMenu/AddCollaboratorMenu'
import { addCollaborator } from '../../../store/actions'

@connect(store => {
  return {
    collaborators: store.board.collaborators,
    owner: store.board.owner
  }
})

export default class UsersMenu extends React.Component {

  constructor (props) {
    super(props)
    this.addCollaborator = this.addCollaborator.bind(this)
  }

  addCollaborator () {
    //if (this.email.value !== '') {
    addCollaborator(this.props.dispatch, this.props.boardId, 'test@test.com')
      //this.clearForm()
      //this.undisplayNewCollaboratorForm()
    //}
  }

  render () {

    const { collaborators, owner } = this.props



    console.log(this.props.collaborators)
    return (
      <div className='host'>
        <div className='usermenu-title'>
          List of collaborators
        </div>
        <div className='usermenu-separator' />
        <div className='usermenu-collaborators'>
          <ul className='collaborators-content'>
            <li className='collaborator'>
              <AvatarThumbnail
                size='30px'
                fontSize=''
                thumbnail=''
                initials=''
                bgColor='pink'
                color='' />
            </li>
          </ul>
        </div>
        <div className='usermenu-separator' />

        <AddCollaboratorMenu />
        <style jsx>
          {`
          .collaborator {
            padding: 10px 5px
          }
        `}
        </style>
      </div>
    )
  }
}
