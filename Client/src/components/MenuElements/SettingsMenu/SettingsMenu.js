import React from 'react'
import {connect} from 'react-redux'
import Button from '../../UI/Button/Button'
import Icon from '../../UI/Icon/Icon'
import { deleteBoard } from '../../../store/actions'

@connect(store => {
  return {
    currentboard: store.currentBoard,
    board: store.currentBoard.board,
    currentUser: store.currentUser
  }
})

export default class SettingsMenu extends React.Component {
  constructor (props) {
    super(props)
    this.deleteBoard = this.deleteBoard.bind(this)
  }

  isCurrentUserOwner () {
    const isAdmin = this.props.currentUser._id === this.props.board.owner._id
    return isAdmin
  }

  deleteBoard () {
    deleteBoard(this.props.board._id)
  }

  render () {
    return (
      <div className='host'>
        <div className='settingsmenu-buttons'>
          <div className='button'>
            {
              this.isCurrentUserOwner()
                ? <Button
                  bgColor='rgba(204,0,0,1)'
                  color='white'
                  hoverBgColor='rgba(204,0,0,0.8)'
                  block
                  onClick={this.deleteBoard}
                >
                  <Icon color='white' name='trash' fontSize='20px' /> &nbsp;Delete Board
                </Button>
                : null
            }
          </div>
        </div>
        <style jsx>
          {`

          .separator {
            content: '';
            height: 1px;
            background-color: #aaa;
            width: 100%;
            margin: 8px 0 8px 0;
          }

          .button {
            padding: 10px 0;
          }
        `}
        </style>
      </div>
    )
  }
}
