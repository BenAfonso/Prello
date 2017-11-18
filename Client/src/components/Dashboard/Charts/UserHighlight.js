import React from 'react'

export default (props) => (
  <div className='host'>
    <div className='title'>{props.title}</div>
    <div className='content'>
      <div className='user-image' style={{
        backgroundImage: `url(${props.user.picture})`
      }} />
      <div className='user-name'>{props.user.name}</div>
    </div>
    <style jsx>{`
    .host {
      position: relative;
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

    .user-image {
      height: 80px;
      width: 80px;
      margin-top: 27px;
      margin-left: calc(50% - 40px);
      border-radius: 50%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }

    .user-name {
      position: absolute;
      bottom: 10px;
      left: 0;
      width: 100%;
      font-size: 17px;
      text-align: center;
    }
    `}</style>
  </div>
)
