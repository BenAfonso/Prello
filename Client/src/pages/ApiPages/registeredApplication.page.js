import React from 'react'
import Button from '../../components/UI/Button/Button'
import Icon from '../../components/UI/Icon/Icon'

export default class RegisteredApplication extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      secretKeyHidden: true
    }
    this.toggleShowSecretKey = this.toggleShowSecretKey.bind(this)
  }

  toggleShowSecretKey () {
    this.setState({
      secretKeyHidden: !this.state.secretKeyHidden
    })
  }

  render () {
    return (
      <div className='host'>
        <h2 className='title'>{this.props.name}</h2>
        <div className='field'>
          <label>Client ID</label>
          <input type='text' disabled value={this.props.client_id} />
        </div>
        <div className='field'>
          <label>Client Secret</label>
          <input type={this.state.secretKeyHidden ? 'password' : 'text'} disabled value={this.props.client_secret} />
          <span>
            <Button
              bgColor='rgba(0,0,0,0)'
              color='white'
              hoverBgColor='rgba(0,0,0,0.1)'
              size='small'
              onClick={this.toggleShowSecretKey}
            >
              <Icon name={this.state.secretKeyHidden ? 'eye' : 'eye-slash'} color='' />
            </Button>
          </span>
        </div>
        <div className='field'>
          <label>Redirect URI</label>
          <input type='text' disabled value={this.props.redirectUris[0]} />
        </div>
        <style jsx>{`
        .host {
          color: white;
        }
    
        .title {
          margin-bottom: 20px;
        }
    
        label {
          font-weight: bold;
          display: block;
        }
    
        input {
          padding: 8px 10px;
          border-radius: 5px;
          width: 250px;
          margin-bottom: 10px;
        }
        `}</style>
      </div>
    )
  }
}
