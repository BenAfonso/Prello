import React from 'react'
import PropTypes from 'prop-types'
import styles from './Card.styles'
import CardDetails from '../CardDetails/CardDetails'
import Modal from 'react-modal'
import Button from '../UI/Button/Button'

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
        <Modal isOpen={this.state.isActive}>
          <div>{this.props.content}</div>
          <Button>Add members</Button>
          <Button bgColor={'#1cea34'}>Archive</Button>
          <Button bgColor={'#ed1e1e'}>Delete card</Button>
        </Modal>
      </div>
    )
  }
}
