import React from 'react'
import {connect} from 'react-redux'

import Button from '../../../UI/Button/Button'
import DropDown from '../../../UI/DropDown/DropDown'
import { addBoard, addTeamBoard, setTeamslist } from '../../../../store/actions'

@connect(store => {
  return {
    teams: store.teamslist.teams
  }
})

export default class NewBoardForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      enableAdd: false,
      selected: this.props.self ? ['None'] : [this.props.currentTeam._id]
    }
    this.submit = this.submit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount () {
    setTeamslist(this.props.dispatch).then(() => {
    }).catch(err => {
      console.error(err)
    })
  }

  submit (title) {
    if (this.title.value !== '') {
      if (this.state.selected[0] === 'None') {
        addBoard(this.props.dispatch, {title: this.title.value, color: this.color.value})
      } else {
        addTeamBoard(this.props.dispatch, {title: this.title.value, color: this.color.value, teams: this.state.selected})
      }
    }
  }

  onChange () {
    let selected
    if (this.teams.value[0] === 'None') {
      selected = ['None']
    } else {
      if (this.state.selected.filter(team => team === this.teams.value)[0] !== undefined) {
        selected = this.state.selected.filter(team => team !== this.teams.value[0])
      } else {
        let newSelected = this.state.selected.slice()
        newSelected.push(this.teams.value)
        selected = newSelected
      }
    }
    this.setState({selected: selected})
  }

  render () {
    const { currentTeam, teams } = this.props

    return (
      <div className='host'>
        <DropDown
          layout='custom'
          orientation='right'
          button={
            <div className='createBoard'>
              <div className='createBoard-title'>
                Create a board...
              </div>
            </div>
          }
          title='Create Board'>
          <div style={{ width: '300px' }}>
            <ul>
              <li className='element'>
                <div className='element-title'>Title</div>
                <div className='element-input'>
                  <form onSubmit={this.submit}>
                    <input type='text' placeholder='Add a board...' ref={(t) => { this.title = t }} />
                  </form>
                </div>
              </li>
              <li className='element'>
                <div className='element-title'>Color</div>
                <div className='element-input'>
                  <form>
                    <input type='color' defaultValue='#cd5a91' ref={(input) => { this.color = input }} />
                  </form>
                </div>
              </li>
              <li className='element'>
                <div className='element-title'>Team</div>
                {
                  teams.length >= 1
                    ? <div className='element-input'>
                      <form>
                        <select autofocus value={this.state.selected} ref={(select) => { this.teams = select }} defaultValue={this.props.self ? ['None'] : currentTeam._id} multiple onChange={this.onChange}>
                          <option value='None' disabled={this.state.selected[0] !== 'None'}>None</option>
                          {
                            teams.map((team, i) => <option key={i} value={team._id} disabled={this.state.selected[0] === 'None'} >{team.name}</option>)
                          }
                        </select>
                      </form>
                    </div>
                    : <div className='element-text'>You have no team yet.</div>
                }
              </li>
              <li className='separator' />
              <li className='element'>
                <div className='element-buttons'>
                  <div className='add-button'>
                    <Button
                      bgColor={'#5AAC44'}
                      gradient
                      bold
                      shadow
                      onClick={this.submit}>
                      Add
                    </Button>
                  </div>
                  <div className='cancel-button'>
                    <Button
                      bgColor={'#444'}
                      gradient
                      shadow
                      onClick={this.props.cancel}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </DropDown>
        <style jsx>{`

    .host {
      width: 100%;
      display:flex;
    }

    .users-list {
      overflow-y: auto;
    }
    .element {
      padding: 15px;
    }

    .element-title{
      font-weight: bold;
    }

    .element-input {
      padding: 8px 0px;
    }

    .element-text {
      padding: 8px 0px;
      font-size: 15px;
    }

    .element-buttons {
      display: flex;
      justify-content: space-between;
    }

    input {
      font-size: inherit;
      width: 100%;
      padding: 8px;
      border-radius: 3px;
    }

    select {
      width: 100%;
      overflow-y: auto;
    }

    .separator {
      content: '';
      height: 1px;
      padding: 0;
      background-color: #aaa;
      width: 90%;
      margin: 8px 0 8px 5%;
    }

    .createBoard {
      cursor: pointer;
      position: relative;
      background-color: rgba(250,250,250,0.3);
      padding: 10px;
      border-radius: 3px;
      box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
      width: 270px;
    }
    
    .createBoard-title {
      height: 50px;
      line-height: 50px;
      color: rgba(250,250,250,0.5);
      font-size: 16px;
      text-align: center;
    }
    
    .createBoard:hover {
      background-color: rgba(200,200,200,0.3);
      transform: translateY(-3px) translateX(-3px);
    }
    
    .createBoard:hover .createBoard-title {
      color: rgba(0,0,0,0.5);
    }
    `}</style>
      </div>
    )
  }
}
