import React from 'react'
import Header from '../components/Header/Header'
import SideMenu from '../components/UI/SideMenu/SideMenu'

export default class BoardLayout extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      sidemenuExpanded: true
    }
    this.closeDrawer = this.closeDrawer.bind(this)
    this.openDrawer = this.openDrawer.bind(this)
  }

  closeDrawer () {
    this.setState({ sidemenuExpanded: false })
  }

  openDrawer() {
    this.setState({ sidemenuExpanded: true })
  }

  render() {

    let sideMenuStyles = {
      right: this.state.sidemenuExpanded ? '0px' : '-400px'
    }

    let boardContainerStyles = {
      width: this.state.sidemenuExpanded ? 'calc(100% - 400px)' : '100%' 
    }

    return (
      <div style={{ position: 'relative', height: '100%' }}>
        <Header />

        <div className='content' style={{ display: 'flex', height: 'calc(100% - 50px)' }}>

          <div style={boardContainerStyles} className='boardContainer'>
            <div className='drawerButton' onClick={this.openDrawer}>Open menu...</div>
            {this.props.children}
          </div>
          <div style={sideMenuStyles} className='sideMenu'>
            <SideMenu handleCloseAction={this.closeDrawer} />
          </div>
        </div>
        <style jsx>{`

    .boardContainer {
      position: relative;
      display: inline-block;
      height: 100%;
    }

    .content {
      position: relative;
      height: 100%;
    }

    .drawerButton {
      position: absolute;
      right: 10px;
      top: 10px;
      color: white;
      cursor: pointer;
    }

    .sideMenu {
      position: absolute;
      top: 0;
      height: 100%;
      width: 400px;
    }
    `}</style>
      </div >
    )
  }
}