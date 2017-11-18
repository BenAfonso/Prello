import React from 'react'
import { ResponsiveContainer } from 'recharts'

export default (props) => (
  <div className='host'>
    { props.title ? <div className='title'>{props.title}</div> : null }
    <div className='container'>
      <div className='chart'>
        <ResponsiveContainer width='100%' height='100%'>
          { props.children }
        </ResponsiveContainer>
      </div>
    </div>
    <style jsx>{`

    .title {
      position: absolute;
      top: -30px;
      left: 0;
      font-size: 24px;
      color: white;
      font-weight: bold;
    }

    .host {
      position: relative;
      margin-top: 30px;
      background-color: white;
      border-radius: 6px;
      width: 100%;
      height: 100%;
      box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.2);
    }

    .host:before {
      display: block;
      content: '';
      width: 100%;
      padding-top: 56.25%;
    }

    .host .container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .chart {
      width: 100%;
      height: 100%;
      padding: 20px 49px 21px 0px;
    }

    `}</style>
  </div>
)
