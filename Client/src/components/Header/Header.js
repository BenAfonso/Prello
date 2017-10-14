import React from 'react'
import styles from './Header.styles'
import PropTypes from 'prop-types'
import { addBoard } from '../../store/actions'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  static propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string
  }

  static defaultProps = {
    bgColor: '#ae4d7b',
    color: 'white'
  }

  constructor(props) {
    super(props)

    this.toggleCreate = this.toggleCreate.bind(this)
  }


  toggleCreate() {
    if (true) {
      addBoard(this.props.dispatch, 'New Board')
    }
  }



  render() {


    return <div className='host' style={{
      backgroundColor: this.props.bgColor,
      color: this.props.color
    }}>

      <Link to='/'>
        <span id='title'>Prello</span>
      </Link>


      <div className='headerButtonBar'>
        <div className='headerButton createBlock' onClick={this.toggleCreate}>
          <span>+</span>
        </div>

        <div className='headerButton notificationBlock'>
          <span>N</span>
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  }
}
