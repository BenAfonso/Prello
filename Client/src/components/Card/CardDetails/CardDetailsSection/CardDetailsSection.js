import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../../../UI/Icon/Icon'

const CardDetailsSection = props => (
  <div className='host'>
    {
      props.title
        ? <div className='title'>
          <span className='icon'><Icon name='list-alt' color='#bbb' /></span>
          <h1>{props.title}</h1>
        </div>
        : null
    }
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
      width: calc(100% - 140px);
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
