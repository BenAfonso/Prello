import React from 'react'
import { storiesOf } from '@storybook/react'
import TeamListElement from './TeamListElement'
import { withKnobs, text } from '@storybook/addon-knobs'

storiesOf('TeamListElement', module)
  .addDecorator(withKnobs)
  .add('Team list element', () => (
    <TeamListElement
      team={{_id: 1,
        name: text('Name', 'SKT T1'),
        visibility: 'Private',
        users: ['Toto'],
        admins: [{
          name: 'admin 1',
          picture: 'http://img1.ak.crunchyroll.com/i/spire1/8b932d60445bf42e195e69f713cc3eb41483557865_large.jpg'
        }],
        boards: [],
        description: text('Description', 'Description')}}
    />
  ))
