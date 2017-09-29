import React from 'react'
import Header from '../components/Header/Header'

export default (props) => (
  <div style={{height: '100%'}}>
    <Header />
    <div className='content' style={{height: 'calc(100% - 50px)'}}>
      {props.children}
    </div>
  </div>
)
