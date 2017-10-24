import React from 'react'
import { storiesOf } from '@storybook/react'
import Label from './Label'

storiesOf('Label', module)
.add('Front-end', () => (
  <Label labelText='Front-end'
    backgroundColor='#61BD4F'
  />
))
