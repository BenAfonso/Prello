import React from 'react'
import styles from './SideMenu.styles'
import Icon from '../Icon/Icon'

export default class SideMenu extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {


    return (<div className='host'>
      <div className='leftButtons'>
        <ul>
          <li onClick={this.props.handleCloseAction}>
            <Icon name='times' />
          </li>
          <li>
            <div className='icon'>
              <Icon name='user-o' />
            </div>
            <div className='description'>People</div>
          </li>
          <li>
            <div className='icon'>
              <Icon name='hashtag' />
            </div>
            <div className='description'>Activity</div>
          </li>
        </ul>
      </div>
      <div className='content'>
        <div className='title'>
          <span className='title-icon'>
            <Icon name='user-o' color='#999'/>
          </span>
          Collaborators
        </div>
        <div className='informations'>
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
    )
  }
}
