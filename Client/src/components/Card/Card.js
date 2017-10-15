import React from 'react'
import PropTypes from 'prop-types'
import styles from './Card.styles'
import CardDetails from '../CardDetails/CardDetails'

export default class Card extends React.Component {
  constructor(props){
    super(props)
    this.state={
      detailsOpen: false
    }
    this.toggleDetails = this.toggleDetails.bind(this)
  }
  static propTypes = {
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string
  }

  static defaultProps = {
  }


  toggleDetails(e){
    this.setState({
      detailsOpen: !this.state.detailsOpen
    })
    /*const foo = this.state.detailsOpen
    alert("gg "+foo)*/
  }

  shouldComponentUpdate(nextState){
    return this.state.detailsOpen != nextState.detailsOpen
  }

  render () {
    return (
      <div
        className='root'
        onClick={e => this.toggleDetails(e)}
      >
        { this.props.content }

        <style jsx>
          {styles}
        </style>
        <CardDetails cardTitle={this.props.content} isVisible={this.state.detailsOpen} onClose={() => this.toggleDetails}></CardDetails>
      </div>
    )
  }
}
