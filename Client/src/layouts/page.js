import React from 'react'
import Header from '../components/Header/Header'
import Root from './root'

export default (props) => (
  <Root>
    <Header />
    <div className='content' style={{height: 'calc(100% - 50px)'}}>
      {props.children}
    </div>
  </Root>
)
