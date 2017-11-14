import React from 'react'

export default (props) => (
  <div className='host' onClick={props.onClick}>
    <div className='file-icon'>{props.ext}</div>
    <div className='file-name'>{props.name}</div>
    <style jsx>{`

    .host {
      width: 100px;
      cursor: pointer;
    }

    .file-icon {
      height: 50px;
      width: 40px;
      margin-left: 30px;
      border-radius: 5px;
      background-color: gray;
      text-transform: uppercase;
      color: rgba(255,255,255,0.5);
      font-weight: bold;
      text-align: center;
      line-height: 50px;
    }

    .file-name {
      font-size: 8px;
      line-break: word-wrap;
      text-align: center;
    }
    `}</style>
  </div>
)
