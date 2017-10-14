import React from 'react'
import { storiesOf } from '@storybook/react'
import DropdownButton from './DropdownButton'
import { withKnobs, text, color, boolean } from '@storybook/addon-knobs'
import Button from '../Button/Button'
storiesOf('DropdownButton', module)
.addDecorator(withKnobs)
.add('First', () => (
  <DropdownButton
    bgColor={color('bgColor', '#5AAC44')}
    color={color('color', '#fff')}
    bold={boolean('bold', true)}
  >
    <Button>Hello world</Button>
  </DropdownButton>
))
