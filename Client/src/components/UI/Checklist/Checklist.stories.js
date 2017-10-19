import Checklist from './Checklist'
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

storiesOf('Checklist', module)
.addDecorator(withKnobs)
.add('Checklist', () => (
  <Checklist title='TODO checklist' />
))
