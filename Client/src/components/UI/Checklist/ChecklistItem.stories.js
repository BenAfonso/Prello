import ChecklistItem from './ChecklistItem'
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

storiesOf('Checklist', module)
  .addDecorator(withKnobs)
  .add('ChecklistItem not checked', () => (
    <ChecklistItem index='1' content='TODO' />
  ))
  .add('ChecklistItem checked', () => (
    <ChecklistItem done index='2' content='TODO' />
  ))
