import React from 'react'
import { PortalWithState } from 'react-portal'
import PopoverPage from '../../pages/popup.page'

export default class PopupManager extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      popoverDisplayed: false
    }
  }

  displayPopover () {
    this.setState({ popoverDisplayed: true })
  }

  dismissPopover () {
    this.setState({ popoverDisplayed: false })
  }

  setRenderedComponent (component) {
    this.setState({ renderedComponent: component })
  }

  renderPopover () {
    return (
      <PortalWithState defaultOpen closeOnOutsideClick closeOnEsc>
        {({ openPortal, closePortal, isOpen, portal }) => [
          portal(
            <div style={{
              position: 'absolute',
              left: '0',
              top: '0',
              width: '100vw',
              height: '100vh'
            }}>
              <PopoverPage dismiss={this.dismissPopover.bind(this)} component={this.state.renderedComponent} />
            </div>
        )
        ]}
      </PortalWithState>
    )
  }

  render () {
    return (
      <div className='main'>
        { this.state.popoverDisplayed
          ? this.renderPopover()
          : null
        }

        {
          React.cloneElement(this.props.children,
            {
              ...this.props.children.props,
              setRenderedComponent: this.setRenderedComponent.bind(this),
              displayPopover: this.displayPopover.bind(this),
              dismissPopover: this.dismissPopover.bind(this)
            }
          )
        }
        <style jsx>{`
          .main {
            height: 100vh;
            width: 100vw;
            overflow-y: auto;
          }
        `}</style>
      </div>
    )
  }
}
