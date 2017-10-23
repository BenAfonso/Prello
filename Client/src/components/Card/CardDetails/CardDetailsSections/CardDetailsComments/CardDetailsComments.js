import React from 'react'
import CardDetailsSection from '../../CardDetailsSection/CardDetailsSection'
import PropTypes from 'prop-types'
import Comment from '../../../../UI/Comment/Comment'
import NewComment from '../../../../UI/NewComment/NewComment'
import { connect } from 'react-redux'
import { addComment } from '../../../../../services/Card.services'
import { getCompleteCard } from '../../../../../services/Card.services'
import { dateFormatter } from '../../../../../util/dateFormatter'

@connect(store => {
  return {
    board: store.board
  }
})
export default class CardDetailsComments extends React.Component {

  constructor (props) {
    super(props)
    this.onCommentSubmit = this.onCommentSubmit.bind(this)
    this.listId = ''
  }

  onCommentSubmit (text) {
    addComment(this.props.board._id, this.listId, this.props.id, text)
  }

  componentDidMount () {
    let list = this.props.board.lists.filter(l => {
      let cards = l.cards.filter(c => c._id === this.props.id)
      return cards.length > 0
    })
    this.listId = list[0]._id
    getCompleteCard(this.props.board._id, this.listId, this.props.id)
  }

  render () {

    const list = this.props.board.lists.filter(l => l.cards.filter(c => c._id === this.props.id).length > 0)[0]
    const card = list.cards.filter(c => c._id === this.props.id)[0] 
    const comments = card.comments
    return (
      <div className='host'>
        <CardDetailsSection title='Add comment' icon='comment-o'>
          <div className='comments'>
            {
              comments ? comments.map(c => (
                <div className='comment'>
                  <Comment
                    content={c.text}
                    username={c.author ? c.author.username : ''}
                    initials={
                      c.author 
                        ? c.author.name.split(' ').length > 1
                          ? `${c.author.name.split(' ')[0][0]}${c.author.name.split(' ')[0][0]}`
                          : `${c.author.name[0]}`
                        : ''
                    }
                    thumbnail={c.author ? c.author.thumbnail : ''}
                    timestamp={dateFormatter(c.createdAt)}
                  />
                </div>
              )) : null
            }
          </div>
          <NewComment handleSubmit={this.onCommentSubmit} ref={n => this.newComment = n} />
        </CardDetailsSection>
        <style jsx>{`
          .comments {
            margin: 20px 0px;
          }

          .comment {
            margin: 10px 0px;
          }
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
