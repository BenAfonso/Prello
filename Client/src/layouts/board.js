import React from 'react'
import Header from '../components/Header/Header'
import SideMenu from '../components/UI/SideMenu/SideMenu'
import Button from '../components/UI/Button/Button'
import { TimelineMax } from 'gsap'
import GSAP from 'react-gsap-enhancer'
import Color from 'color'
import {connect} from 'react-redux'
import LoadingPage from '../pages/LoadingPage/loading.page'
import Root from './root'

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board,
    currentUser: store.currentUser,
    fetching: store.fetching,
    fetched: store.fetched
  }
})
@GSAP()
export default class BoardLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sideMenuExpanded: false
    }
    this.closeDrawer = this.closeDrawer.bind(this)
    this.openDrawer = this.openDrawer.bind(this)
    this.toggleSidebarAnimation = this.toggleSidebarAnimation.bind(this)
  }

  toggleSidebarAnimation ({ target }) {
    if (this.state.sideMenuExpanded) {
      return new TimelineMax()
        .to(this.sidebar, 0.5, {right: '0px'}, 0)
        .to(this.boardContainer, 0.5, {width: '-=400'}, 0)
    } else {
      return new TimelineMax()
        .to(this.sidebar, 0.5, {right: '-400px'}, 0)
        .to(this.boardContainer, 0.5, {width: '100%'}, 0)
    }
  }

  closeDrawer () {
    this.addAnimation(this.toggleSidebarAnimation)
    this.setState({sideMenuExpanded: false})
  }

  openDrawer () {
    this.addAnimation(this.toggleSidebarAnimation)
    this.setState({sideMenuExpanded: true})
  }

  render () {
    const primaryColor = new Color(this.props.board.background)
    const secondaryColor = primaryColor.light()
      ? primaryColor.darken(0.2)
      : primaryColor.lighten(0.2)
    return (
      <Root>
        {
          this.props.fetching
            ? <div className='loading'><LoadingPage /></div>
            : null
        }
        <div style={{ height: 'calc(100% - 50px)' }}>
          <Header
            bgColor={secondaryColor}
            currentUser={this.props.currentUser}
            createBoardButton
            notificationsButton
            backHomeButton
          />

          <div className='content' style={{ display: 'flex', height: '100%' }}>
            <div ref={(c) => { this.boardContainer = c }} className='boardContainer'>
              <div className='drawerButton' style={{ display: this.state.sideMenuExpanded ? 'none' : '' }} onClick={this.openDrawer}>
                <Button bgColor='rgba(0,0,0,0)' size='x-small' hoverBgColor='rgba(0,0,0,0.1)'>Open menu...</Button>
              </div>
              {React.cloneElement(this.props.children, {
                primaryColor: primaryColor,
                secondaryColor: secondaryColor,
                popoverManager: {
                  setRenderedComponent: this.props.setRenderedComponent,
                  displayPopover: this.props.displayPopover,
                  dismissPopover: this.props.dismissPopover
                }
              })}
            </div>
            <div name='sidebar' ref={(s) => { this.sidebar = s }} className='sideMenu'>
              <SideMenu handleCloseAction={this.closeDrawer} />
            </div>
          </div>
        </div>
        <style jsx>{`

    .loading {
      position: fixed;
      top: 0;
      width: 100vw;
      height: 100vh;
      left: 0;
      z-index: 1000;
    }

    .boardContainer {
      position: relative;
      display: inline-block;
      height: 100%;
      width: 100%;
    }

    .content {
      position: relative;
      height: 100%;
      overflow-x: hidden;
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
      right: -400px;
    }
    `}</style>
      </Root>
    )
  }
}
