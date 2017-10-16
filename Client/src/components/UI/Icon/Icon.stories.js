import React from 'react'
import { storiesOf } from '@storybook/react'
import Icon from './Icon'
import { withKnobs, text, color, boolean } from '@storybook/addon-knobs'



storiesOf('Icon', module)
.addDecorator(withKnobs)
.add('Icon', () => (
  <Icon 
    color={color('color', '#fff')}
    name={text('name', 'star-o')}
    fontSize={text('fontSize', '20px')}
  />
))