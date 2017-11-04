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
import { addChecklist } from '../../../services/Checklist.services'
import { getCompleteCard } from '../../../services/Card.services'
import { archiveCard } from '../../../store/actions'
import LabelDropdown from '../../UI/LabelDropdown/LabelDropdown'

@connect(store => {
  return {
    lists: store.currentBoard.board.lists
  }
})

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board
  }
})
export default class CardDetails extends React.Component {
  static propTypes = {
    checklists: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.Any,
      index: PropTypes.number,
      title: PropTypes.string.isRequired,
      items: PropTypes.array
    }))
  }

  static defaultProps = {
    checklists: []
  }
  constructor (props) {
    super(props)
    this.createChecklist = this.createChecklist.bind(this)
  }

  createChecklist () {
    addChecklist(this.props.board._id, this.props.lists[this.props.listIndex]._id, this.props.id, this.checklistTitleInput.input.value)
  }

  componentDidMount () {
    getCompleteCard(this.props.board._id, this.props.board.lists[this.props.listIndex]._id, this.props.id)
  }

  render () {
    const card = this.props.lists[this.props.listIndex].cards[this.props.index]
    return (
      <div className='host'>
        <div className='content'>
          <CardDetailsInformations {...this.props} />
          <CardDetailsChecklists cardId={this.props.id} listIndex={this.props.listIndex} checklists={this.props.checklists}/>
          <CardDetailsComments {...this.props}/>
          <CardDetailsActivity />
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
                  <Icon color='#000' name='user-plus' fontSize='12px' />
                    Members
                </Button>} />
            </li>
            <li>
              <DropDown title='Labels'
                orientation='right'
                layout='custom'
                button={<Button bgColor='#eee' hoverBgColor='#ddd' block size='x-small'>Labels</Button>
                }>
                <div style={{ width: '340px' }}>
                  <LabelDropdown />
                </div>
              </DropDown>
            </li>
            <li>
              <DropDown title='Add a checklist'
                orientation='right'
                layout='custom'
                button={<Button
                  bgColor='#eee' hoverBgColor='#ddd' block size='x-small'>Checklist</Button>
                }>
                <div style={{ width: '340px' }}>
                  <ul>
                    <li>
                      <label className='newChecklistTitleInput'>Title: </label>
                      <Input ref={ (e) => { this.checklistTitleInput = e }} placeholder='Title' />
                    </li>
                    <li>
                      <Button
                        bgColor='#3cb221'
                        hoverBgColor='#148407'
                        color='#FFF' onClick={this.createChecklist}>
                        Save
                      </Button>
                    </li>
                  </ul>
                </div>
              </DropDown>
            </li>
            <li>
              <Button bgColor='#eee' hoverBgColor='#ddd' block size='x-small'>
                Due Date
              </Button>
            </li>
            <li>
              <Button bgColor='#eee' hoverBgColor='#ddd' block size='x-small'>
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
