import React from 'react'
import styles from './Header.styles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import CreateMenu from '../CreateMenu/CreateMenu'

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


        <CreateMenu />

        <div className='headerButton createBlock' >
          <span>N</span>
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  }
}
