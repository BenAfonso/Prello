import React from 'react'
import AvatarThumbnail from '../AvatarThumbnail/AvatarThumbnail'
import styles from './NewComment.styles'
import PropTypes from 'prop-types'

const NewComment = (props) => {
  const handleSubmit = (text) => {
    props.handleSubmit(text)
    this.text.innerHTML = ''
  }

  return (
    <div className='NewComment'>
      <div className='author'>
        <div className='avatar'>
          <AvatarThumbnail initials={props.initials} thumbnail={props.thumbnail} size='30px' fontSize='20px' />
        </div>
      </div>
      <div className='content'>
        <div className='card' contentEditable ref={c => { this.text = c }} />
        <div className='saveButton' onClick={() => { handleSubmit(this.text.innerHTML) }}>
          Save
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  )
}

NewComment.propTypes = {
  username: PropTypes.string.isRequired,
  initials: PropTypes.string,
  thumbnail: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired
}

export default NewComment
