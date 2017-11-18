import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
// import Input from '../Input/Input'
import Icon from '../Icon/Icon'
import styles from './Label.styles'

export default class Label extends React.Component {
  constructor () {
    super()
    this.state = {
      isExpanded: false,
      labelTitle: '',
      displayLabelEditForm: false,
      addedToCard: false
    }
    this.expandLabel = this.expandLabel.bind(this)
    this.onDeleteBoardLabel = this.onDeleteBoardLabel.bind(this)
    this.displayLabelEditForm = this.displayLabelEditForm.bind(this)
    this.updateBoardLabel = this.updateBoardLabel.bind(this)
    this.addCardLabel = this.addCardLabel.bind(this)
    this.deleteCardLabel = this.deleteCardLabel.bind(this)
    this.addedLabel = this.addedLabel.bind(this)
  }
  static propTypes = {
    labelText: PropTypes.string,
    labelId: PropTypes.string,
    width: PropTypes.string,
    style: PropTypes.object,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontWeight: PropTypes.string,
    isItem: PropTypes.bool,
    isThumbnail: PropTypes.bool
  }

  static defaultProps = {
    height: '30px',
    width: '90px',
    color: '#fff',
    backgroundColor: '#000',
    fontWeight: 'bold',
    borderRadius: '3px',
    fontSize: '10px',
    centeredText: true,
    isItem: false,
    isThumbnail: false
  }

  expandLabel () {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  onDeleteBoardLabel () {
    this.props.onDeleteBoardLabel(this.props.labelId)
  }

  displayLabelEditForm () {
    this.setState({
      displayLabelEditForm: !this.state.displayLabelEditForm
    })
  }

  updateBoardLabel () {
    this.props.onUpdateBoardLabel(this.props.labelId, this.newlabelTitle.value, this.newlabelColor.value)
    this.displayLabelEditForm()
  }

  addCardLabel () {
    this.setState({
      addedToCard: !this.addedToCard
    }, this.props.onAddCardLabel(this.props.labelId))
  }

  deleteCardLabel () {
    this.setState({
      addedToCard: false
    }, this.props.onDeleteCardLabel(this.props.labelId))
  }

  shouldComponentUpdate (nextState) {
    return this.state.addedToCard !== nextState.addedToCard
  }

  componentDidMount () {
    this.addedLabel()
  }

  addedLabel () {
    if (this.props.cardLabels) {
      this.props.cardLabels.map((label) => {
        if (label['_id'] === this.props.labelId) {
          this.setState({
            addedToCard: !this.state.addedToCard
          })
        }
        return label
      })
    }
  }
  render () {
    const {
      labelText,
      width,
      height,
      fontWeight,
      backgroundColor,
      borderRadius,
      color,
      fontSize,
      centeredText,
      ...props
    } = this.props

    props.style = {
      width: this.props.isThumbnail ? '50px' : '200px',
      height: this.props.isThumbnail ? '15px' : '30px',
      fontSize,
      fontWeight,
      backgroundColor,
      borderRadius,
      color,
      textAlign: 'center',
      ...props.style
    }

    if (this.state.displayLabelEditForm) {
      return (
        <div style={{ marginBottom: '10px' }}>
          <div>
            <div>
              <h3 style={{ color: 'black', marginLeft: '10%' }}>Label name</h3>
              <input defaultValue={this.props.labelText} style={{ width: '75%', height: '30px', marginLeft: '10%', marginTop: '5%', borderRadius: '3%', textAlign: 'center' }} type='text' autoFocus ref={(v) => { this.newlabelTitle = v } } placeholder='Labelo title'/>
            </div>
            <div>
              <h3 style={{ color: 'black', marginLeft: '10%' }}>Label color</h3>
              <input defaultValue={this.props.backgroundColor} style={{ width: '75%', height: '15px', marginLeft: '10%', marginTop: '5%', borderRadius: '3%' }} type='color' ref={(v) => { this.newlabelColor = v } } placeholder='#c5c5c5'/>
            </div>
          </div>
          <div style={{ display: 'flex', marginTop: '5%', marginLeft: '10%' }}>
            <Button style={{ marginRight: '10px' }} bgColor='#28AF28'onClick={this.updateBoardLabel} size='x-small' >Save</Button>
            <Button bgColor='#e73333' onClick={this.displayLabelEditForm} size='x-small' >Cancel</Button>
          </div>
        </div>
      )
    } else if (!this.props.isItem) return <div style={props.style}>{this.props.labelText}</div>
    else if (this.props.isItem && this.state.addedToCard) {
      return (
        <div className='labelItem' style={{ marginBottom: '3px' }}>
          <div style={props.style} onClick={ this.deleteCardLabel }>{this.props.labelText}<Icon name='check' color='70727c' /></div>
          <div>
            <Button
              onClick={this.onDeleteBoardLabel}
              bgColor='rgba(0,0,0,0)'
              color='#70727c'
              hoverBgColor='#ddd'
              size='small'>
              <Icon name='times' color='#70727c' />
            </Button>
          </div>
          <div>
            <Button
              onClick={this.displayLabelEditForm}
              bgColor='rgba(0,0,0,0)'
              color='#70727c'
              hoverBgColor='#ddd'
              size='small'>
              <Icon name='pencil' color='#70727c' />
            </Button>
          </div>
          <style jsx>{styles}</style>
        </div>
      )
    } else if (this.props.isItem && !this.state.addedToCard) {
      return (
        <div className='labelItem' style={{ marginBottom: '3px' }}>
          <div style={props.style} onClick={ this.addCardLabel }>{this.props.labelText}</div>
          <div>
            <Button
              onClick={this.onDeleteBoardLabel}
              bgColor='rgba(0,0,0,0)'
              color='#70727c'
              hoverBgColor='#ddd'
              size='small'>
              <Icon name='times' color='#70727c' />
            </Button>
          </div>
          <div>
            <Button
              onClick={this.displayLabelEditForm}
              bgColor='rgba(0,0,0,0)'
              color='#70727c'
              hoverBgColor='#ddd'
              size='small'>
              <Icon name='pencil' color='#70727c' />
            </Button>
            {this.state.displayLabelEditForm
              ? <div>
                <div>
                  <div>
                    <h3 style={{ color: 'black', marginLeft: '10%' }}>Label name</h3>
                    <input style={{ width: '75%', height: '40px', marginLeft: '10%', marginTop: '5%', borderRadius: '3%', textAlign: 'center' }} type='text' autoFocus ref={(v) => { this.newlabelTitle = v } } placeholder='Label title'/>
                  </div>
                  <div>
                    <h3 style={{ color: 'black', marginLeft: '10%' }}>Label color</h3>
                    <input style={{ width: '75%', height: '40px', marginLeft: '10%', marginTop: '5%', borderRadius: '3%' }} type='color' ref={(v) => { this.newlabelColor = v } } placeholder='#c5c5c5'/>
                  </div>
                </div>
                <div style={{ display: 'flex', marginTop: '5%', marginLeft: '10%' }}>
                  <Button style={{ marginRight: '10px' }} bgColor='#28AF28'onClick={this.updateBoardLabel} size='x-small' >Save</Button>
                  <Button bgColor='#e73333' onClick={this.displayLabelEditForm} size='x-small' >Cancel</Button>
                </div>
              </div> : null}
          </div>
          <style jsx>{styles}</style>
        </div>
      )
    }
  }
}
