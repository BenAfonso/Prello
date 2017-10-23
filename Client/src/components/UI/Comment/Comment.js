import React from 'react'
import AvatarThumbnail from '../AvatarThumbnail/AvatarThumbnail'
import styles from './Comment.styles'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'

const Comment = (props) => (
  <div className='comment'>
    <div className='author'>
      <div className='avatar'>
        <AvatarThumbnail initials={props.initials} thumbnail={props.thumbnail} size='30px' fontSize='20px' />
      </div>
      <div className='username'>{props.username}</div>
    </div>
    <div className='content'>
      <div className='card'>
        <Markdown source={props.content} />
      </div>
      <div className='informations'>
        <span>{props.timestamp}</span>
        { props.canEdit
          ? <span className='link'>Edit</span>
          : <span className='link'>Reply</span>
        }
        { props.canDelete
          ? <span className='link'>Delete</span>
          : null
        }
      </div>
    </div>

    <style jsx>{styles}</style>
  </div>
)

Comment.propTypes = {
  username: PropTypes.string.isRequired,
  initials: PropTypes.string,
  thumbnail: PropTypes.string,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  canDelete: PropTypes.bool,
  canEdit: PropTypes.bool
}

Comment.defaultProps = {
  canEdit: false,
  canDelete: false
}

export default Comment
