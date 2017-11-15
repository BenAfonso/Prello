import React from 'react'
import { ResponsiveContainer } from 'recharts'

export default (props) => (
  <div className='host'>
    <div className='container'>
      <div className='chart'>
        <ResponsiveContainer width='100%' height='100%'>
          { props.children }
        </ResponsiveContainer>
      </div>
    </div>
    <style jsx>{`
    .host {
      position: relative;
      background-color: white;
      border-radius: 6px;
      width: 100%;
      height: 100%;
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
