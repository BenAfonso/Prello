import React from 'react'
import Dropzone from 'react-dropzone'

export default class Import extends React.Component {
  constructor () {
    super()
    this.importTrelloBoard = this.importTrelloBoard.bind(this)
    this.sendBoardToServer = this.sendBoardToServer.bind(this)
  }

  fetchBoardJSON (url) {
    return fetch(url)
      .then((response) => {
        return response.json()
      })
      .catch((error) => {
        console.log(error)
      })
      .then((json) => {
        this.sendBoardToServer(json)
      })
  }

  importTrelloBoard (files) {
    const trelloBoard = files[0]
    const blobURL = trelloBoard.preview
    this.fetchBoardJSON(blobURL)
  }

  sendBoardToServer (board) {
    console.log(board)
  }

  render () {
    return (
      <div>
        <Dropzone onDrop={this.importTrelloBoard} accept='application/json'>
          <p>Click here to import Trello JSON file.</p>
        </Dropzone>
      </div>
    )
  }
}
