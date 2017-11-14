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
      selected: this.props.self ? [] : [this.props.currentTeam._id]
    }
    this.submit = this.submit.bind(this)
    this.onTeamCheck = this.onTeamCheck.bind(this)
  }

  componentDidMount () {
    setTeamslist(this.props.dispatch).then(() => {
    }).catch(err => {
      console.error(err)
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.currentTeam !== nextProps.currentTeam) {
      this.setState({
        selected: this.props.self ? [] : [nextProps.currentTeam._id]
      })
    }
  }

  submit (title) {
    if (this.title.value !== '') {
      if (this.state.selected.length === 0) {
        addBoard(this.props.dispatch, {title: this.title.value, color: this.color.value})
      } else {
        let teamId = ''
        if (this.props.currentTeam !== undefined) {
          teamId = this.props.currentTeam._id
        }
        addTeamBoard(this.props.dispatch, teamId, {title: this.title.value, color: this.color.value, teams: this.state.selected})
      }
    }
  }

  onTeamCheck (event, teamId) {
    if (event.target.checked) {
      let newSelected = this.state.selected.slice()
      newSelected.push(teamId)
      this.setState({selected: newSelected})
    } else {
      let newSelected = this.state.selected.filter(team => team !== teamId)
      this.setState({selected: newSelected})
    }
  }

  render () {
    const { teams, button } = this.props
    return (
      <div className='host'>
        <DropDown
          layout='custom'
          orientation='right'
          button={button}
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
                <div className='element-title'>Teams</div>
                {
                  teams.length >= 1
                    ? <div>
                      <form>
                        <ul>
                          {
                            teams.map((team, i) =>
                              <li key={i} className='team'>
                                <input type='checkbox' className='team-checkbox' defaultChecked={this.state.selected.filter(teamId => teamId === team._id)[0]} onChange={event => this.onTeamCheck(event, team._id)}/>
                                <div className='team-name'>{team.name}</div>
                              </li>
                            )
                          }
                        </ul>
                        {/* <select ref={(select) => { this.teams = select }} defaultValue={this.props.self ? ['None'] : [currentTeam._id]} onChange={this.onChange}>
                          <option value='None' disabled={this.state.selected[0] !== 'None'}>None</option>
                          {
                            teams.map((team, i) => <option key={i} value={team._id} disabled={this.state.selected[0] === 'None'} >{team.name}</option>)
                          }
                        </select> */}
                      </form>
                    </div>
                    : <div className='element-text'>You have no team yet.</div>
                }
              </li>
              <li className='separator' />
              <li className='element'>
                <div className='add-button'>
                  <Button
                    bgColor={'#5AAC44'}
                    gradient
                    bold
                    shadow
                    block
                    onClick={this.submit}>
                    Add
                  </Button>
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

    .element-text {
      padding: 8px 0px;
      font-size: 15px;
    }

    .team {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .team-name {
      input-size: 15px;
      padding-left: 5px;
    }

    .add-button {
      width: 100%;
    }

    .element-input input {
      font-size: inherit;
      width: 100%;
      padding: 8px;
      border-radius: 3px;
      border: 1px solid rgba(0,0,0,0.2);
      box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
    }

    input[type=checkbox] {
      height: 20px;
      width: 20px;
    }

    input[type=color] {
      height: 50px;
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
