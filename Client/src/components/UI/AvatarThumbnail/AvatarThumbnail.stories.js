import React from 'react'
import { storiesOf } from '@storybook/react'
import AvatarThumbnail from './AvatarThumbnail'
import { withKnobs, text, color } from '@storybook/addon-knobs'

storiesOf('AvatarThumbnail', module)
.addDecorator(withKnobs)
.add('Default with Initials', () => (
  <AvatarThumbnail
    initials={text('initials', 'BA')}
  />
))
.add('Custom size', () => (
  <AvatarThumbnail
    size={text('size', '100px')}
    fontSize={text('fontSize', '50px')}
    initials={text('initials', 'BA')}
  />
))
.add('Custom colors', () => (
  <AvatarThumbnail
    initials={text('initials', 'BA')}
    bgColor={color('bgColor', '#444')}
    color={color('color', '#FFF')}
  />
))
.add('Background image', () => (
  <AvatarThumbnail
    initials={text('initials', 'BA')}
    size={text('size', '50px')}
    thumbnail={'https://randomuser.me/api/portraits/men/33.jpg'}
  />
))
