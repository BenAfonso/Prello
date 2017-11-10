import React from 'react'
import {createOAuthClient} from '../../../services/OAuthClient.service'
import Button from '../../UI/Button/Button'
import {connect} from 'react-redux'
import {addOAuthClient} from '../../../store/actions'

@connect(store => {
  return {
    developers: store.developers
  }
})
export default class AddNewClientForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      newClient: undefined
    }
  }
  addClient () {
    createOAuthClient(this.name.value, this.redirectUri.value).then(client => {
      addOAuthClient(client)
      this.setState({
        newClient: client
      })
      this.clearForm()
    })
  }

  clearForm () {
    this.name.value = ''
    this.redirectUri.value = ''
    this.renderNewClient = this.renderNewClient.bind(this)
  }

  renderNewClient () {
    return (
      <div className='new-client'>
        <label>Client name</label>
        <div>{this.state.newClient.name}</div>
        <label>Client ID</label>
        <div>{this.state.newClient.client_id}</div>
        <label>Client secret</label>
        <div>{this.state.newClient.client_secret}</div>
        <label>Redirect URI</label>
        <div>{this.state.newClient.redirectUris[0]}</div>
        <style jsx>{`
        .new-client {
          display: inline-block;
          color: white;
          padding-right: 50px;
          float: right; 
        }

        label {
          font-weight: bold;
        }
        `}</style>
      </div>
    )
  }

  render () {
    return (
      <div className='host'>
        <form>
          <div className='input'>
            <label>
              Client name:
            </label>
            <input type='text' ref={n => { this.name = n }} placeholder='ex., TheMightyPrelloDashboard' />
          </div>
          <div className='input'>
            <label>
              Redirect URI:
            </label>
            <input type='text' ref={r => { this.redirectUri = r }} placeholder='ex., https://themightyprello.igpolytech.fr' />
          </div>
          <Button
            bgColor={'#5AAC44'}
            gradient
            bold
            shadow
            onClick={this.addClient.bind(this)}>
              Add
          </Button>
        </form>
        {
          this.state.newClient
            ? this.renderNewClient()
            : null
        }
        <style jsx>{`

        .host {
          width: 100%;
        }

        form {
          display: inline-block;
          width: 250px;
        }

        label {
          display: block;
          color: white;
          font-weight: bold;
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
