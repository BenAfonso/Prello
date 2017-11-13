import React from 'react'
import styles from './Uploader.styles'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import PropTypes from 'prop-types'

export default class Uploader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      progress: 0
    }
    this.onDrop = this.onDrop.bind(this)
  }

  static propTypes = {
    uploadedImage: PropTypes.func
  }

  onDrop (file) {
    this.setState(() => {
      return {
        progress: 0
      }
    })
    var data = new window.FormData()
    data.append('image', file[0])

    var config = {
      onUploadProgress: progressEvent => {
        var percentCompleted = Math.round(
          progressEvent.loaded * 100 / progressEvent.total
        )
        this.setState({ progress: percentCompleted })
      }
    }
    axios
      .post(this.props.api, data, config)
      .then(res => {
        this.props.uploadedImage(res.data.url)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    return (
      <div>
        <div
          className='drop-zone'
          style={{
            position: 'relative',
            height: '200px',
            width: '200px',
            cursor: 'pointer'
          }}
        >
          <div
            className='progress'
            style={{
              width: `${this.state.progress}%`,
              background: 'rgba(107, 188, 102, 0.7)'
            }}
          >
            {' '}
          </div>

          {this.props.api && (
            <Dropzone accept='image/jpeg, image/png' onDrop={this.onDrop}>
              {this.state.progress > 0 ? (
                <div className='progress-label'>{this.state.progress}%</div>
              ) : (
                <div className='label'>
                  Drag your image here or click to upload
                </div>
              )}
            </Dropzone>
          )}
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}
