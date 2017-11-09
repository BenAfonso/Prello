import React from 'react'
import { login, storeToken, loginGoogle } from '../../services/Authentication.services'
import GoogleLogin from 'react-google-login'
import { Redirect } from 'react-router-dom'

export default class LoginPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToReferrer: false
    }
  }

  loginWithGoogle (googleResponse) {
    loginGoogle(googleResponse.code).then((response) => {
      storeToken(response.token)
      this.setState({ redirectToReferrer: true })
    }).catch((err) => {
      console.error(err)
    })
  }

  submitLogin () {
    login(this.email.value, this.password.value).then((response) => {
      storeToken(response.token)
      this.setState({ redirectToReferrer: true })
    }).catch((err) => {
      console.error(err)
    })
  }

  render () {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div className='host'>
        <h1>Login to Prello</h1>
        <form>
          <label>
          E-mail
          </label>
          <input type='text' placeholder='E-mail' ref={(e) => {
            this.email = e
          }} />
          <label>
          Password
          </label>
          <input type='password' placeholder='Passord' ref={(p) => {
            this.password = p
          }} />
          <div className='button' onClick={this.submitLogin.bind(this)}>
          Sign in
          </div>
          <a href='/#' className='forgottenPassword'>Forgotten password?</a>
        </form>
        <GoogleLogin
          clientId='532471730394-bh1qi5q6hkh0c13quao0ptplp8sidfjb.apps.googleusercontent.com'
          scope='email profile'
          buttonText='Sign in with Google'
          responseType='code'
          onSuccess={this.loginWithGoogle.bind(this)}
        />
        <style jsx>
          {`
      .host {
        padding: 10px;
        width: 380px;
        margin-left: calc(50% - 190px);
        margin-top: 50px;
      }

      form {
        width: 380px;
        margin-top: 30px;
      }

      label {
        font-size: 20px;
      }

      input {
        width: 100%;
        background-color: #eee;
        border: 1px solid rgba(0,0,0,0.2);
        padding: 8px;
        margin-top: 8px;
        font-size: 20px;
        border-radius: 5px;
        display: block;
        margin-bottom: 20px;
        box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
      }

      .button {
        cursor: pointer;
        height: 40px;
        font-weight: bold;
        line-height: 40px;
        text-align: center;
        color: white;
        width: 30%;
        border-radius: 5px;
        background-color: #61bd4f;
        box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
        margin-bottom: 15px;
      }

      .button {
        display: inline-block;
      }

      .forgottenPassword {
        margin-left: 20px;
      }

      .google-auth {
        margin-top: 20px;
      }

      .google-button {
        background: white;
        box-shadow: 0px 0px 3px rgba(0,0,0,0.3);
        height: 40px;
        margin-top: 10px;
        line-height: 40px;
        padding: 10px;
        border-radius: 4px;

      }
      `}
        </style>
      </div>
    )
  }
}
