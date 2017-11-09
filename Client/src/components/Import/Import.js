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
  }

  importTrelloBoard (files) {
    const trelloBoard = files[0]
    const blobURL = trelloBoard.preview
    const jsonContent = this.fetchBoardJSON(blobURL)
    console.log(jsonContent)
    console.log('Board imported!')
    console.log(trelloBoard)
  }

  sendBoardToServer (board) {
    console.log('Sending board to server...')
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
