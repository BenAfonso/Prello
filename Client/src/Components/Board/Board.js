import React from 'react'
import styles from './Board.styles'
import List from '../List/List'

export default class Board extends React.Component {
  render () {
    return <div className='host'>
      <ul>
        <li><List title='TODO list' /></li>
        <li><List title='TODO list' /></li>
      </ul>
      <style jsx>{styles}</style>
    </div>
  }
}
