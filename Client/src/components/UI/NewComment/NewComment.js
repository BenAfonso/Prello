import React from 'react'
import AvatarThumbnail from '../AvatarThumbnail/AvatarThumbnail'
import styles from './NewComment.styles'
import PropTypes from 'prop-types'
import Icon from '../Icon/Icon'
import { displayNotification } from '../../../services/Notification.service'

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
        <ul className='buttons'>
          <li onClick={() => { displayNotification({type: 'info', title: 'Info', content: 'Not implemented yet!'}) }}><Icon name='paperclip' fontSize='13px' color='gray' /></li>
        </ul>
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
