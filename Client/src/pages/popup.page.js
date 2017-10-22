import React from 'react'

export default (props) => (
  <div className='host'>
    <div className='overlay' onClick={props.dismiss} />
    <div className='content'>
      {
        React.cloneElement(props.component)
      }
    </div>
    <style jsx>{`
      .host {
        position: absolute;
        left: 0;
        top: 0;
        height: 100vh;        
        width: 100vw;
        left: 0;
        top: 0;
        overflow-y: auto;
      }

      .overlay {
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        height: 100%;
        width: 100vw;
        background-color: rgba(0,0,0,0.6);
      }

      .content {
        position: absolute;
        width: 60%;
        z-index: 1001;
        min-width: 600px;
        min-height: 500px;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 50px;
        border-radius: 6px;
        background-color: white; 
        margin-bottom: 50px;
      }
    `}</style>
  </div>
)
