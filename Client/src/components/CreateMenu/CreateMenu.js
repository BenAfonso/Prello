import React from 'react'
import styles from './CreateMenu.styles'
import { addBoard } from '../../store/actions'
import MenuDropDown from '../MenuDropDown/MenuDropDown'
import Button from '../UI/Button/Button'

export default class CreateMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      newBoardFormDisplayed : false
    }

    this.displayNewBoardForm = this.displayNewBoardForm.bind(this)
    this.undisplayNewBoardForm = this.undisplayNewBoardForm.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.addBoard = this.addBoard.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.itemActions = this.itemActions.bind(this)
    
  }


  addBoard(title) {
    if (this.title.value !== '') {
      addBoard(this.props.dispatch, this.title.value)      
      this.clearForm()
      this.undisplayNewBoardForm()
    }
  }

  itemActions(action) {
    switch(action) {
      case 'addBoard': {
        this.displayNewBoardForm()
        break
      }
      default: {

      }
        
    }


  }


  toggleMenu () {
    const newState = !this.state.isOpen
    this.setState({isOpen:newState, newBoardFormDisplayed: false})
  }

  hideMenu () {
    this.setState({isOpen:false, newBoardFormDisplayed: false})
  }

  displayNewBoardForm () {
    this.setState({
      newBoardFormDisplayed: true,
      isOpen:false
    })
  }

  undisplayNewBoardForm () {
    this.setState({
      newBoardFormDisplayed: false
    })
  }

  clearForm () {
    this.title = ''
  }

  displayContent(menuItems) {
    if (this.state.isOpen) return (<MenuDropDown title='Create' menuItems={menuItems} itemActions={this.itemActions}/>)
    else if (this.state.newBoardFormDisplayed) return (
      <div className='newBoardForm'>
        <form onSubmit={this.addBoard}>
          <input type='text' placeholder='Add a board...' ref={(t) => { this.title = t }} />
        </form>
        <div className='newBoardFormButtons'>
          <div>
            <Button
              bgColor={'#5AAC44'}
              gradient
              bold
              shadow
              onClick={this.addBoard}>
          Add
        </Button>
          </div>
          <div>
            <Button
              bgColor={'#444'}
              gradient
              shadow
              onClick={this.undisplayNewBoardForm}>
         Cancel
        </Button>
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }

  render () {
    const menuItems = [
      {title:'Create a board', body:'Create a board', action:'addBoard'},
      {title:'Create a team', body:'Create a team'}
    ]
    
    const menuProps = {
      position:'absolute'
    }


    
    return(<div className='host'>
    
    <div className='headerButton createBlock' onClick={this.toggleMenu}>
      <span>+</span>
    </div>

    <div className='menu'>
      {
        this.displayContent(menuItems)
      }
    </div>

      <style jsx>{styles}</style>
    </div>
  )}
}







