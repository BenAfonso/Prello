import React from 'react'
import { Redirect } from 'react-router-dom'

export default class DashboardNav extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectTo: undefined
    }
    this.redirectTo = this.redirectTo.bind(this)
  }

  redirectTo (url) {
    this.setState({
      redirectTo: url
    })
  }

  render () {
    const { provider, boardId, currentPage } = this.props
    if (!this.props.boardId) { this.redirectTo('/dashboard') }
    if (this.state.redirectTo) { return <Redirect to={this.state.redirectTo} /> }
    return (
      <ul>
        {
          provider === 'TheMightyPrello'
            ? <li onClick={() => this.redirectTo(`/boards/${boardId}`)}>Go back to board</li>
            : null
        }
        {
          currentPage !== 'board'
            ? <li onClick={() => this.redirectTo(`/boards/${boardId}/dashboard/board`)}>Board</li>
            : null
        }
        {
          currentPage !== 'lists'
            ? <li onClick={() => this.redirectTo(`/boards/${boardId}/dashboard/lists`)}>Lists</li>
            : null
        }
        {
          currentPage !== 'users'
            ? <li onClick={() => this.redirectTo(`/boards/${boardId}/dashboard/users`)}>Users</li>
            : null
        }

        <style jsx>{`
        ul {
          display: flex;
          width: 100%;
        }

        li {
          font-size: 14px;
          margin-left: 10px;
          text-decoration: underline;
          cursor: pointer;
          user-select: none;
        }
        `}</style>
      </ul>
    )
  }
}
