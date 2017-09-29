import React from 'react'
import Card from '../Card/Card'
import styles from './List.styles'

export default class List extends React.Component {
  render () {
    return (
      <div className='host'>
        <div className='title'>{this.props.title}</div>
        <Card content={'Finish Prello'} />
        <style jsx>{styles}</style>
      </div>
    )
  }
}
