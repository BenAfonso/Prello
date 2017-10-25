import React from 'react'
import { storiesOf } from '@storybook/react'
import DropDown from './DropDown'
import { withKnobs } from '@storybook/addon-knobs'
import Button from '../Button/Button'

storiesOf('DropDown', module)
  .addDecorator(withKnobs)
  .add('DropDown', () => (
    <DropDown title={'Boards'} menuElements={[
      {
        action: null,
        placeholder: 'Menu item 1',
        description: 'BlablablabldiablablaBlablablabldiablablaBlablablabldiablabla'
      },
      'separator',
      {
        action: null,
        placeholder: 'Menu item 2'
      },
      {
        action: null,
        placeholder: 'Menu item 3'
      }
    ]}><Button>Open</Button></DropDown>
  ))
  .add('Simple DropDown', () => (
    <DropDown menuElements={[
      {
        action: null,
        placeholder: 'Menu item 1'
      },
      {
        action: null,
        placeholder: 'Menu item 2'
      },
      {
        action: null,
        placeholder: 'Menu item 3'
      }
    ]}><Button>Open</Button></DropDown>
  ))
  .add('Custom layout', () => (
    <DropDown title={'Custom dropdown'} layout={'custom'} button={<Button>ButtonInProps</Button>}>
      <div style={{ width: '340px' }}>
        <ul>
          <li>
            <label>This is a textbox example: </label>
            <input type='text' style={{ width: '100%', height: '30px', fontSize: '14px' }} />
          </li>
        </ul>
      </div>
    </DropDown>
  ))
