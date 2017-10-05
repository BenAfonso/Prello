import React from 'react'
import Portal from 'react-portal'
import styles from './CardDetails.styles'

export default class CardDetails extends React.Component {
  render () {
    const button1 = <button>More information</button>

    return (
      <Portal closeOnEsc="true" closeOnOutsideClick="false" openByClickOn={button1}>
        <PseudoModal>
          <h2>{this.props.content}</h2>
        </PseudoModal>
      </Portal>
    )
  }
    }

export class PseudoModal extends React.Component {
  render () {
    return (
      <div className="card-details">
        {this.props.children}
        <p><button onClick={this.props.closePortal}>Close this</button></p>
        <style jsx>{styles}</style>
      </div>
    )
  }
    }
