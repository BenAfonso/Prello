import React from 'react'
import Dropzone from 'react-dropzone'
import styles from './Import.styles'

export default class Import extends React.Component {
  constructor () {
    super()
    this.importTrelloBoard = this.importTrelloBoard.bind(this)
    this.sendBoardToServer = this.sendBoardToServer.bind(this)
  }

  importTrelloBoard (files) {
    const trelloBoard = files[0]
    console.log('Board imported!')
    console.log(trelloBoard)
  }

  sendBoardToServer (board) {
    console.log("Sending board to server...")
  }

  render () {
    return (
      <div>
        <Dropzone onDrop={this.importTrelloBoard} accept='application/json'>
          <p>Click here to import JSON Trello file.</p>
        </Dropzone>
      </div>
    )
  }
}
