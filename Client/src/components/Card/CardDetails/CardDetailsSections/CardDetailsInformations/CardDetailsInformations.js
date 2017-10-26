import React from 'react'
import CardDetailsSection from '../../CardDetailsSection/CardDetailsSection'
import CardDetailsMembers from './CardDetailsMembers/CardDetailsMembers'
import CardDetailsLabels from './CardDetailsLabels/CardDetailsLabels'
import CardDetailsResponsible from './CardDetailsResponsible/CardDetailsResponsible'
import {connect} from 'react-redux'
import Button from '../../../../UI/Button/Button'
import {updateCardDescription} from '../../../../../services/Card.services'
import Markdown from 'react-markdown'

@connect(store => {
  return {
    board: store.board
  }
})
export default class CardDetailsInformations extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editDescriptionFormDisplayed: false
    }

    this.toggleDescriptionForm = this.toggleDescriptionForm.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
  }

  toggleDescriptionForm () {
    this.setState({
      editDescriptionFormDisplayed: !this.state.editDescriptionFormDisplayed
    })
  }

  dismissDescriptionForm () {
    this.setState({
      editDescriptionFormDisplayed: false
    })
  }

  updateDescription (desc) {
    this.dismissDescriptionForm()
    this.text.innerHTML = ''
    let newCard = this.props.board.lists[this.props.listIndex].cards
      .filter(c => c._id === this.props.id)[0]
    newCard.description = desc
    updateCardDescription(this.props.board._id,
      this.props.board.lists[this.props.listIndex]._id,
      this.props.id,
      newCard)
  }

  render () {
    const fullCard = this.props.board.lists[this.props.listIndex].cards
      .filter(c => c._id === this.props.id)[0]

    return (
      <div className='host'>
        <CardDetailsSection title={this.props.content} icon='list-alt'>
          <span className='listInformations'>In list {this.props.board.lists[this.props.listIndex].name}</span>
          <div className='description'>
            <Markdown source={fullCard.description} />
          </div>
          <div className='sections'>
            <div className='members'>
              <div className='subsectionTitle'>
                Members
              </div>
              <CardDetailsMembers listIndex={this.props.listIndex} id={fullCard._id} />
            </div>
            <div className='labels'>
              <div className='subsectionTitle'>
                Labels
              </div>
              <CardDetailsLabels />
            </div>
            <div className='responsible'>
              <div className='subsectionTitle'>
                Responsible
              </div>
              <CardDetailsResponsible listIndex={this.props.listIndex} id={fullCard._id} />
            </div>
          </div>
          {
            this.state.editDescriptionFormDisplayed
              ? <div className='editDescriptionForm'>
                <div className='content'>
                  <div className='card' contentEditable ref={c => { this.text = c }} />
                  <div className='saveButton' onClick={() => { this.updateDescription(this.text.innerHTML) }}>
                      Save
                  </div>
                </div>
              </div>
              : null
          }
          <Button
            block
            size='x-small'
            bgColor='rgba(0,0,0,0)'
            color='#999'
            hoverBgColor='rgba(0,0,0,0.2)'
            onClick={this.toggleDescriptionForm}
          >Edit the description...</Button>
        </CardDetailsSection>
        <style jsx>
          {`
    .listInformations {
      font-size: 13px;
      color: #999;
    }

    .editDescriptionForm {
      margin-bottom: 20px;
    }
    
    .sections {
      margin-top: 20px;
      margin-bottom: 20px;
      display: flex;
    }
    
    .members {
      margin-right: 20px;
    }

    .labels {
      margin-right: 20px;
    }
    
    .subsectionTitle {
      font-size: 14px;
      color: #999;
    }
    
    .edit {
      margin-top: 20px;
      font-size: 14px;
      color: #999;
      cursor: pointer;
    }

    .content {
      font-size: 13px;
    }
    
    .content .card {
      border: none;
      outline: none;
      resize: vertical;
      overflow: visible;
      display: block;
      width: 100%;
      padding: 8px;
      padding-bottom: 50px;
      background-color: #fff;
      box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
      border-radius: 3px;
    }
    
    .saveButton {
      padding: 8px;
      background-color: rgb(40, 175, 40);
      width: 60px;
      font-weight: bold;
      text-align: center;
      border-radius: 3px;
      font-size: 13px;
      color: white;
      margin-top: 8px;
      cursor: pointer;
    }
        `}
        </style>
      </div>
    )
  }
}

CardDetailsInformations.propTypes = {
}
