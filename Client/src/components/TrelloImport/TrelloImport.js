import React from 'react'
import Dropzone from 'react-dropzone'
import styles from './TrelloImport.styles'
import { importTrelloBoardDistant } from '../../services/Board.services'
import { displayNotification } from '../../services/Notification.service'

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
    if (trelloBoard.size > 5000000) {
      displayNotification({ type: 'error', title: 'Upload error', content: 'Board you\'re trying to upload is too big. Max size limit is 5 Mb' })
    } else {
      this.fetchBoardJSON(blobURL)
    }
  }

  cleanTrelloBoard (board) {
    // test
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
    return board
  }

  sendBoardToServer (board) {
    const cleanBoard = this.cleanTrelloBoard(board)
    importTrelloBoardDistant(cleanBoard)
  }

  render () {
    return (
      <div className='container'>
        <div>
          <h3 className='title'>Import Trello board</h3>
          <p className='description'>(Max size limit: 5Mb)</p>
        </div>
        <div className='dropzone'>
          <Dropzone style={{ borderStyle: 'dotted', borderWidth: 'medium', borderColor: '#000', marginTop: '5%', marginLeft: '10%', marginRight: '10%', width: '80%', height: '75px', borderRadius: '3px', backgroundColor: '#f9f9f9' }} onDrop={this.importTrelloBoard} accept='application/json'>
            <div>
              <p>Drag and drop file or click here...</p>
              <p style={{ fontWeight: 'normal' }}>(only json files are allowed)</p>
            </div>
          </Dropzone>
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}
