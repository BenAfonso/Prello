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
    console.log(this.props.team.admins)
    return (
      <div className='teamListElement'>
        <div className='header'>
          <div className='name'>
            {this.props.team.name}
            {this.props.team.visibility === 'Private'
              ? <Icon name='lock' fontSize='12px' style={{marginRight: '10px'}}/>
              : <Icon name='truc' fontSize='12px' style={{marginRight: '10px'}}/>
            }
          </div>
          <div className='membersNumber'>
            <Icon name='users' fontSize='18px' styles={{marginRight: '5px'}}/> {this.props.team.users.length}
          </div>
        </div>
        <div className='content'>
          <div className='boardOwner'>
            <AvatarThumbnail size='50px'
              fontSize='5px'
              thumbnail={this.props.team.admins[0].picture}
              initials={this.getInitials(this.props.team.admins[0].name)}
              bgColor={this.props.team.admins[0].bgColor}
              color='black' />
          </div>
          <div className='boardsNumber'>
            <Icon name='bars' fontSize='18px' styles={{marginRight: '5px'}}/> {this.props.team.boards.length} boards
          </div>
          <div className='descriptionTeam'>
            {this.props.team.description ? this.props.team.description : 'No description' }
          </div>
        </div>
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }
}
