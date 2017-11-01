import React from 'react'
import PropTypes from 'prop-types'

export default class Image extends React.Component {
  static propTypes = {
    rounded: PropTypes.boolean,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
  }

  static defaultProps = {
    rounded: false,
    alt: '',
    width: '20px',
    height: '20px'
  }

  render () {
    const styles = this.props.rounded ? {borderRadius: '50%'} : {borderRadius: '0%'}
    styles.width = this.props.width
    styles.height = this.props.height
    return (
      <img src={this.props.src} style={styles} alt={this.props.alt} />
    )
  }
}
