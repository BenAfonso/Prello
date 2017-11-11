import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Label from '../Label/Label'
import styles from './LabelDropdown.styles'

export default class LabelDropdown extends React.Component {
  static propTypes = {
    width: PropTypes.string,
    color: PropTypes.string,
    style: PropTypes.object,
    backgroundColor: PropTypes.string,
    fontWeight: PropTypes.string,
    boardLabels: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      color: PropTypes.string
    })),
    onAddLabelCard: PropTypes.func
  }

  static defaultProps = {
    height: '459px',
    width: '302px',
    color: '#fff',
    backgroundColor: null,
    fontWeight: 'bold',
    borderRadius: '3px',
    fontSize: '12px',
    centeredText: true,
    boardLabels: []
  }

  constructor (props) {
    super(props)
    this.state = {
      displayLabelCreationForm: false
    }

    this.displayLabelForm = this.displayLabelForm.bind(this)
    this.addLabel = this.addLabel.bind(this)
    this.deleteLabel = this.deleteLabel.bind(this)
    this.addLabelWithAxios = this.addLabelWithAxios.bind(this)
  }

  displayLabelForm () {
    this.setState({
      displayLabelCreationForm: !this.state.displayLabelCreationForm
    })
  }

  addLabel () {
    let newBoardLabels = this.props.boardLabels.slice()
    newBoardLabels.push({label: this.labelTitle.input.value, color: this.labelColor.input.value})
    this.setState({
      displayLabelCreationForm: !this.state.displayLabelCreationForm,
      boardLabels: newBoardLabels
    })
  }

  addLabelWithAxios () {
    this.props.onAddBoardLabel(this.labelTitle.input.value, this.labelColor.input.value)
  }

  deleteLabel (id) {
    let newBoardLabels = this.state.boardLabels.slice().filter(label => label['label'] !== id)
    this.setState({
      displayLabelCreationForm: !this.state.displayLabelCreationForm,
      boardLabels: newBoardLabels
    })
  }

  render () {
    const {
      height,
      width,
      color,
      backgroundColor,
      fontWeight,
      borderRadius,
      fontSize,
      ...props
    } = this.props

    props.style = {
      height,
      width,
      color,
      backgroundColor,
      fontWeight,
      borderRadius,
      fontSize
    }
    return (
      <div style={props.style}>
        <div>
          <ul>
            {this.props.labels.map(e => <li class='line'><Label isItem={ true } labelId={e['_id']} labelText={e['name']} backgroundColor={e['color']} /></li>)}
          </ul>
          <style jsx>{styles}</style>
        </div>
        <div>
          <Button onClick={this.displayLabelForm}>Create label</Button>
          {this.state.displayLabelCreationForm
            ? <div>
              <Input ref={(v) => { this.labelTitle = v } } placeholder='Label title'/>
              <Input ref={(v) => { this.labelColor = v } } placeholder='#c5c5c5'/>
              <Button onClick={this.addLabelWithAxios}>Save Label</Button>
            </div> : null}
        </div>
      </div>
    )
  }
}
