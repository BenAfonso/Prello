import React from 'react'
import Button from '../../UI/Button/Button'
import Icon from '../../UI/Icon/Icon'
import AvatarThumbnail from '../../UI/AvatarThumbnail/AvatarThumbnail'

export default class Team extends React.Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  getInitials (name) {
    const matches = name.match(/\b(\w)/g)
    const initials = matches.join('').toUpperCase()
    return initials
  }

  renderUserAvatar (user) {
    return (
      <div className='avatar' onClick={this.onAvatarClick}>
        <AvatarThumbnail
          size='30px'
          fontSize=''
          thumbnail={user.picture}
          initials={this.getInitials(user.name)}
          bgColor={user.bgColor}
          color='black'
        />
        <style jsx>
          {`
          .avatar {
            display: inline-block;
            padding: 5px 5px;
            cursor: pointer;            
          }        
        `}
        </style>
      </div>
    )
  }

  render () {
    console.log(this.props.members)
    return (
      <div className='host'>
        <div className='sidebar'>
          <ul className='menu'>
            <li className='menuTitle'>Search Team</li>
            <li className='menuSeparator'></li>
            <li className='menuItem'>
              <input className='menuItemInput' placeholder='Find members...' />
            </li>
          </ul>
        </div>
        <div className='main'>
          <ul className='members'>
            {
              this.props.members.map((member, i) => (
                <div>
                  <li key={member._id} className='member' >
                    <div className='member-infos'>
                      <div className='member-avatar'>
                        {/* this.renderUserAvatar(member) */}
                      </div>
                      <div className='member-names'>
                        {member.name}egrgfrerera
                      </div>
                    </div>
                    <div className='member-actions'>
                      <div className='member-button'>
                        <Button
                          bgColor='rgba(255,255,255,0.1)'
                          hoverBgColor='rgba(255,255,255,0.3)'
                          color='#dcdcda'
                          gradient
                          onClick={null}>
                          <Icon color='#dcdcda' name='window-restore' fontSize='20px' />&nbsp;Normal
                        </Button>
                      </div>
                      <div className='member-button'>
                        <Button
                          bgColor='rgba(255,255,255,0.1)'
                          hoverBgColor='rgba(255,255,255,0.3)'
                          color='#dcdcda'
                          gradient
                          onClick={null}>
                          <Icon color='#dcdcda' name='remove' fontSize='20px' />&nbsp;Remove
                        </Button>
                      </div>
                    </div>
                  </li>
                  <li className='memberSeparator'></li>
                </div>
              ))
            }
          </ul>
        </div>
        <style jsx>{`
          .menuSeparator {
            display: block;            
            height: 1px;
            border-top: 1px solid #999;
          }

          .menuTitle {
            text-align: center;
            padding-bottom: 10px;            
          }

          .menuItem {
            padding: 10px 0;
          }

          input {
            font-size: inherit;
            width: 100%;
            padding: 8px;
            border-radius: 3px;
          }

          .sidebar {
            width: 250px;
            float: left;
          }

          .main {
            margin-left: 270px;    
          }

          .member {
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: space-between;
          }

          .member-infos {

          }

          .member-actions {
          }

          .member-button {
            display: inline-block;
            padding-left: 10px;
          }

          .memberSeparator {
            display: block;            
            height: 1px;
            border-top: 1px solid #999;
            margin: 10px 0;
          }
        `}</style>
      </div>
    )
  }
}
