import React from 'react'
import {connect} from 'react-redux'
import Button from '../../../UI/Button/Button'
import DropDown from '../../../UI/DropDown/DropDown'
import Icon from '../../../UI/Icon/Icon'

import { addTeamToBoard, setTeamslist } from '../../../../store/actions'

@connect(store => {
  return {
    teams: store.teamslist.teams
  }
})

export default class AddTeamMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      matchingTeams: this.props.teams,
      enableAdd: false,
      inputValue: '',
      teamIdSelected: ''
    }

    this.addTeam = this.addTeam.bind(this)
    this.onChange = this.onChange.bind(this)
    this.alreadyInBoard = this.alreadyInBoard.bind(this)
  }

  componentDidMount () {
    setTeamslist(this.props.dispatch).then(() => {
    }).catch(err => {
      console.error(err)
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.teams !== nextProps.teams) {
      this.setState({
        matchingTeams: nextProps.teams
      })
    }
  }

  alreadyInBoard (team) {
    return (this.props.board.teams.find(inTeam => team._id === inTeam._id) !== undefined)
  }

  addTeam () {
    if (this.state.teamIdSelected !== '') {
      addTeamToBoard(this.props.board._id, this.state.teamIdSelected)
    }
    this.setState({
      inputValue: '',
      enableAdd: false,
      matchingTeams: this.props.teams,
      teamIdSelected: ''
    })
  }

  setTeamId (teamId, teamName) {
    this.setState({
      teamIdSelected: teamId,
      inputValue: teamName,
      enableAdd: true
    })
  }

  getMatchingTeams (name) {
    const reg = new RegExp(name, 'i')
    let matchingTeams = []
    this.props.teams.map(team => team.name.match(reg) ? matchingTeams.push(team) : null)
    return matchingTeams.slice(0, 10)
  }

  onChange () {
    this.setState({
      enableAdd: false
    })
    if (this.team.value !== '') {
      const newmatchingTeams = this.getMatchingTeams(this.team.value)
      this.setState({
        inputValue: this.team.value,
        matchingTeams: newmatchingTeams
      })
    } else {
      this.setState({
        inputValue: this.team.value,
        matchingTeams: this.props.teams
      })
    }
  }

  render () {
    let menuElements = []
    this.state.matchingTeams.filter(team =>
      menuElements.push({
        action: this.alreadyInBoard(team) ? null : () => this.setTeamId(team._id, team.name),
        placeholder: team.name,
        closer: true,
        disabled: this.alreadyInBoard(team)
      })
    )

    return (
      <div className='host'>
        <DropDown
          layout='custom'
          orientation='right'
          button={<Button
            bgColor='rgba(0,0,0,0)'
            color='#444'
            hoverBgColor='rgba(0,0,0,0.1)'
            block
          >
            <Icon color='#000' name='user-plus' fontSize='20px' />
            Add a team
          </Button>}
          title='Teams'>
          <div style={{ width: '300px' }}>
            <ul>
              <li className='element'>
                <div className='element-input'>
                  <form onSubmit={this.addTeam}>
                    <DropDown
                      menuElements={menuElements}
                      scrollable
                      maxHeight='250px'
                      input={<input type='text' height='20px' value={this.state.inputValue} placeholder='StupCROU' onChange={this.onChange} ref={(t) => { this.team = t }} />}
                    />
                  </form>
                </div>
              </li>
              <li className='element'>
                <Button
                  bgColor='#5AAC44'
                  block
                  onClick={this.addTeam}
                  disabled={!this.state.enableAdd}
                >
                Add
                </Button>
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
      padding: 10px 15px;
    }

    .element-input {
      padding: 8px 0px;
    }

    input {
      font-size: inherit;
      width: 100%;
      padding: 8px;
      border-radius: 3px;
    }

    .separator {
      content: '';
      height: 1px;
      padding: 0;
      background-color: #aaa;
      width: 90%;
      margin: 8px 0 8px 5%;
    }
    `}</style>
      </div>
    )
  }
}
