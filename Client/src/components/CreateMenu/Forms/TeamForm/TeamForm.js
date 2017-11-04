import React from 'react'
import styles from './TeamForm.styles'
// import { addTeam } from '../../../../store/actions'
import Button from '../../../UI/Button/Button'

export default class TeamForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      shouldRedirect: false
    }
    this.submit = this.submit.bind(this)
  }

  submit (title) {
    if (this.title.value !== '') {
      // addTeam(this.props.dispatch)
      this.props.onSubmit()
    }
  }

  render () {
    return (
      <div className='newTeamForm'>
        <span className='backButton' onClick={this.props.back}>Back</span>
        <ul>
          <li className='teamFormTitle'>
            Create a team
          </li>
          <li className='teamFormSeparator' />
          <li className='teamFormItem'>
            <form onSubmit={this.submit}>
              <p className='teamFormItemTitle'>Name</p>
              <input type='text' placeholder='Add a team...' ref={(t) => { this.title = t }} />
              <p className='teamFormItemTitle'>Description</p>
              <textarea ref={(input) => { this.description = input }} />
            </form>
          </li>

          <li className='teamFormSeparator' />
          <li className='teamFormItem'>
            <p className='teamFormItemBody'>A team is a group of boards and people.</p>
          </li >
          <li>
            <div className='newTeamFormButtons'>
              <div>
                <Button
                  bgColor={'#5AAC44'}
                  gradient
                  bold
                  shadow
                  onClick={this.submit}>
                  Add
                </Button>
              </div>
              <div>
                <Button
                  bgColor={'#444'}
                  gradient
                  shadow
                  onClick={this.props.cancel}>
                  Cancel
                </Button>
              </div>
            </div>
          </li>
        </ul>
        <style jsx>{styles}</style>
      </div>
    )
  }
}
