import React from 'react'
import PropTypes from 'prop-types'
import CardDetailsSection from '../../CardDetailsSection/CardDetailsSection'
import Checklist from '../../../../UI/Checklist/Checklist'
import Button from '../../../../UI/Button/Button'

export default class CardDetailsChecklists extends React.Component {
  static propTypes = {
    onDelete: PropTypes.func,
    checklists: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      index: PropTypes.number,
      title: PropTypes.string.isRequired,
      items: PropTypes.array
    }))
  }

  static defaultProps = {
    checklists: []
  }

  constructor (props) {
    super(props)
    this.deleteChecklist = this.deleteChecklist.bind(this)
  }

  deleteChecklist (index) {
    console.log('deleteChecklist cardDetailsChecklist ' + index)
    this.props.onDelete(index)
  }

  render () {
      return (
      <div className='host'>
        <CardDetailsSection title='Checklists' icon='check' />
        {this.props.checklists.map((checklist, index) => (
          <div className='checklist'>
            <Checklist index={parseInt(index, 10)} onDelete={this.deleteChecklist} key={checklist.index} title={checklist.title} items={checklist.items} />
          </div>
        ))}
        <style jsx>{`
        `}</style>
      </div>
    )
  }
}
