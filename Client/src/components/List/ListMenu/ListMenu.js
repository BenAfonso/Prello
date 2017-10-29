import React from 'react'
import Button from '../../UI/Button/Button'
import DropDown from '../../UI/DropDown/DropDown'
import Icon from '../../UI/Icon/Icon'
import { displayNotification } from '../../../services/Notification.service'

export default (props) => (
  <DropDown
    orientation='right'
    menuElements={[
      {
        action: () => { displayNotification({title: 'Information', content: 'Not available yet!'}) },
        placeholder: 'Rename list'
      },
      {
        action: () => { displayNotification({title: 'Information', content: 'Not available yet!'}) },
        placeholder: 'Move list'
      },
      {
        action: () => { props.archive() },
        placeholder: 'Archive list'
      }]}>
    <Button
      bgColor='rgba(0,0,0,0)'
      color='#444'
      hoverBgColor='rgba(0,0,0,0.1)'
    >
      <Icon name='ellipsis-h' color='' />
    </Button>
  </DropDown>
)
