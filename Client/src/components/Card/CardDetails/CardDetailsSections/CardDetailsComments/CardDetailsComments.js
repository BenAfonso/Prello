import React from 'react'
import CardDetailsSection from '../../CardDetailsSection/CardDetailsSection'
import PropTypes from 'prop-types'
import Comment from '../../../../UI/Comment/Comment'
import NewComment from '../../../../UI/NewComment/NewComment'
import { connect } from 'react-redux'
import { addComment } from '../../../../../services/Card.services'

@connect(store => {
  return {
    board: store.board
  }
})
export default class CardDetailsComments extends React.Component {

  constructor (props) {
    super(props)
    this.onCommentSubmit = this.onCommentSubmit.bind(this)
  }

  onCommentSubmit (text) {
    let list = this.props.board.lists.filter(l => {
      let cards = l.cards.filter(c => c._id === this.props.id)
      return cards.length > 0
    })
    addComment(this.props.board._id, list[0]._id, this.props.id, text)
  }

  render () {
    return (
      <div className='host'>
        <CardDetailsSection title='Add comment' icon='comment-o'>
          {
            this.props.comments ? this.props.comments.map(c => (
              <Comment
                content={c.content}
                username={c.author.username}
                initials={c.author.initials}
                thumbnail={c.author.thumbnail}
                timestamp={c.timestamp}
              />
            )) : null
          }
          <NewComment handleSubmit={this.onCommentSubmit} />
        </CardDetailsSection>
        <style jsx>{`
        `}</style>
      </div>
    )
  }
}

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
