import React from 'react'
import { login } from '../../services/Authentication.services'
import axios from 'axios'

export default (props) => {
  const loginWithGoogle = () => {
    axios.get('http://localhost:3333/auth/google').then((res) => {
      console.log(res.data)
    })
  }

  const submitLogin = () => {
    login(this.email.value, this.password.value).then(() => {
      alert('LOGGED IN')
    }).catch((err) => {
      console.error(err)
      alert('ERROR')
    })
  }

  return (
    <div className='host'>
      <h1>Login to Prello</h1>
      <form>
        <label>
          E-mail
        </label>
        <input type='text' placeholder='E-mail' ref={;(e) => {
                                                       this.email = e}} />
        <label>
          Password
        </label>
        <input type='password' placeholder='Passord' ref={;(p) => {
                                                            this.password = p}} />
        <div className='button' onClick={submitLogin}>
          Sign in
        </div>
        <a href='/#' className='forgottenPassword'>Forgotten password?</a>
      </form>
      <div className='google-auth'>
        <div>
          Or you can also log in with Google
        </div>
        <a className='google-button' onClick={loginWithGoogle}>Log in with Google</a>
      </div>
      <style jsx>
        {`
      .host {
        padding: 10px
        width: 380px
        margin-left: calc(50% - 190px)
        margin-top: 50px
      }

      form {
        width: 380px
        margin-top: 30px
      }

      label {
        font-size: 20px
      }

      input {
        width: 100%
        background-color: #eee
        border: 1px solid rgba(0,0,0,0.2)
        padding: 8px
        margin-top: 8px
        font-size: 20px
        border-radius: 5px
        display: block
        margin-bottom: 20px
        box-shadow: 1px 1px 3px rgba(0,0,0,0.3)
      }

      .button {
        cursor: pointer
        height: 40px
        font-weight: bold
        line-height: 40px
        text-align: center
        color: white
        width: 30%
        border-radius: 5px
        background-color: #61bd4f
        box-shadow: 1px 1px 3px rgba(0,0,0,0.3)
      }

      .button {
        display: inline-block
      }

      .forgottenPassword {
        margin-left: 20px
      }

      .google-auth {
        margin-top: 20px
      }

      .google-button {
        background: white
        box-shadow: 0px 0px 3px rgba(0,0,0,0.3)
        height: 40px
        margin-top: 10px
        line-height: 40px
        padding: 10px
        border-radius: 4px

      }
      `}
      </style>
    </div>
  )
}
