import React from 'react'
import PropTypes from 'prop-types'
import styles from './Card.styles'
import CardDetails from '../CardDetails/CardDetails'
import Modal from 'react-modal'

export default class Card extends React.Component {

  constructor(){
    super()
    this.state = {
      isActive: false
    }
  }

  static propTypes = {
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
  }

  static defaultProps = {
  }

  toggleModal = () => {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  render () {
    return (
      <div onClick={this.toggleModal}
        className='root'
      >
        { this.props.content }

        <style jsx>
          {styles}
        </style>
        <Modal isOpen={this.state.isActive}>{this.props.content}</Modal>
      </div>
    )
  }
}
