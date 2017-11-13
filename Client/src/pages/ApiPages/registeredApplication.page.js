import React from 'react'
import Button from '../../components/UI/Button/Button'
import Icon from '../../components/UI/Icon/Icon'
import { deleteOAuthClient, updateOAuthClient } from '../../services/OAuthClient.service'
import { removeOAuthClient, updateOAuthClient as updateOAuthClientAction } from '../../store/actions'

export default class RegisteredApplication extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      secretKeyHidden: true,
      editing: false,
      newClient: {
        _id: props._id,
        scope: props.scope,
        redirectUris: props.redirectUris
      }
    }
    this.toggleShowSecretKey = this.toggleShowSecretKey.bind(this)
    this.onRedirectUriChange = this.onRedirectUriChange.bind(this)
  }

  toggleShowSecretKey () {
    this.setState({
      secretKeyHidden: !this.state.secretKeyHidden
    })
  }

  toggleEdit () {
    this.setState({
      editing: !this.state.editing
    })
  }

  resetForm () {
    this.setState({
      editing: false,
      newClient: {
        ...this.state.newClient,
        scope: this.props.scope,
        redirectUris: this.props.redirectUris
      }
    })
  }

  addRedirectUri () {
    let newUris = this.state.newClient.redirectUris.slice()
    newUris.push('')
    this.setState({
      ...this.state,
      newClient: {
        ...this.state.newClient,
        redirectUris: newUris
      }
    })
  }

  removeRedirectUri (atIndex) {
    let newUris = this.state.newClient.redirectUris.slice()
    newUris.splice(atIndex, 1)
    this.setState({
      ...this.state,
      newClient: {
        ...this.state.newClient,
        redirectUris: newUris
      }
    })
  }

  submitEdit () {
    let newClient = this.state.newClient
    newClient.redirectUris = newClient.redirectUris.filter(r => r !== '')
    updateOAuthClient(this.state.newClient).then(res => {
      updateOAuthClientAction(res)
      this.resetForm()
    }).catch(err => {
      console.log(err)
    })
  }

  deleteClient () {
    deleteOAuthClient(this.props._id).then(res => {
      // Dirty: to refactor
      window.location = '/developers'
      removeOAuthClient(this.props)
    }).catch(err => {
      console.log(err)
    })
  }

  onScopeChange (e) {
    this.setState({
      ...this.state,
      newClient: {
        ...this.state.newClient,
        scope: e.target.value
      }
    })
  }

  onRedirectUriChange (index, e) {
    let redirectUris = this.state.newClient.redirectUris.slice()
    redirectUris[index] = e.target.value
    this.setState({
      ...this.state,
      newClient: {
        ...this.state.newClient,
        redirectUris: redirectUris.filter(r => r !== '')
      }
    })
  }

  render () {
    return (
      <div className='host'>
        <div>
          <h2 className='title'>{this.props.name}</h2>
          <span>
            <Button
              onClick={this.toggleEdit.bind(this)}
              bgColor='rgba(0,0,0,0)'
              color='white'
              hoverBgColor='rgba(0,0,0,0.1)'
              size='small'
            >
              <Icon name='edit' color='' />
            </Button>
          </span>
        </div>
        <div className='field'>
          <label>Client ID</label>
          <input type='text' disabled value={this.props.client_id} />
        </div>
        <div className='field'>
          <label>Scope</label>
          {
            this.state.editing
              ? <input type='text' onChange={this.onScopeChange.bind(this)} value={this.state.newClient.scope} />
              : <input type='text' disabled value={this.props.scope} />
          }
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
          <label>Redirect URIs</label>
          {
            !this.state.editing
              ? this.state.newClient.redirectUris.map((r, i) => (
                <input key={i} type='text' disabled value={r} />
              ))
              : <div>
                {
                  this.state.newClient.redirectUris.map((r, i) => (
                    <div key={i}>
                      <input type='text' onChange={e => { this.onRedirectUriChange(i, e) }} value={r} />
                      <Button
                        bgColor='rgba(0,0,0,0)'
                        color='white'
                        hoverBgColor='rgba(0,0,0,0.1)'
                        size='small'
                        onClick={this.removeRedirectUri.bind(this, i)}
                      >
                        <Icon name='times' color='' />
                      </Button>
                    </div>
                  ))
                }
                <div onClick={this.addRedirectUri.bind(this)}><input type='text' disabled /></div>
              </div>
          }
        </div>
        {
          this.state.editing
            ? <div className='buttons'>
              <Button
                bgColor='rgba(0,0,0,0)'
                color='white'
                hoverBgColor='rgba(0,0,0,0.1)'
                onClick={this.submitEdit.bind(this)}
              >
                SAVE
              </Button>
              <Button
                bgColor='rgba(0,0,0,0)'
                color='white'
                hoverBgColor='rgba(0,0,0,0.1)'
                onClick={this.deleteClient.bind(this)}
              >
                DELETE
              </Button>
            </div>
            : null
        }
        <style jsx>{`
        .host {
          color: white;
        }
    
        .title {
          margin-bottom: 20px;
          margin-right: 30px;
          display: inline-block;
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
