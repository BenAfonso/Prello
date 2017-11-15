import PropTypes from 'prop-types'
import React from 'react'
import Icon from '../../../components/UI/Icon/Icon'
import styles from './TeamListElement.style'
import AvatarThumbnail from '../AvatarThumbnail/AvatarThumbnail'

export default class TeamListElement extends React.Component {
  static propTypes = {
    team: PropTypes.object
  }

  getInitials (name) {
    const matches = name.match(/\b(\w)/g)
    const initials = matches.join('').toUpperCase()
    return initials
  }

  render () {
    return (
      <div className='teamListElement'>
        <div className='header'>
          <div className='name'>
            {this.props.team.name}
            {this.props.team.visibility === 'Private'
              ? <Icon name='lock' fontSize='19px' style={{marginLeft: '5px', marginBottom: '3px'}}/>
              : <Icon name='truc' fontSize='19px' style={{marginLeft: '5px', marginBottom: '3px'}}/>
            }
          </div>
          <div className='membersNumber'>
            <Icon name='users' fontSize='16px' styles={{marginRight: '5px'}}/> {this.props.team.users.length}
          </div>
        </div>
        <div className='content'>
          <div className='boardOwner'>
            {this.props.team.owner
              ? <AvatarThumbnail size='50px'
                fontSize='5px'
                thumbnail={this.props.team.owner.picture}
                initials={this.getInitials(this.props.owner.name)}
                bgColor={this.props.team.owner.bgColor}
                color='black' />
              : ''
            }
          </div>
          <div className='boardsNumber'>
            <Icon name='bars' fontSize='18px' styles={{marginRight: '5px'}}/> {this.props.team.boards.length} <span>boards</span>
          </div>
          <div className='descriptionTeam'>
            {this.props.team.description ? this.props.team.description : '' }
          </div>
        </div>
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }
}
