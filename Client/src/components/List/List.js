import React from 'react'
import Card from '../Card/Card'
import styles from './List.styles'
import { connect } from 'react-redux'
import { addCard } from '../../store/actions'

@connect(store => {
  return {
    board: store.currentBoard
  }
})
export default class List extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      newCardFormDisplayed: false,
      cards: ['Finish Prello', 'Say Hi']
    }

    this.addCard = this.addCard.bind(this)
    this.displayNewCardForm = this.displayNewCardForm.bind(this)
    this.undisplayNewCardForm = this.undisplayNewCardForm.bind(this)
    this.clearForm = this.clearForm.bind(this)
  }

  displayNewCardForm () {
    this.setState({
      newCardFormDisplayed: true
    })
  }

  undisplayNewCardForm () {
    this.setState({
      newCardFormDisplayed: false
    })
  }

  clearForm () {
    this.newCardTitle = ''
  }

  addCard () {
    if (this.newCardTitle !== '') {
      console.log('text = '+this.newCardTitle.value)
      addCard(this.props.dispatch, this.newCardTitle.value)
      this.clearForm()
    }
    this.undisplayNewCardForm()
  }

  render () {
    return (
      <div className='host'>
        <div className='title'>{this.props.title}</div>
        <ul>
          {
            this.props.cards.map((card, i) => (
              <li key={i}><Card content={card.description} /></li>
            ))
          }
          <li>
            {
              this.state.newCardFormDisplayed
              ? <div className='newCardForm'>
                <form onSubmit={this.addCard}>
                  <textarea
                    ref={(t) => { this.newCardTitle = t }}
                  />
                </form>
                <div className='newCardFormButtons'>
                  <div className='button confirm'
                    onClick={this.addCard}>
                    Add
                    </div>
                  <div className='button cancel'
                    onClick={this.undisplayNewCardForm}>
                    Cancel
                  </div>
                </div>
              </div>
              : <li className='newCardButton' onClick={this.displayNewCardForm}>Add a card...</li>
            }
          </li>
        </ul>
        <style jsx>{styles}</style>
      </div>
    )
  }
}
