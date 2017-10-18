import React from 'react'
import { storiesOf } from '@storybook/react'
import Label from './Label'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'



storiesOf('Label', module)
.addDecorator(withKnobs)
.add('Front-end', () => (
  <Label 
    labelText="Front-end"
    backgroundColor="#61BD4F"
  />
))

.add('Back-end', () => (
  <Label 
    labelText="Back-end"
    backgroundColor="#ffe84c"
  />
))