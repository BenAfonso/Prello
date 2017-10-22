import React from 'react'
import Button from '../../UI/Button/Button'
import Icon from '../../UI/Icon/Icon'
import DropDown from '../../UI/DropDown/DropDown'
import Input from '../../UI/Input/Input'
import { addChecklist } from '../../../store/actions'

export default class CardDetails extends React.Component {
  constructor (props) {
    super(props)
    this.createChecklist = this.createChecklist.bind(this)
  }
  createChecklist () {
    console.log(this.props.id + ' ' + this.checklistTitleInput.input.value)
    addChecklist(this.props.id, this.checklistTitleInput.input.value)
    console.log('AH')
  }

  render () {
    const props = this.props

    return (
      <div className='host'>
        <div className='cardTitle'>
          <span className='cardIcon'>
            <Icon name='list-alt' color='#888' />
          </span>
          <h2> {props.content} </h2>
        </div>
        <div style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={props.handleClick}>
          <Button bgColor='rgba(0,0,0,0)' hoverBgColor='rgba(0,0,0,0.1)'><Icon name='times' /></Button>
        </div>
        <div>
          <div className='content' />
          <div className='buttons'>
            <ul>
              <li><Button
                bgColor='#eee' hoverBgColor='#ddd' block size='x-small'>Members</Button></li>
              <li><Button
                bgColor='#eee' hoverBgColor='#ddd' block size='x-small'>Labels</Button></li>
              <li><DropDown title='Add a checklist'
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
              </DropDown></li>
              <li><Button
                bgColor='#eee' hoverBgColor='#ddd' block size='x-small'>Due Date</Button></li>
              <li><Button
                bgColor='#eee' hoverBgColor='#ddd' block size='x-small'>Attachment</Button></li>
            </ul>
          </div>
        </div>
        <style jsx>{`
        .host {
          position: relative;
          width: 100%;
          height: 140vh;
          background-color: white;
          borderRadius: 8px;
          padding: 20px;
          border-radius: 8px;
          overflow-y: auto;
        }
        .cardTitle {
          height: 24px;
          line-height: 24px;
          width: 100%;
        }
        .cardTitle .cardIcon {
          font-size: 20px;
          color: '#888';
        }
        .cardTitle h2 {
          display: inline-block;
          background-color: '#444';
          margin-left: 20px;
        }
        .content {
          background: red;
          display: inline-block;
          width: calc(100% - 100px);
          height: 100%;
        }
        .buttons {
          display: inline-block;
          width: 100px;
        }
        
        li {
          width: 100%;
          margin-bottom: 5px;
        }
      `}</style>
      </div>
    )
  }
}
