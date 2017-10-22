import React from 'react'
import CardDetailsSection from '../../CardDetailsSection/CardDetailsSection'
import PropTypes from 'prop-types'
import Comment from '../../../../UI/Comment/Comment'

const CardDetailsComments = props => (
  <div className='host'>
    <CardDetailsSection title='Add comment' icon='comment-o'>
      {
        props.comments ? props.comments.map(c => (
          <Comment
            content={c.content}
            username={c.author.username}
            initials={c.author.initials}
            thumbnail={c.author.thumbnail}
            timestamp={c.timestamp}
          />
        )) : null
      }
    </CardDetailsSection>
    <style jsx>{`
    `}</style>
  </div>
)

CardDetailsComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    author: PropTypes.shape({
      username: PropTypes.string,
      email: PropTypes.string,
      initials: PropTypes.string,
      thumbnail: PropTypes.string
    }),
    content: PropTypes.string,
    timestamp: PropTypes.any
  }))
}

export default CardDetailsComments
