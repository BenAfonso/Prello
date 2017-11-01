import React from 'react'
import { storiesOf } from '@storybook/react'
import Image from './Image'
import defaultAvatar from '../../../pages/ProfilePage/default-avatar.png'

storiesOf('Image', module)
  .add('Rounded image', () => (
    <Image rounded src={defaultAvatar} height='5%' width='5%' />
  ))
  .add('Non rounded image', () => (
    <Image src={defaultAvatar} height='5%' width='5%' />
  ))
