import React from 'react'
import styles from './SideMenu.styles'
import Icon from '../Icon/Icon'
import PropTypes from 'prop-types'
import UsersMenu from '../../MenuElements/UsersMenu/UsersMenu'
import ActivityMenu from '../../MenuElements/ActivityMenu/ActivityMenu'

const SideMenuItem = (props) => {

} 

const elements = [
  {
    icon: 'user-o',
    description: 'People',
    component: <UsersMenu />
  },
  {
    icon: 'hashtag',
    description: 'Activity',
    component: <ActivityMenu />
  }
]

export default class SideMenu extends React.Component {



  constructor(props) {
    super(props)
    this.state = {
      displayedIndex: 0,
      displayedElement: {
        icon: '',
        description: '',
        component: null
      }
    }
  }

  selectMenuItem (index) {
    if (elements.length > index) {
      this.setState({
        displayedIndex: index,
        displayedElement: elements[index]
      })
    }
  }

  componentDidMount () {
    this.selectMenuItem(0)
  }

  render() {


    return (<div className='host'>
      <div className='leftButtons'>
        <ul>
          <li onClick={this.props.handleCloseAction}>
            <Icon name='times' />
          </li>
          {
            elements.map((e,i) => (
              <li 
                key={i}
                style={{backgroundColor: this.state.displayedIndex === i ? '#eee' : ''}}
                onClick={this.selectMenuItem.bind(this, i)}>
              <div className='icon'>
                <Icon name={e.icon} />
              </div>
              <div className='description'>{e.description}</div>
            </li>
            ))
          }
        </ul>
      </div>
      <div className='content'>
        <div className='title'>
          <span className='title-icon'>
            <Icon name={this.state.displayedElement.icon} color='#999'/>
          </span>
          {this.state.displayedElement.description}
        </div>
        <div className='informations'>
          {this.state.displayedElement.component}
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
    )
  }
}
