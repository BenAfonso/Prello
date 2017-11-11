import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Label from '../Label/Label'

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
    }))
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
    this.addLabelDistant = this.addLabelDistant.bind(this)
  }

  displayLabelForm () {
    this.setState({
      displayLabelCreationForm: !this.state.displayLabelCreationForm
    })
  }

  componentDidMount () {
  }

  addLabelDistant () {
    this.displayLabelForm()
    this.props.onAddBoardLabel(this.labelTitle.input.value, this.labelColor.value)
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

    if (!this.state.displayLabelCreationForm) {
      return (
        <div style={props.style}>
          <div style={{ marginLeft: '30%', marginTop: '30px', position: 'absolute' }}>
            <div>
              <ul>
                {this.props.labels.map(e => <li class='line'><Label cardLabels={this.props.cardLabels} onDeleteCardLabel={this.props.onDeleteCardLabel} onAddCardLabel={this.props.onAddCardLabel} onUpdateBoardLabel={this.props.onUpdateBoardLabel} onDeleteBoardLabel={this.props.onDeleteBoardLabel} isItem={ true } labelId={e['_id']} labelText={e['name']} backgroundColor={e['color']} /></li>)}
              </ul>
            </div>
            <div>
              <Button bgColor='#28AF28' onClick={this.displayLabelForm}>New label</Button>
            </div>
          </div>
        </div>
      )
    } else if (this.state.displayLabelCreationForm) {
      return (
        <div style={props.style}>
          <div>
            <div>
              <Input ref={(v) => { this.labelTitle = v } } placeholder='Label title'/>
              <input type='color' ref={(v) => { this.labelColor = v } } placeholder='#c5c5c5'/>
            </div>
            <div style={{ display: 'flex' }}>
              <Button bgColor='#28AF28'onClick={this.addLabelDistant}>Save</Button>
              <Button bgColor='#e73333' onClick={this.displayLabelForm}>Cancel</Button>
            </div>
          </div>
        </div>
      )
    }
  }
}
