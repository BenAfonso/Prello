import React from 'react'
import PropTypes from 'prop-types'
import CardDetailsSection from '../../CardDetailsSection/CardDetailsSection'
import Checklist from '../../../../UI/Checklist/Checklist'

export default class CardDetailsChecklists extends React.Component {
  static propTypes = {
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

  render () {
      return (
      <div className='host'>
        <CardDetailsSection title='Checklists' icon='check' />
        {this.props.checklists.map((checklist, index) => (
          <Checklist key={index} title={checklist.title} items={checklist.items} />
        ))}
        <style jsx>{`
        `}</style>
      </div>
    )
  }
}
