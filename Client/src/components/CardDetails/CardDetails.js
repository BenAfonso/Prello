import React from 'react'
import styles from './CardDetails.styles'
import Modal from 'react-modal'


export default class CardDetails extends React.Component {

  constructor(){
    super()
    this.state = {
      isActive: false
    }
  }

  toggleModal = () => {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  render(){
    return (
      <div onClick={this.toggleModal}>
      <Modal isOpen={this.state.isActive}>
        Hello world
      </Modal>
      </div>
    )
  }


    }

