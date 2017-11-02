import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Button from '../Button/Button'
import Input from '../Input/Input'
import LabelItem from '../LabelItem/LabelItem'
import Label from '../Label/Label'

export default class LabelDropdown extends React.Component {
  
  static propTypes = {
    width: PropTypes.string,
    color: PropTypes.string,
    style: PropTypes.object,
    backgroundColor: PropTypes.string,
    fontWeight: PropTypes.string,
    boardLabels: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      color: PropTypes.string
    }))
  }



  static defaultProps = {
    height: '459px',
    width: '302px',
    color: '#fff',
    backgroundColor: '#c8c8c8',
    fontWeight: "bold",
    borderRadius: "3px",
    fontSize: '12px',
    centeredText: true,
    boardLabels: [{label: "Blue", color: "#1c5fcc"}, {label: "Red", color: "#cc1b53"}, {label: "Green", color: "#1dcc1a"}]
  }

  constructor (props) {
    super(props)
    this.state = {
      displayLabelCreationForm: false,
      boardLabels: props.boardLabels
    }
    this.displayLabelForm = this.displayLabelForm.bind(this)
    this.addLabel = this.addLabel.bind(this)
    this.deleteLabel = this.deleteLabel.bind(this)
  }

  /*shouldComponentUpdate(nextState){
    return this.state.boardLabels != nextState.boardLabels
  }*/

  displayLabelForm () {
    this.setState({
      displayLabelCreationForm: !this.state.displayLabelCreationForm
    })
  }

  addLabel () {
    let newBoardLabels = this.state.boardLabels.slice()
    newBoardLabels.push({label: this.labelTitle.input.value, color: this.labelColor.input.value})
    this.setState({
      displayLabelCreationForm: !this.state.displayLabelCreationForm,
      boardLabels: newBoardLabels
    })
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
      fontSize,
    }
    return(
      <div style={props.style}>Labels
        <div>
          <ul>
            {this.state.boardLabels.map(e => <LabelItem onDeleteLabel={this.deleteLabel} labelText={e['label']} backgroundColor={e['color']} />)}
          </ul>
        </div>
        <div>
          <Button onClick={this.displayLabelForm}>Create label</Button>
          {this.state.displayLabelCreationForm
             ? <div>
               <Input ref={(v) => this.labelTitle = v} placeholder="Label title"/>
               <Input ref={(v) => this.labelColor = v} placeholder="#c5c5c5"/>
               <Button onClick={this.addLabel}>Add Label</Button>
             </div> 
             : null}
        </div>
      </div>
    )
  }
}