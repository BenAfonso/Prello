import React from 'react'
import { connect } from 'react-redux'
import {setBoardHistory, addModifications} from '../../../store/actions'
import { getBoardHistory } from '../../../services/Board.services'
import Modification from '../../UI/Modification/Modification'
import AvatarThumbnail from '../../UI/AvatarThumbnail/AvatarThumbnail'

@connect(store => {
  return {
    board: store.currentBoard.board,
    modifications: store.currentBoard.board.modifications
  }
})
export default class ActivityMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false
    }
    this.handleHover = this.handleHover.bind(this)
    this.buildElements = this.buildElements.bind(this)
    this.renderElements = this.renderElements.bind(this)
  }

  componentDidMount () {
    getBoardHistory(this.props.board._id).then(history => {
      setBoardHistory(history)
    })
  }

  getInitials (user) {
    let initials = ''
    if (user && user.name) {
      const matches = user.name.match(/\b(\w)/g)
      initials = matches.join('').toUpperCase()
    }
    return initials
  }

  buildElements (limit, skip) {
    getBoardHistory(this.props.board._id, limit, skip).then(history => {
      addModifications(history)
      this.setState({isLoading: false})
    })
  }

  handleHover () {
    this.setState({isLoading: true})
    setTimeout(() => {
      const elemLength = this.props.board.modifications.length
      this.buildElements(20, elemLength)
    }
      , 2000)
  }

  renderElements () {
    return (
      this.props.modifications.map(modification => (
        <li key={modification._id} className='modification'>
          <div className={`indicator ${modification.type}`}>
            <div className='user'>
              <AvatarThumbnail thumbnail={modification.user._id ? modification.user.picture : ''} initials={this.getInitials(modification.user)} size='19px' fontSize='13px' />
            </div>
          </div>
          <div className={`line ${modification.type}`} />
          <Modification
            {...modification}
            popoverManager={this.props.popoverManager}
          />
          <style jsx>{`
          .modification {
            margin-bottom: 15px;
            padding-left: 35px;
            position: relative;
          }

          .user {
            position: absolute;
            width: 19px;
            height: 19px;
            border-radius: 50%;
            top: 3px;
            left: 3px;
            background-color: #eee;
            z-index: 1;
          }
  
          .line {
            position: absolute;
            left: 0;
            top: 15px;
            left: 11px;
            width: 3px;
            height: calc(100% + 10px);
            background-color: inherit;
            z-index: 0;
          }

          .indicator {
            position: absolute;
            left: 0;
            top: 5px;
            height: 25px;
            width: 25px;
            border-radius: 50%
          }
  
          .MOVED_CARD {
            background-color: #00c3ff;
          }
  
          .ADDED_COLLABORATOR_BOARD {
            background-color: #00e49f; 
          }
  
          .REMOVED_COLLABORATOR_BOARD {
            background-color: #ff006a; 
          }
  
          .SET_RESPONSABLE {
            background-color: #00e49f; 
          }
          
          .ADDED_USER_CARD {
            background-color: #00e49f; 
          }
          
          .REMOVED_USER_CARD {
            background-color: #ff006a; 
          }
          
          .ADDED_COMMENT {
            background-color: #cd4eff; 
          }
          
          .ADDED_ATTACHMENT {
            background-color: #cd4eff; 
          }
          
          .ARCHIVED_LIST {
            background-color: #ffcd42; 
          }
          
          .ARCHIVED_CARD {
            background-color: #ffcd42; 
          }
          
          .ADDED_DUE_DATE {
            background-color: #ffcd42; 
          }
          
          .MARKED_DUE_DATE_COMPLETE {
            background-color: #00e49f; 
          }
          
          .MARKED_DUE_DATE_INCOMPLETE {
            background-color: #ff006a; 
          }
  
          li:last-child .line {
            display: none;
          }
          `}</style>
        </li>
      )))
  }

  render () {
    const moreToLoad = this.props.modifications.length % 20 === 0
    return (
      <div>
        <ul>
          {
            this.renderElements()
          }
          {
            moreToLoad
              ? this.state.isLoading
                ? <li className='loader'><div className='loader-animation' style={{borderTop: `8px solid ${this.props.board.background}`}}></div></li>
                : <li className='loadButton' onMouseEnter={this.handleHover}>Load more...</li>
              : undefined
          }
        </ul>
        <style jsx>{`
        ul {
          height: 100%;
        }

        .loadButton {
          width: 100%;
          padding-top: 15px;
          text-align: center;
          font-size: 15px;
          font-weight: bold;
        }

        .loader {
          text-align: center;
          width: 100%;
        }

        .loader-animation {
          padding-top: 10px;          
          display: inline-block;
          border: 8px solid white;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        `}</style>
      </div>
    )
  }
}
