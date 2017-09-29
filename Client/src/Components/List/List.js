import React from 'react'
import Card from '../Card/Card'
import styles from './List.styles'

export default class List extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cards: ['Finish Prello', 'Say Hi']
    }

    this.addCard = this.addCard.bind(this)
  }

  addCard () {
    let newCards = this.state.cards
    newCards.push('')
    this.setState({
      card: newCards
    })
  }
  render () {
    return (
      <div className='host'>
        <div className='title'>{this.props.title}</div>
        <ul>
          {
            this.state.cards.map((card, i) => (
              <li key={i}><Card content={card} /></li>
            ))
          }
          <li onClick={this.addCard}>Add a card</li>
        </ul>
        <style jsx>{styles}</style>
      </div>
    )
  }
}
