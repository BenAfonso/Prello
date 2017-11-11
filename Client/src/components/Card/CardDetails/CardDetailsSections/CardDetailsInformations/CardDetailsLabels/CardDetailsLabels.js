import React from 'react'
import Icon from '../../../../../UI/Icon/Icon'
import Label from '../../../../../UI/Label/Label'
import PropTypes from 'prop-types'

export default class CardDetailsLabels extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showDropdown: false,
      labels: props.labels
    }
    this.onAddLabelCard = this.onAddLabelCard.bind(this)
  }

  static propTypes = {
    labels: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      color: PropTypes.string
    }))
  }

  static defaultProps = {
    labels: [{label: 'Blue', color: '#1c5fcc'}, {label: 'Red', color: '#cc1b53'}, {label: 'Green', color: '#1dcc1a'}]
  }

  displayLabelDropdown () {
    this.setState({
      showDropdown: !this.state.showDropdown
    })
  }

  onAddLabelCard (labelText, labelColor) {
    let newBoardLabels = this.state.labels.slice()
    newBoardLabels.push({label: labelText, color: labelColor})
    this.setState({
      labels: newBoardLabels
    })
  }
  render () {
    return (
      <ul>
        {this.props.cardLabels.map(label => <li><Label isThumbnail={true} labelText={label['name']} backgroundColor={label['color']} /></li>)}
        <li>
          <div className='addButton' onClick={null}>
            <Icon name='plus' fontSize='15px' color='#aaa' />
          </div>
        </li>
        <style jsx>
          {`
      ul {
        list-style-type: none;
        display: flex;
      }
  
      ul li {
      margin-right: 5px;
      }
  
      .label {
        height: 30px;
        width: 40px;
        border-radius: 3px;
      }
  
      .addButton {
        height: 30px;
        width: 30px;
        background-color: #eee;
        border-radius: 3px;
        text-align: center;
      }
    
      .addButton:hover {
        background-color: #ddd;
      }
        `}
        </style>
      </ul>)
  }
}
