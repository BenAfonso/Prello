import React from 'react'
import { storiesOf } from '@storybook/react'
import Notification from './Notification'
import { withKnobs, text, select } from '@storybook/addon-knobs'

storiesOf('Notification', module)
  .addDecorator(withKnobs)
  .add('Notification', () => (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#eee'
    }}>
      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px'
      }}>
        <Notification
          title={text('title', 'Information')}
          content={text('content', 'A new user just connected')}
          type={select('type', ['info', 'success', 'warning', 'error'], 'info')}
        />
      </div>
    </div>
  ))
