import React from 'react'
import Button from '../../UI/Button/Button'
import Icon from '../../UI/Icon/Icon'

export default (props) => (
  <div className='host'>
    <div className='cardTitle'>
      <h1> Card {props.content} </h1>
    </div>
    <div style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={props.handleClick}>
      <Button bgColor='rgba(0,0,0,0)' hoverBgColor='rgba(0,0,0,0.1)'><Icon name='times' /></Button>
    </div>
    <div>

      <div className='content' />
      <div className='buttons'>
        <ul>
          <li><Button
            bgColor='#eee' hoverBgColor='#ddd' block shadow size='x-small'>Members</Button></li>
          <li><Button
            bgColor='#eee' hoverBgColor='#ddd' block shadow size='x-small'>Labels</Button></li>
          <li><Button
            bgColor='#eee' hoverBgColor='#ddd' block shadow size='x-small'>Checklist</Button></li>
          <li><Button
            bgColor='#eee' hoverBgColor='#ddd' block shadow size='x-small'>Due Date</Button></li>
          <li><Button
            bgColor='#eee' hoverBgColor='#ddd' block shadow size='x-small'>Attachment</Button></li>
        </ul>
      </div>

    </div>
    <style jsx>{`
    .host {
      position: relative;
      width: 100%;
      height: 140vh;
      background-color: white;
      borderRadius: 8px;
      padding: 20px;
      border-radius: 8px;
      overflow-y: auto;
    }

    .cardTitle {
      height: 30px;
      line-height: 30px;
      width: 100%;
      text-align: center;
    }

    .content {
      background: red;
      display: inline-block;
      width: calc(100% - 100px);
      height: 100%;
    }

    .buttons {
      display: inline-block;
      width: 100px;
    }
    
    li {
      width: 100%;
      margin-bottom: 12px;
    }


  `}</style>
  </div>
)
