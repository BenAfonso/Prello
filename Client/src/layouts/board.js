import React from 'react'
import Header from '../components/Header/Header'
import SideMenu from '../components/UI/SideMenu/SideMenu'
import Button from '../components/UI/Button/Button'
import { TimelineMax } from 'gsap'
import GSAP from 'react-gsap-enhancer'
import Color from 'color'
import { connect } from 'react-redux'

@connect(store => {
  return {
    board: store.board
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
    let sidebar = target.find({ name: 'sidebar' })
    let content = target.find({ name: 'boardContainer' })
    if (this.state.sideMenuExpanded) {
      return new TimelineMax()
        .to(sidebar, 0.5, {right: '0px'}, 0)
        .to(content, 0.5, {width: '-=400'}, 0)
    } else {
      return new TimelineMax()
        .to(sidebar, 0.5, {right: '-400px'}, 0)
        .to(content, 0.5, {width: '100%'}, 0)
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
    const secondaryColor = primaryColor.light
      ? primaryColor.darken(0.2)
      : primaryColor.lighten(0.2)
    return (
      <div style={{ position: 'relative', height: '100%' }}>
        <Header bgColor={secondaryColor} />

        <div className='content' style={{ display: 'flex', height: 'calc(100% - 50px)' }}>

          <div name='boardContainer' className='boardContainer'>
            <div className='drawerButton' style={{display: this.state.sideMenuExpanded ? 'none' : ''}} onClick={this.openDrawer}>
              <Button bgColor='rgba(0,0,0,0)' size='x-small' hoverBgColor='rgba(0,0,0,0.1)'>Open menu...</Button>
            </div>
            {React.cloneElement(this.props.children, {
              primaryColor: primaryColor,
              secondaryColor: secondaryColor 
            })}
          </div>
          <div name='sidebar' className='sideMenu'>
            <SideMenu handleCloseAction={this.closeDrawer} />
          </div>
        </div>
        <style jsx>{`

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
      </div >
    )
  }
}
