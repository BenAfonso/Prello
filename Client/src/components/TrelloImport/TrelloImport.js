import React from 'react'
import Dropzone from 'react-dropzone'
import styles from './TrelloImport.styles'
import { importTrelloBoardDistant } from '../../services/Board.services'

export default class Import extends React.Component {
  constructor () {
    super()
    this.importTrelloBoard = this.importTrelloBoard.bind(this)
    this.sendBoardToServer = this.sendBoardToServer.bind(this)
    this.cleanTrelloBoard = this.cleanTrelloBoard.bind(this)
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

  cleanTrelloBoard (board) {
    delete board['descData']
    delete board['idOrganization']
    delete board['invited']
    delete board['limits']
    delete board['pinned']
    delete board['starred']
    delete board['url']
    delete board['invitations']
    delete board['shortLink']
    delete board['subscribed']
    delete board['powerUps']
    delete board['shortUrl']
    delete board['actions']
    board['cards'].map((card) => {
      delete card['limits']
      delete card['idMembersVoted']
      delete card['idShort']
      // delete card['idAttachmentCover']
      delete card['manualCoverAttachment']
      delete card['pos']
      delete card['shortLink']
      delete card['email']
      delete card['shortUrl']
      delete card['subscribed']
      delete card['url']
      delete card['pluginData']
    })
    board['lists'].map((list) => {
      delete list['limits']
    })
    delete board['members']
    delete board['memberships']
    delete board['pluginData']
    console.log(board)
    return board
  }

  sendBoardToServer (board) {
    const cleanBoard = this.cleanTrelloBoard(board)
    importTrelloBoardDistant(cleanBoard)
  }

  render () {
    return (
      <div className='container'>
        <h3>Import Trello board</h3>
        <div>
          <Dropzone style={{ borderColor: '#000', borderWidth: '1px', marginTop: '5%', marginLeft: '10%', marginRight: '10%', width: '80%', height: '20px', borderRadius: '3px', backgroundColor: 'white' }} onDrop={this.importTrelloBoard} accept='application/json'>
            <p>Drag'n'Drop file or click here...</p>
          </Dropzone>
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}
