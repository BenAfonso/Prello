import React from 'react'
import styles from './BoardForm.styles'
import { addBoard } from '../../../../store/actions'
import Button from '../../../UI/Button/Button'

export default class BoardForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      shouldRedirect: false
    }
    this.submit = this.submit.bind(this)
  }

  submit (title) {
    if (this.title.value !== '') {
      addBoard(this.props.dispatch, this.title.value)
      this.props.onSubmit()
    }
  }

  render () {
    return (
      <div className='newBoardForm'>
        <span className='backButton' onClick={this.props.back}>Back</span>
        <ul>
          <li className='boardFormTitle'>
            Create a board
          </li>
          <li className='boardFormSeparator' />
          <li className='boardFormItem'>

            <p className='boardFormItemTitle'>Title</p>
            <form onSubmit={this.submit}>
              <input type='text' placeholder='Add a board...' ref={(t) => { this.title = t }} />
            </form>
          </li>

          <li className='boardFormSeparator' />
          <li className='boardFormItem'>
            <p className='boardFormItemTitle'>Team</p>
            <p className='boardFormItemBody'>Team are useful to share and work together in a easier way. Add a team.</p>
          </li >
          <li className='boardFormItem'>
            <p className='boardFormItemBody'>This board will be Public</p>
          </li>
          <li className='boardFormSeparator' />
          <li>
            <div className='newBoardFormButtons'>
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
