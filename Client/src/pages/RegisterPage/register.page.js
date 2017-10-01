import React from 'react'

export default (props) => (
  <div className='host'>
    <h1>Register to Prello</h1>
    <form>
      <label>Name</label>
      <input
        type='text'
        placeholder='ex., Bob Radowsky'
      />
      <label>E-mail</label>
      <input
        type='text'
        placeholder='ex., bryan@inthekitchen.com'
      />
      <label>Password</label>
      <input
        type='password'
        placeholder='ex., ••••••••••••' />
      <label>Confirm password</label>
      <input
        type='password'
        placeholder='ex., ••••••••••••' />
      <div className='button'>Sign up</div>
    </form>
    <style jsx>{`
      .host {
        padding: 10px;
        width: 380px;
        margin-left: calc(50% - 190px);
        padding-top: 50px;
      }

      form {
        width: 380px;
        margin-top: 30px;
      }

      label {
        font-size: 18px;
        font-weight: bold;
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
      }

      .button {
        display: inline-block;
      }

      .forgottenPassword {
        margin-left: 20px;
      }


      
      `}</style>
  </div>
)
