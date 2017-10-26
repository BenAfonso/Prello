import React from 'react'
import Button from '../../UI/Button/Button'
import DropDown from '../../UI/DropDown/DropDown'
import Icon from '../../UI/Icon/Icon'

export default (props) => (
  <DropDown
    orientation='right'
    menuElements={[
      {
        action: null,
        placeholder: 'Rename list'
      },
      {
        action: null,
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
