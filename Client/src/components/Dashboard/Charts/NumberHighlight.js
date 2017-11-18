import React from 'react'

export default (props) => (
  <div className='host'>
    <div className='title'>{props.title}</div>
    <div className='value'>{props.value}</div>
    <style jsx>{`
    .host {
      height: 200px;
      width: 200px;
      background-color: white;
      border-radius: 6px;
      color: #666;
      padding: 20px;
      box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.2);
      transition: height 0.5s, width 0.5s, box-shadow 0.5s;
    }

    .host:hover {
      height: 205px;
      width: 205px;
      box-shadow: 4px 4px 9px rgba(0, 0, 0, 0.2);
      transition: height 0.5s, width 0.5s, box-shadow 0.5s;
    }

    .title {
      height: 20px;
      font-size: 16px;
      text-transform: uppercase;
    }

    .value {
      font-size: 80px;
      font-weight: bold;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
    `}</style>
  </div>
)
