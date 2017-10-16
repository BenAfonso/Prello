import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from './Button'
import { withKnobs, text, color, boolean } from '@storybook/addon-knobs'
import Icon from '../Icon/Icon'

storiesOf('Button', module)
.addDecorator(withKnobs)
.add('Plain button', () => (
  <Button
    bgColor={color('bgColor', '#5AAC44')}
    color={color('color', '#fff')}
    bold={boolean('bold', true)}
  >
    {text('Label', 'A simple button')}
  </Button>
))
.add('With shadow and gradient', () => (
  <Button
    bgColor={color('bgColor', '#5AAC44')}
    color={color('color', '#fff')}
    shadow={boolean('shadow', true)}
    gradient={boolean('gradient', true)}
  >
    {text('Label', 'With shadow & gradient')}
  </Button>
))
.add('Custom gradient', () => (
  <Button
    bgColor={color('bgColor', '#81247A')}
    bgColorTo={color('bgColorTo', '#303993')}
    color={color('color', '#fff')}
    shadow={boolean('shadow', true)}
  >
    {text('Label', 'Custom gradient')}
  </Button>
))
.add('Custom dimensions', () => (
  <Button width={text('Width', '300px')} height={text('height', '300px')}>
    I can be any size and the text is centered and multiline
  </Button>
))
.add('Disabled', () => (
  <Button bgColor={color('bgColor', '#81247A')}
    bgColorTo={color('bgColorTo', '#303993')}
    color={color('color', '#fff')}
    shadow={boolean('shadow', true)}
    disabled={boolean('disabled', true)}
  >
    Disabled
  </Button>
))
.add('With icon', () => (
  <Button
  bgColor={color('bgColor', 'rgba(0,0,0,0.3)')}
  color={color('color', '#fff')}
  bold={boolean('bold', true)}
>
  <Icon name='ellipsis-h' color='#fff' />
</Button>
))
.add('Custom hover color', () => (
  <Button
  bgColor={color('bgColor', 'rgba(0,0,0,0.3)')}
  color={color('color', '#fff')}
  bold={boolean('bold', true)}
  hoverBgColor={color('hoverBgColor', 'rgba(0,0,0,0.1)')}
  hoverColor={color('hoverColor', 'rgba(0,0,0,0.1)')}
>
  Custom hover
</Button>
))

