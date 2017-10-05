import React from 'react'
import Portal from 'react-portal'

export default class CardDetails extends React.Component{
    render() {
        const button1 = <button>Open portal with pseudo modal</button>;
     
        return (
          <Portal closeOnEsc closeOnOutsideClick openByClickOn={button1}>
            <PseudoModal>
              <h2>Pseudo Modal</h2>
              <p>This react component is appended to the document body.</p>
            </PseudoModal>
          </Portal>
        );
      }
     
    }
     
    export class PseudoModal extends React.Component {
     
      render() {
        return (
          <div>
            {this.props.children}
            <p><button onClick={this.props.closePortal}>Close this</button></p>
          </div>
        );
      }
     
    }