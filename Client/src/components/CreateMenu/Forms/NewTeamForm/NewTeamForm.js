import React from 'react'
import Button from '../../../UI/Button/Button'
import DropDown from '../../../UI/DropDown/DropDown'
import { addTeam } from '../../../../store/actions'

export default class NewTeamForm extends React.Component {
  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit (name) {
    if (this.name.value !== '') {
      addTeam(this.name.value)
    }
  }

  render () {
    const { button } = this.props
    return (
      <div className='host'>
        <DropDown
          layout='custom'
          orientation='right'
          button={button}
          title='Create Team'>
          <div style={{ width: '300px' }}>
            <ul>
              <li className='element'>
                <div className='element-title'>Name</div>
                <div className='element-input'>
                  <form onSubmit={this.submit}>
                    <input type='text' placeholder='Add a team...' ref={(t) => { this.name = t }} />
                  </form>
                </div>
              </li>
              <li className='separator' />
              <li className='element'>
                <div className='element-text'>A team is a group of boards and people</div>
                <div className='add-button'>
                  <Button
                    bgColor={'#5AAC44'}
                    gradient
                    bold
                    shadow
                    block
                    onClick={this.submit}>
                    Add
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </DropDown>
        <style jsx>{`

    .host {
      width: 100%;
      display:flex;
    }

    .element {
      padding: 5px 15px;
    }

    .element-title{
      font-weight: bold;
      padding: 4px 0;
    }

    .element-text {
      padding: 4px 0px;
      font-size: 15px;
    }

    .add-button {
      width: 100%;
      padding: 10px 0;
    }

    .element-input input {
      font-size: inherit;
      width: 100%;
      padding: 8px;
      border-radius: 3px;
      border: 1px solid rgba(0,0,0,0.2);
      box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
    }

    .separator {
      content: '';
      height: 1px;
      padding: 0;
      background-color: #aaa;
      width: 90%;
      margin: 8px 0 8px 5%;
    }
    `}</style>
      </div>
    )
  }
}
