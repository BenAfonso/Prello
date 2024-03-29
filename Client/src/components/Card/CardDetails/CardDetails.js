import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '../../UI/Button/Button'
import Icon from '../../UI/Icon/Icon'
import styles from './CardDetails.styles'
import DropDown from '../../UI/DropDown/DropDown'
import Input from '../../UI/Input/Input'
import CardDetailsComments from './CardDetailsSections/CardDetailsComments/CardDetailsComments'
import CardDetailsActivity from './CardDetailsSections/CardDetailsActivity/CardDetailsActivity'
import CardDetailsInformations from './CardDetailsSections/CardDetailsInformations/CardDetailsInformations'
import CardDetailsChecklists from './CardDetailsSections/CardDetailsChecklists/CardDetailsChecklists'
import MembersMenu from './CardDetailsMenu/MembersMenu/MembersMenu'
import DueDateMenu from './CardDetailsMenu/DueDateMenu/DueDateMenu'
import { addChecklist } from '../../../services/Checklist.services'
import { getCompleteCard } from '../../../services/Card.services'
import { addLabel, deleteLabel, updateLabel, addCardLabel, deleteCardLabel } from '../../../services/Label.services'
import { archiveCard, updateCardText } from '../../../store/actions'
import Uploader from '../../Uploader/Uploader'
import LabelDropdown from '../../UI/LabelDropdown/LabelDropdown'
import Config from '../../../config'

@connect(store => {
  return {
    lists: store.currentBoard.board.lists
  }
})

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board,
    currentUser: store.currentUser
  }
})
export default class CardDetails extends React.Component {
  static propTypes = {
    checklists: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.Any,
      index: PropTypes.number,
      text: PropTypes.string.isRequired,
      items: PropTypes.array
    })),
    labels: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      color: PropTypes.string
    }))
  }

  static defaultProps = {
    checklists: [],
    labels: []
  }
  constructor (props) {
    super(props)
    this.state = {
      fileUploaderDisplayed: false,
      renameCardDisplayed: false
    }
    this.createChecklist = this.createChecklist.bind(this)
    this.displayRenameCard = this.displayRenameCard.bind(this)
    this.undisplayRenameCard = this.undisplayRenameCard.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside)
    getCompleteCard(this.props.board._id, this.props.board.lists[this.props.listIndex]._id, this.props.id)
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside (event) {
    if (this.cardName && !this.cardName.contains(event.target)) {
      this.undisplayRenameCard()
    }
  }

  displayRenameCard () {
    this.setState({
      renameCardDisplayed: true
    })
  }

  undisplayRenameCard (event) {
    if (event) event.preventDefault()
    const card = this.props.lists[this.props.listIndex].cards[this.props.index]
    if (this.cardName.value !== '' && this.cardName.value !== card.text) {
      this.updateCardName(card, this.cardName.value)
    }
    this.setState({
      renameCardDisplayed: false
    })
  }

  updateCardName (card, cardText) {
    updateCardText(this.props.board._id, this.props.lists[this.props.listIndex]._id, card, cardText)
  }

  handleFocus (event) {
    event.target.select()
  }

  renderRenameCard (card) {
    return (
      <div className='rename-form'>
        <form onSubmit={this.undisplayRenameCard}>
          <input autoFocus type='text' className='rename-input' defaultValue={card.text} ref={(name) => { this.cardName = name }} onFocus={this.handleFocus}/>
        </form>
        <style jsx>{styles}</style>
      </div>
    )
  }

  displayFileUploader () {
    this.setState({
      fileUploaderDisplayed: true
    })
  }

  dismissFileUploader () {
    this.setState({
      fileUploaderDisplayed: false
    })
  }

  onUploadComplete (c) {
    this.dismissFileUploader()
  }

  renderFileUploader () {
    return (
      <div className='overlay' onClick={this.dismissFileUploader.bind(this)}>
        <div className='uploader'>
          <Uploader
            api={`${Config.API_URL}/boards/${this.props.board._id}/lists/${this.props.lists[this.props.listIndex]._id}/cards/${this.props.id}/attachments`}
            uploadedImage={this.onUploadComplete.bind(this)} />
        </div>
        <style jsx>{`
          .overlay {
            position: fixed;
            z-index: 1000;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            background-color: rgba(0,0,0,0.5);
          }

          .uploader {
            position: absolute;
            left: calc(50% - 100px);
            top: calc(50vh - 150px);
          }
        `}</style>
      </div>
    )
  }

  createChecklist () {
    addChecklist(this.props.board._id, this.props.lists[this.props.listIndex]._id, this.props.id, this.checklistTitleInput.input.value)
  }

  addBoardLabel (labelText, labelColor) {
    addLabel(this.props.board._id, labelText, labelColor)
  }

  deleteBoardLabel (labelId) {
    deleteLabel(this.props.board._id, labelId)
  }

  updateBoardLabel (labelId, labelTitle, labelColor) {
    updateLabel(this.props.board._id, labelId, labelTitle, labelColor)
  }

  addCardLabel (labelId) {
    addCardLabel(this.props.board._id, this.props.lists[this.props.listIndex]._id, this.props.id, labelId)
  }

  deleteCardLabel (labelId) {
    deleteCardLabel(this.props.board._id, this.props.lists[this.props.listIndex]._id, this.props.id, labelId)
  }

  render () {
    const card = this.props.lists[this.props.listIndex].cards[this.props.index]
    const cardLabels = card.labels
    return (
      <div className='host'>
        {
          this.state.fileUploaderDisplayed
            ? this.renderFileUploader()
            : null
        }
        <div className='content'>
          <div className='title'>
            <span className='icon'><Icon name='list-alt' color='#bbb' /></span>
            {
              this.state.renameCardDisplayed
                ? this.renderRenameCard(card)
                : <h1 onClick={this.displayRenameCard}>{card.text}</h1>
            }
          </div>
          <CardDetailsInformations {...this.props} cardLabels={cardLabels} onDeleteCardLabel={this.deleteCardLabel.bind(this)} onAddCardLabel={this.addCardLabel.bind(this)} onUpdateBoardLabel={this.updateBoardLabel.bind(this)} onDeleteBoardLabel={this.deleteBoardLabel.bind(this)} labels={this.props.board.labels} onAddBoardLabel={this.addBoardLabel.bind(this)} />
          <CardDetailsChecklists cardId={this.props.id} listIndex={this.props.listIndex} checklists={this.props.checklists}/>
          <CardDetailsComments {...this.props} />
          <CardDetailsActivity labels={this.props.labels}/>
        </div>

        <div className='cancelButton' onClick={this.props.dismissPopover}>
          <Button bgColor='rgba(0,0,0,0)' hoverBgColor='rgba(0,0,0,0.1)'>
            <Icon name='times' />
          </Button>
        </div>

        <div className='buttons'>
          <ul>
            <li>
              <MembersMenu
                title='Members'
                members={card.collaborators}
                listIndex={this.props.listIndex}
                cardId={card._id}
                orientation='right'
                button={<Button
                  bgColor='#eee'
                  hoverBgColor='#ddd'
                  size='x-small'
                  block
                >
                  <Icon color='#000' name='user-plus' fontSize='13px' />
                  <div className='button-text'>Members</div>
                </Button>} />
            </li>
            <li>
              <DropDown title='Labels'
                scrollable={true}
                orientation='right'
                layout='custom'
                button={<Button bgColor='#eee' hoverBgColor='#ddd' block size='x-small'>Labels</Button>
                }>
                <LabelDropdown cardLabels={cardLabels} onDeleteCardLabel={this.deleteCardLabel.bind(this)} onAddCardLabel={this.addCardLabel.bind(this)} onUpdateBoardLabel={this.updateBoardLabel.bind(this)} onDeleteBoardLabel={this.deleteBoardLabel.bind(this)} labels={this.props.board.labels} onAddBoardLabel={this.addBoardLabel.bind(this)} />
              </DropDown>
            </li>
            <li>
              <DropDown title='Add a checklist'
                orientation='right'
                layout='custom'
                button={<Button
                  bgColor='#eee' hoverBgColor='#ddd' block size='x-small'>Checklist</Button>
                }>
                <div style={{ width: '300px' }}>
                  <ul>
                    <li className='element'>
                      <div className='element-input'>
                        <Input ref={ (e) => { this.checklistTitleInput = e }} placeholder='Title' />
                      </div>
                      <div className='element-button'>
                        <Button
                          bgColor='#5AAC44'
                          hoverBgColor='#148407'
                          color='#FFF' block onClick={this.createChecklist}>
                        Save
                        </Button>
                      </div>
                    </li>
                  </ul>
                </div>
              </DropDown>
            </li>
            <li>
              <DueDateMenu
                listIndex={this.props.listIndex}
                cardId={card._id}
                orientation='right'
                button={<Button
                  bgColor='#eee'
                  hoverBgColor='#ddd'
                  size='x-small'
                  block
                >
                  <Icon color='#000' name='clock-o' fontSize='13px' />
                  <div className='button-text'>Due Date</div>
                </Button>} />
            </li>
            <li>
              <Button bgColor='#eee' hoverBgColor='#ddd' block size='x-small' onClick={this.displayFileUploader.bind(this)}>
                Attachment
              </Button>
            </li>
            <li>
              <Button bgColor='#eee' hoverBgColor='#ddd' block size='x-small' onClick={() => {
                archiveCard(this.props.board._id, this.props.board.lists[this.props.listIndex]._id, card)
                this.props.dismissPopover()
              }}>
                Archive
              </Button>
            </li>
          </ul>
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}
