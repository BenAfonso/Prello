import React from 'react'
import styles from './CreateMenu.styles'
import MenuDropDown from '../UI/MenuDropDown/MenuDropDown'
import BoardForm from './Forms/BoardForm/BoardForm'


export default class CreateMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      newBoardFormDisplayed: false
    }

    this.displayNewBoardForm = this.displayNewBoardForm.bind(this)
    this.displayMenu = this.displayMenu.bind(this)
    this.addBoard = this.addBoard.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.itemActions = this.itemActions.bind(this)
    this.hideMenu = this.hideMenu.bind(this)
  }

  addBoard () {
    this.clearForm()
    this.hideMenu()
  }

  itemActions (action) {
    switch (action) {
      case 'addBoard': {
        this.displayNewBoardForm()
        break
      }
      default:
    }
  }

  displayMenu() {
    const newState = !this.state.isOpen
    this.setState({ isOpen: newState, newBoardFormDisplayed: false })
  }

  hideMenu() {
    this.setState({ isOpen: false, newBoardFormDisplayed: false })
  }

  displayNewBoardForm() {
    this.setState({
      newBoardFormDisplayed: true,
      isOpen: false
    })
  }

  clearForm () {
    this.title = ''
  }

  displayContent (menuItems) {
    if (this.state.isOpen) return (<MenuDropDown title='Create' menuItems={menuItems} itemActions={this.itemActions} />)
    else if (this.state.newBoardFormDisplayed) return (<BoardForm onSubmit={this.addBoard} back={this.displayMenu} cancel={this.hideMenu} />)
  }

  render () {
    const menuItems = [
      { title: 'Create a board', body: 'A board is a set of cards classified in lists. Use it to manage your projects !', action: 'addBoard' },
      { title: 'Create a team', body: 'A team is a set of boards and users. Use it to keep your business organized' }
    ]

    return (<div className='host'>

      <div className='headerButton createBlock' onClick={this.displayMenu}>
        <span>+</span>
      </div>

      <div className='menu'>
        {
          this.displayContent(menuItems)
        }
      </div>

      <style jsx>{styles}</style>
    </div>
    )
  }
}






