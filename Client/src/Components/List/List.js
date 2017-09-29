import React from 'react'
import Card from '../Card/Card'

export default class List extends React.Component {
  render () {
    return (
      <div>
        {this.props.title}
        <Card content={'Finish Prello'} />
      </div>
    )
  }
}
