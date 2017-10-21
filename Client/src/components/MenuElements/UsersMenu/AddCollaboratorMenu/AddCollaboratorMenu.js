import React from 'react'
import { connect } from 'react-redux'

import Button from '../../../UI/Button/Button'
import DropDown from '../../../UI/DropDown/DropDown'
import Icon from '../../../UI/Icon/Icon'
import Input from '../../../UI/Input/Input'

export default (props) => { 
  return (
    <div className='host'>
      <DropDown
        layout='custom'
        orientation='left'
        button={<Button width='100%'><Icon color='#fff' name='user-plus' fontSize='20px' />Add a collaborator</Button>}
        title='Collaborators'>
        <div style={{ width: '300px' }}>
          <ul>
            <li className='element'>
              <div className='element-text'>Enter a name or an e-mail address to invite someone new !</div>
              <div className='element-input'>
                <Input height='20px' placeholder='georges.abitbol@mondedem.fr' />
              </div>
              <div className='element-button'>
                <Button
                  bgColor='#5AAC44'
                  block
                >
                  Add
                </Button>
              </div>
            </li>
            <li className='separator' />
            <li className='element'>
              <div className='element-text'>Invite people by giving them a link</div>
            </li>
          </ul>
        </div>
      </DropDown>
      <style jsx>{`
    .element {
      padding: 15px;
    }

    .element-input {
      padding: 8px 0px;
    }

    .element-button {
      padding: 8px 0;
    }

    .separator {
      content: '';
      height: 1px;
      padding: 0;
      background-color: #aaa;
      width: 90%;
      margin: 8px 0 8px 5%;
    }
    `}</style>
    </div>
  )
}
