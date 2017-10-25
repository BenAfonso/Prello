import React from 'react'
import styles from './Header.styles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import CreateMenu from '../CreateMenu/CreateMenu'
import { isAuthenticated, logout } from '../../services/Authentication.services'
import Button from '../UI/Button/Button'

export default class Header extends React.Component {
  static propTypes = {
    bgColor: PropTypes.any,
    color: PropTypes.any
  }

  static defaultProps = {
    bgColor: '#ae4d7b',
    color: 'white'
  }

  render () {
    return <div className='host' style={{
      backgroundColor: this.props.bgColor,
      color: this.props.color
    }}>

      <Link to='/'>
        <div className='brand' />
      </Link>

      <div className='headerButtonBar'>

        <CreateMenu />

        <div className='headerButton notificationBlock' >
          <span>N</span>
        </div>

        { isAuthenticated
          ? <Button
            onClick={logout}
            size='x-small'
            bgColor='rgba(0,0,0,0)'
            hoverBgColor='rgba(0,0,0,0.2)'
            color='#fff'>Log out</Button>
          : null }

      </div>

      <style jsx>{styles}</style>
    </div>
  }
}
