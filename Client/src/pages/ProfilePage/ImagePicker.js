import React from 'react'
import styles from './ImagePicker.style'

export default class ImagePicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      fullScreen: false,
      loading: false
    }
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handlePreviewClick = this.handlePreviewClick.bind(this)
  }

  handleFileChange (event) {
    const {target} = event
    const {files} = target

    if (files && files[0]) {
      var reader = new window.FileReader()
      reader.onloadstart = () => this.setState({loading: true})

      reader.onload = event => {
        this.setState({
          data: event.target.result,
          loading: false
        })
      }
      reader.readAsDataURL(files[0])
    }
  }

  handlePreviewClick () {
    const {data, fullScreen} = this.state
    if (!data) {
      return
    }
    this.setState({fullScreen: !fullScreen})
  }

  render () {
    const {data, fullScreen, loading} = this.state
    const backgroundImage = data ? {backgroundImage: `url(${data})`} : null
    const previewClasses = fullScreen ? 'preview--fullscreen' : 'preview'
    console.log(previewClasses)

    return (
      <div className='imagePicker'>

        <input
          id='car'
          type='file'
          accept='image/*'
          capture='camera'
          onChange={this.handleFileChange}
        />

        <div
          className={previewClasses}
          style={backgroundImage}
          onClick={this.handlePreviewClick}
        >
          {!data && !loading &&
            <label htmlFor='car'>{React.cloneElement(this.props.children)}</label>
          }

          {loading &&
            <span>Loading...</span>
          }
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}
