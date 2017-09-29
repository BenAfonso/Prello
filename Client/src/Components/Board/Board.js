import React from 'react'
import styles from './Board.styles'
import List from '../List/List'

export default class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lists: ['TODO', 'WIP', 'DONE']
    }
  }

  addList () {
    let newLists = this.state.lists.slice()
    newLists.push('')
    this.setState({
      lists: newLists
    })
  }

  render () {
    return <div className='host'>
      <ul>
        {
          this.state.lists.map((list, i) => (
            <li key={i}><List title={list} /></li>
          ))
        }
       <li className='newListButton' onClick={this.addList.bind(this)}>Add a list</li>
      </ul>
      <style jsx>{styles}</style>
    </div>
  }
}
