import Checklist from './Checklist'
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

storiesOf('Checklist', module)
.addDecorator(withKnobs)
.add('Checklist', () => (
  <Checklist title='TODO checklist' />
))
.add('Checklist with pre-set items', () => (
  <Checklist title='TODO checklist' items={[{index: 1, content: 'Item 1', done: false}, {index: 2, content: 'Item 2', done: true}]} />
))
