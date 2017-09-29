import React from 'react'
import List from '../List/List'

export default class Board extends React.Component {
  render () {
    return (<div>
      Board
      <List title='TODO list' />
    </div>)
  }
}
