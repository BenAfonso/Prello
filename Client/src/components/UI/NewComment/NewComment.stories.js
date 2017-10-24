import React from 'react'
import { storiesOf } from '@storybook/react'
import NewComment from './NewComment'
import { withKnobs, text } from '@storybook/addon-knobs'

storiesOf('NewComment', module)
.addDecorator(withKnobs)
.add('NewComment', () => (
  <div style={{
    background: '#eee',
    padding: '20px'
  }}>
    <NewComment
      username={text('username', 'BenAfonso')}
      initials={text('initials', 'BA')}
      thumbnail={text('thumbnail', '')}
      handleSubmit={(c) => { console.log(c) }}
    />
  </div>
))
