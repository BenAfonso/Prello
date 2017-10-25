import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, color } from '@storybook/addon-knobs'
import Header from './Header'

storiesOf('Header', module)
  .addDecorator(withKnobs)
  .add('Header', () =>
    <Header
      bgColor={color('bgColor', 'orange')}
      color={color('color', 'white')} />
  )
