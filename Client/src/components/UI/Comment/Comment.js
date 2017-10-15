import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import styles from './Comment.styles'

export default class Comment extends React.Component{
    static PropTypes={
        placeholder: "Write a comment..."
    }

    render(){
        return(
            <div className="comment-frame">
                <h2 className="comment-box-title">Add comment</h2>
                <textarea className="comment-box" placeholder="Write a comment...">
                </textarea>
                <div className="save-comment-btn"><Button bgColor="#5AAC44" gradient bold shadow>Save</Button></div>
                <style jsx>
                {styles}
                </style>
            </div>
        )
    }
}