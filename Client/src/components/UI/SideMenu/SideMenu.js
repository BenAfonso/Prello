import React from 'react'
import styles from './SideMenu.styles'
import Icon from '../Icon/Icon'
import UsersMenu from '../../MenuElements/UsersMenu/UsersMenu'
import TeamsMenu from '../../MenuElements/TeamsMenu/TeamsMenu'
import ActivityMenu from '../../MenuElements/ActivityMenu/ActivityMenu'
import ArchivedMenu from '../../MenuElements/ArchivedMenu/ArchivedMenu'

const elements = [
  {
    icon: 'user-o',
    description: 'People',
    component: UsersMenu
  },
  {
    icon: 'users',
    description: 'Teams',
    component: TeamsMenu
  },
  {
    icon: 'hashtag',
    description: 'Activity',
    component: ActivityMenu
  },
  {
    icon: 'archive',
    description: 'Archives',
    component: ArchivedMenu
  }
]

export default class SideMenu extends React.Component {
  constructor (props) {
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

  render () {
    return (<div className='host'>
      <div className='leftButtons'>
        <ul>
          <li onClick={this.props.handleCloseAction}>
            <Icon name='times' />
          </li>
          {
            elements.map((e, i) => (
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
            <Icon name={this.state.displayedElement.icon} color='#999' />
          </span>
          {this.state.displayedElement.description}
        </div>
        <div className='informations'>
          {this.state.displayedElement.component
            ? React.createElement(this.state.displayedElement.component, {
              popoverManager: this.props.popoverManager
            })
            : null
          }
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
    )
  }
}
