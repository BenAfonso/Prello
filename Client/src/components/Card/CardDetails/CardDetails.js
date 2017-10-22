import React from 'react'
import Button from '../../UI/Button/Button'
import Icon from '../../UI/Icon/Icon'
import styles from './CardDetails.styles'
import DropDown from '../../UI/DropDown/DropDown'
import Input from '../../UI/Input/Input'
import { addChecklist } from '../../../store/actions'
import CardDetailsComments from './CardDetailsSections/CardDetailsComments/CardDetailsComments'
import CardDetailsActivity from './CardDetailsSections/CardDetailsActivity/CardDetailsActivity'
import CardDetailsInformations from './CardDetailsSections/CardDetailsInformations/CardDetailsInformations'

export default class CardDetails extends React.Component {
  constructor (props) {
    super(props)
    this.createChecklist = this.createChecklist.bind(this)
  }

  createChecklist () {
    console.log(this.props.id, this.checklistTitleInput.input.value)
    addChecklist(this.props.id, this.checklistTitleInput.input.value)
  }

  render () {
    return (
      <div className='host'>
        <div className='content'>
          <CardDetailsInformations {...this.props} />
          <CardDetailsComments />
          <CardDetailsActivity />
        </div>

        <div className='cancelButton' onClick={this.props.handleClick}>
          <Button bgColor='rgba(0,0,0,0)' hoverBgColor='rgba(0,0,0,0.1)'>
            <Icon name='times' />
          </Button>
        </div>

        <div className='buttons'>
          <ul>
            <li>
              <Button bgColor='#eee' hoverBgColor='#ddd' block size='x-small'>
                Members
              </Button>
            </li>
            <li>
              <Button bgColor='#eee' hoverBgColor='#ddd' block size='x-small'>
                Labels
              </Button>
            </li>
            <li>
              <DropDown title='Add a checklist'
                orientation='left'
                layout='custom'
                button={<Button
                  bgColor='#eee' hoverBgColor='#ddd' block size='x-small'>Checklist</Button>
                }>
                <div style={{ width: '340px' }}>
                  <ul>
                    <li>
                      <label className='newChecklistTitleInput'>Title: </label>
                      <Input ref={(e) => this.checklistTitleInput = e} placeholder='Title' />
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
          </ul>
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}
