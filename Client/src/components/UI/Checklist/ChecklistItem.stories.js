import ChecklistItem from './ChecklistItem'
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

storiesOf('Checklist', module)
.addDecorator(withKnobs)
.add('ChecklistItem', () => (
  <ChecklistItem id='1' content='TODO' />
))
