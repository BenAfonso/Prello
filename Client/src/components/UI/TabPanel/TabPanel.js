import React from 'react'
import PropTypes from 'prop-types'

export default class TabPanel extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
