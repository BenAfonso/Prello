import React from 'react'
import styles from './Header.styles'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import { isAuthenticated, logout } from '../../services/Authentication.services'
import Icon from '../UI/Icon/Icon'
import AvatarThumbnail from '../UI/AvatarThumbnail/AvatarThumbnail'
import CreateMenu from '../CreateMenu/CreateDropDown'
import DropDown from '../UI/DropDown/DropDown'
import SearchBar from '../SearchBar/SearchBar'

export default class Header extends React.Component {
  static propTypes = {
    bgColor: PropTypes.any,
    currentUser: PropTypes.any,
    createBoardButton: PropTypes.bool,
    notificationsButton: PropTypes.bool,
    logoutButton: PropTypes.bool,
    searchBar: PropTypes.bool,
    backHomeButton: PropTypes.bool,
    color: PropTypes.any
  }

  static defaultProps = {
    bgColor: '#ae4d7b',
    color: 'white'
  }

  constructor (props) {
    super(props)
    this.state = {
      redirectTo: ''
    }
    this.redirectTo = this.redirectTo.bind(this)
  }

  redirectTo (url) {
    this.setState({
      redirectTo: url
    })
  }

  render () {
    return <div className='host' style={{
      backgroundColor: this.props.bgColor,
      color: this.props.color
    }}>

      {
        this.state.redirectTo !== ''
          ? <Redirect to={this.state.redirectTo} />
          : null
      }
      <div className='searchBar'>
        <SearchBar />
      </div>

      <Link to='/'>
        <div className='brand' />
      </Link>

      <div className='headerButtonBar'>

        { this.props.backHomeButton
          ? <div className='left buttons'>
            <Link to='/'>
              <div className='icon button'>
                <Icon name='arrow-left' color={this.props.color} fontSize='17px' />
              </div>
            </Link>
          </div>
          : null
        }

        <div className='right buttons'>
          { this.props.createBoardButton ? <CreateMenu /> : null }

          { this.props.notificationsButton
            ? <div className='icon button'>
              <Icon name='bell-o' color={this.props.color} fontSize='17px' />
            </div>
            : null }

          { isAuthenticated
            ? <div className='dropdown-button'>
              <DropDown
                orientation='right'
                menuElements={[
                  {
                    action: () => { this.redirectTo(`/users/${this.props.currentUser._id}/profile`) },
                    placeholder: 'Profile'
                  },
                  {
                    action: logout,
                    placeholder: 'Logout'
                  },
                  {
                    action: () => { this.redirectTo('/dashboard') },
                    placeholder: 'Dashboard'
                  },
                  {
                    action: () => { window.location = '/developers' },
                    placeholder: 'Developers API'
                  }
                ]}>
                <div className='user button'>
                  <AvatarThumbnail
                    initials={
                      this.props.currentUser
                        ? this.props.currentUser.name.split(' ').length > 1
                          ? `${this.props.currentUser.name.split(' ')[0][0]}${this.props.currentUser.name.split(' ')[1][0]}`
                          : `${this.props.currentUser.name[0]}`
                        : ''
                    }
                    thumbnail={this.props.currentUser ? this.props.currentUser.picture : ''}
                    size='30px'
                    fontSize='17px' />
                </div>
              </DropDown>
            </div>
            : null }
        </div>

      </div>

      <style jsx>{styles}</style>
    </div>
  }
}
