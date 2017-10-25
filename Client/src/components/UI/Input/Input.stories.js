import React from 'react'
import { storiesOf } from '@storybook/react'
import Input from './Input'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

storiesOf('Input', module)
  .addDecorator(withKnobs)
  .add('Input', () => (
    <Input
      placeholder={text('placeholder', 'e.g. placeholder')}
      height={text('height', '40px')}
      width={text('width', '200px')}
      color={text('color', '#444')}
      fontSize={text('fontSize', '18px')}
      centeredText={boolean('centeredText', false)}
    />
  ))
