import React from 'react'
import ChecklistItem from './ChecklistItem'

export default class Checklist extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      subtasks: []
    }
  }

  render () {
    return (
      <div className='Checklist'>
        <div class='progressBar' />
        <div class='actualProgressBar' />
        {this.state.subtasks.map(subTask => (<ChecklistItem content={subTask.content} />))}
      </div>
    )
  }
}
