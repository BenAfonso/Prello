import React from 'react'
import { downloadAttachment, getAttachment } from '../../../services/Attachment.services'

export default class File extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      preview: ''
    }
  }

  componentDidMount () {
    if (this.props.attachment._id && this.state.preview === '') {
      getAttachment(this.props.boardId, this.props.attachment).then(res => {
        this.setState({ preview: res })
      })
    }
  }

  render () {
    if (this.props.renderPreview && ['png', 'jpg', 'jpeg'].indexOf(this.props.attachment.ext) > -1) {
      return (
        <div className='host' onClick={() => { downloadAttachment(this.props.boardId, this.props.attachment) }}>
          <div className='file-preview' style={{
            backgroundImage: `url('${this.state.preview}')`
          }} />
          <div className='file-name'>
            {this.props.attachment.name}
          </div>
          <style jsx>
            {`
  
        .host {
          width: 100px;
          margin-right: 30px;
          cursor: pointer;
        }
  
        .file-preview {
          height: 60px;
          width: 100px;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          border-radius: 5px;
        }
  
        .file-name {
          font-size: 8px;
          line-break: word-wrap;
          text-align: center;
        }
        `}
          </style>
        </div>
      )
    } else {
      return (
        <div className='host' onClick={() => { downloadAttachment(this.props.boardId, this.props.attachment) }}>
          <div className='file-icon'>
            {this.props.attachment.ext}
          </div>
          <div className='file-name'>
            {this.props.attachment.name}
          </div>
          <style jsx>
            {`
  
        .host {
          width: 100px;
          cursor: pointer;
        }
  
        .file-icon {
          height: 50px;
          width: 40px;
          margin-left: 30px;
          border-radius: 5px;
          background-color: gray;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          font-weight: bold;
          text-align: center;
          line-height: 50px;
        }
  
        .file-name {
          font-size: 8px;
          line-break: word-wrap;
          text-align: center;
        }
        `}
          </style>
        </div>
      )
    }
  }
}
