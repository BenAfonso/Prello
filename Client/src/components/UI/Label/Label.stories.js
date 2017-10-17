import React from 'react'
import { storiesOf } from '@storybook/react'
import Label from './Label'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'



storiesOf('Label', module)
.addDecorator(withKnobs)
.add('Label', () => (
  <Label 
    labelText="Front-end"
    color="#61BD4F"
  />
))