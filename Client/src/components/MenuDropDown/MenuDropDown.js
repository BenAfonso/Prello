import React from 'react'
import styles from './MenuDropDown.styles'
import { PropTypes } from 'prop-types'


export default class MenuDropDown extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  
  }

  static propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string
  }

  handleClick(action) {
    this.props.itemActions(action)
  }

  render () {

    const menuItems = this.props.menuItems

    return(<div className='host'>
      
      <ul className="menu"> 
        <li className="menuTitle">{this.props.title}</li>
        <hr className="menuSeparator"/>
      {
        menuItems.map((item,i)=>
          <li className="menuItem" key={i} onClick={ () => this.handleClick(item.action)}>
            <p className="menuItemTitle">{item.title}</p>
            <p className="menuItemBody">{item.body}</p>
          </li>
        )
      }
      </ul>
     
      <style jsx>{styles}</style>
    </div>
  )}
}
