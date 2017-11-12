import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
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
    height: '175px',
    width: '302px',
    color: '#fff',
    overflow: 'scroll',
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
    this.props.onAddBoardLabel(this.labelTitle.value, this.labelColor.value)
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
      overflow,
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
      overflow
    }

    if (!this.state.displayLabelCreationForm) {
      return (
        <div style={props.style}>
          <div style={{ marginLeft: '7%', marginTop: '30px' }}>
            <div style={{}}>
              {this.props.labels.map(e => <div key={e['_id']}><Label cardLabels={this.props.cardLabels} onDeleteCardLabel={this.props.onDeleteCardLabel} onAddCardLabel={this.props.onAddCardLabel} onUpdateBoardLabel={this.props.onUpdateBoardLabel} onDeleteBoardLabel={this.props.onDeleteBoardLabel} isItem={ true } labelId={e['_id']} labelText={e['name']} backgroundColor={e['color']} /></div>)}
            </div>
            <div>
              <Button onClick={this.displayLabelForm} color='#000' bgColor='rgba(0,0,0,0)' size='x-small' hoverBgColor='rgba(0,0,0,0.1)'>Create label</Button>
            </div>
          </div>
        </div>
      )
    } else if (this.state.displayLabelCreationForm) {
      return (
        <div style={props.style}>
          <div>
            <div>
              <div>
                <h3 style={{ color: 'black', marginLeft: '10%' }}>Label name</h3>
                <input style={{ width: '75%', height: '30px', marginLeft: '10%', marginTop: '5%', borderRadius: '3%', textAlign: 'center' }} type='text' autoFocus ref={(v) => { this.labelTitle = v } } placeholder='Label title'/>
              </div>
              <div>
                <h3 style={{ color: 'black', marginLeft: '10%' }}>Label color</h3>
                <input style={{ width: '75%', height: '15px', marginLeft: '10%', marginTop: '5%', borderRadius: '3%' }} type='color' ref={(v) => { this.labelColor = v } } placeholder='#c5c5c5'/>
              </div>
            </div>
            <div style={{ display: 'flex', marginTop: '5%', marginLeft: '10%' }}>
              <Button style={{ marginRight: '10px' }} bgColor='#28AF28'onClick={this.addLabelDistant} size='x-small' >Save</Button>
              <Button bgColor='#e73333' onClick={this.displayLabelForm} size='x-small' >Cancel</Button>
            </div>
          </div>
        </div>
      )
    }
  }
}
