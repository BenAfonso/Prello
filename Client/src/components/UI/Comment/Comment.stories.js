import React from 'react'
import { storiesOf } from '@storybook/react'
import Comment from './Comment'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

storiesOf('Comment', module)
  .addDecorator(withKnobs)
  .add('Comment', () => (
    <div style={{
      background: '#eee',
      padding: '20px'
    }}>
      <Comment
        username={text('username', 'BenAfonso')}
        initials={text('initials', 'BA')}
        thumbnail={text('thumbnail', '')}
        content={text('content', 'Still waiting for tasks, mockups, meetings, ...')}
        timestamp={text('timestamp', '19 Oct at 21:07')}
        canEdit={boolean('canEdit', false)}
        canDelete={boolean('canDelete', false)}
      />
    </div>
  ))
