import React from 'react'
import {setAnalyticsBoards} from '../../../store/actions'
import {connect} from 'react-redux'
import BoardThumbnail from '../../BoardThumbnail/BoardThumbnail'
import { Link } from 'react-router-dom'
import { displayNotification } from '../../../services/Notification.service'
import { loginPrello } from '../../../services/Authentication.services'

import ThePrelloLogin from 'react-theprello-login/dist/PrelloLogin'

@connect(store => {
  return {
    analytics: store.analytics,
    currentUser: store.currentUser
  }
})
export default class DashboardBoards extends React.Component {
  componentDidMount () {
    setAnalyticsBoards()
  }

  displayUnavailableOAuth () {
    displayNotification({type: 'error', title: 'Information', content: 'Not available yet!'})
  }

  render () {
    return (
      <div className='host'>
        <div className='title'>
          <h1>Analytics Boards</h1>
          <ul className='services'>
            <li className='service checked'>TheMightyPrello</li>
            <li className={`service ${this.props.currentUser.theprello ? 'checked' : 'unchecked'}` }>
              { <ThePrelloLogin
                className='oauth'
                clientId='2bdc68692f333d9d97a8'
                redirectUri='http://176.142.249.180/dashboard'
                onSuccess={loginPrello}
              >ThePrello</ThePrelloLogin>
              }
            </li>
            <li className='service unchecked' onClick={this.displayUnavailableOAuth}>PrelloG3</li>
          </ul>
        </div>
        <ul className='boards'>
          {
            this.props.analytics.boards.map(b => (
              <li>
                <Link to={`/boards/${b._id}/dashboard/board`} provider={b.provider || 'TheMightyPrello'}>
                  <BoardThumbnail provider={b.provider} id={b._id} title={b.title} background={b.provider === 'ThePrello' ? '#7cb1b2' : null} />
                </Link>
              </li>
            ))
          }
        </ul>
        <style jsx>{`
        .host {
          width: 100%;
          height: 100%;
          background-color: #cd5a91;
          padding: 50px;
          color: white;
        }

        .title {
          display: flex;
          justify-content: space-between;
        }

        .title h1 {
          margin-right: 20px;
        }

        .services {
          display: flex;
          margin-top: 9px;
          height: 25px;
          line-height: 22px;
        }

        .oauth {
          width: 100%;
          height: 100%;
          background-color: red;
        }

        .service {
          margin-right: 10px;
          padding: 0 5px;
          border-radius: 4px;
          border: 2px solid #fff;
          font-size: 9px;
          user-select: none;
          cursor: not-allowed;
        }

        .service.checked {
          background-color: #4DB6AC;
          border-color: #26A69A;
        }

        .service.unchecked {
          background-color: #EC407A;
          border-color: #E91E63;
          cursor: pointer;
        }

        .boards {
          display: flex;
          flex-wrap: wrap; 
          align-items: center;
          justify-content: center;
          padding-right: 10px;
          margin-top: 20px;
        }

        .boards li {
          margin-left: 10px;
          margin-bottom: 10px;
        }
        
        `}</style>
      </div>
    )
  }
}
