import React from 'react'
import Icon from '../../../UI/Icon/Icon'
import PropTypes from 'prop-types'

const CardDetailsSection = props => (
  <div className='host'>
    <div className='title'>
      <span className='icon'><Icon name={props.icon} color='#bbb' /></span>
      <h1>{props.title}</h1>
    </div>
    <div className='content'>
      { props.children }
    </div>
    <style jsx>{`
    h1 {
      font-size: 20px;
    }
    
    .host .title {
      height: 24px;
      line-height: 24px;
      width: 100%;
    }
    
    .host .title h2 {
      font-size: 16px;
    }
    
    .host .icon {
      position: absolute;
      left: 10px;
      font-size: 20px;
    }
    
    .host {
      margin-left: 40px;
      display: inline-block;
      width: calc(100% - 55px);
      margin-bottom: 40px;
    }
    `}</style>
  </div>
)

CardDetailsSection.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.any
}

export default CardDetailsSection
