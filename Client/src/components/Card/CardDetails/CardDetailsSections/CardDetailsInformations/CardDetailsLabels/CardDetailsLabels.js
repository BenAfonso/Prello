import React from 'react'
import Icon from '../../../../../UI/Icon/Icon'

const CardDetailsLabels = props => (
  <ul>
    {
      <li>
        <div className='label' style={{ backgroundColor: 'orange' }} />
      </li>
    }
    <li>
      <div className='addButton'>
        <Icon name='plus' fontSize='15px' color='#aaa' />
      </div>
    </li>
    <style jsx>
      {`
  ul {
    list-style-type: none;
    display: flex;
  }

  ul li {
    margin-right: 5px;
  }

  .label {
    height: 30px;
    width: 40px;
    border-radius: 3px;
  }

  .addButton {
    height: 30px;
    width: 30px;
    background-color: #eee;
    border-radius: 3px;
    text-align: center;
  }
  
  .addButton:hover {
    background-color: #ddd;
  }
    `}
    </style>
  </ul>
)

CardDetailsLabels.propTypes = {
}

export default CardDetailsLabels
