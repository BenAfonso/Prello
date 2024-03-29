import React from 'react'
import {connect} from 'react-redux'
import NewTeamForm from '../NewTeamForm/NewTeamForm'
import Button from '../../../UI/Button/Button'
import DropDown from '../../../UI/DropDown/DropDown'
import { addBoard, addScrumBoard, addKanbanBoard, addTeamBoard, addScrumTeamBoard, addKanbanTeamBoard } from '../../../../store/actions'
import styles from './NewBoardForm.styles'
import PropTypes from 'prop-types'

@connect(store => {
  return {
    teams: store.teamslist.teams,
    currentUser: store.currentUser
  }
})

export default class NewBoardForm extends React.Component {
  static propTypes = {
    comingFromProfilePage: PropTypes.bool
  }
  static defaultProps = {
    comingFromProfilePage: false
  }
  constructor (props) {
    super(props)
    this.state = {
      enableAdd: false,
      selected: this.props.self ? [] : [this.props.currentTeam._id],
      selectedTemplate: null
    }
    this.submit = this.submit.bind(this)
    this.onTeamCheck = this.onTeamCheck.bind(this)
    this.displayScrumForm = this.displayScrumForm.bind(this)
    this.hideScrumForm = this.hideScrumForm.bind(this)
    this.onTemplateChanged = this.onTemplateChanged.bind(this)
    this.displayKanbanForm = this.displayKanbanForm.bind(this)
    this.hideKanbanForm = this.hideKanbanForm.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.currentTeam !== nextProps.currentTeam) {
      this.setState({
        selected: this.props.self ? [] : [nextProps.currentTeam._id]
      })
    }
  }

  isCurrentTeamAdmin (team) {
    return (team.admins.filter(admin => admin._id === this.props.currentUser._id)[0] !== undefined)
  }

  displayScrumForm () {
    this.setState({selectedTemplate: 'scrum'})
  }

  displayKanbanForm () {
    this.setState({selectedTemplate: 'kanban'})
  }

  hideScrumForm () {
    this.setState({selectedTemplate: null})
    this.scrumRadio.checked = false
  }

  hideKanbanForm () {
    this.setState({selectedTemplate: null})
    this.kanbanRadio.checked = false
  }

  submit (title) {
    const templates = [this.scrumRadio]
    const selectedTemplate = templates.filter(radio => radio.checked)[0]
    const kanbanTemplate = [this.kanbanRadio]
    const selectedKanban = kanbanTemplate.filter(radio => radio.checked)[0]
    if (this.title.value !== '') {
      if (this.state.selected.length === 0) {
        if (selectedTemplate && selectedTemplate.id === 'scrum') {
          addScrumBoard(this.props.dispatch, {title: this.title.value, color: this.color.value}, this.props.comingFromProfilePage)
        } else if (selectedKanban && selectedKanban.id === 'kanban') {
          addKanbanBoard(this.props.dispatch, {title: this.title.value, color: this.color.value}, this.props.comingFromProfilePage)
        } else {
          addBoard(this.props.dispatch, {title: this.title.value, color: this.color.value}, this.props.comingFromProfilePage)
        }
      } else {
        let teamId = ''
        if (this.props.currentTeam !== undefined) {
          teamId = this.props.currentTeam._id
        }
        if (selectedTemplate && selectedTemplate.id === 'scrum') {
          addScrumTeamBoard(this.props.dispatch, teamId, {title: this.title.value, color: this.color.value, teams: this.state.selected}, this.props.comingFromProfilePage)
        } else if (selectedKanban && selectedKanban.id === 'kanban') {
          addKanbanTeamBoard(this.props.dispatch, teamId, {title: this.title.value, color: this.color.value, teams: this.state.selected}, this.props.comingFromProfilePage)
        } else {
          addTeamBoard(this.props.dispatch, teamId, {title: this.title.value, color: this.color.value, teams: this.state.selected}, this.props.comingFromProfilePage)
        }
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

  onTemplateChanged (newTemplate) {
    if (newTemplate === 'scrum') {
      this.displayScrumForm()
    }
    if (newTemplate === 'kanban') {
      this.displayKanbanForm()
    }
  }

  renderScrumForm () {
    return (
      <div className='close-template-button'>
        <Button
          bgColor='#E2E4E6'
          hoverBgColor='#d6d6d6'
          color='black'
          fontSize='12px'
          bold
          onClick={this.hideScrumForm}>
          Cancel
        </Button>
        <style jsx>{styles}</style>
      </div>
    )
  }

  renderKanbanForm () {
    return (
      <div className='close-template-button'>
        <Button
          bgColor='#E2E4E6'
          hoverBgColor='#d6d6d6'
          color='black'
          fontSize='12px'
          bold
          onClick={this.hideKanbanForm}>
          Cancel
        </Button>
        <style jsx>{styles}</style>
      </div>
    )
  }

  render () {
    const { button, teams } = this.props
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
                                <input type='checkbox' className='team-checkbox' defaultChecked={this.isCurrentTeamAdmin(team) ? this.state.selected.filter(teamId => teamId === team._id)[0] : false} onChange={event => this.onTeamCheck(event, team._id)} disabled={!this.isCurrentTeamAdmin(team)}/>
                                <div className='team-name' style={!this.isCurrentTeamAdmin(team) ? {color: '#999'} : null}>{team.name}</div>
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
                    : <div className='element-text'>
                      You have no team yet.
                      <div className='teamForm'>
                        <NewTeamForm
                          button={<span className='add-team'>Add one</span>}
                        />
                      </div>
                    </div>
                }
              </li>
              <li className='element'>
                <div className='element-title'>Templates</div>
                <ul>
                  <li className='template'>
                    <input type='radio' name='template' id='scrum' ref={radio => { this.scrumRadio = radio }} onChange={event => this.onTemplateChanged('scrum')}/>
                    <div className='template-name'>SCRUM</div>
                    {this.state.selectedTemplate === 'scrum'
                      ? <div>{this.renderScrumForm()}</div>
                      : null
                    }
                  </li>
                  <li className='template'>
                    <input type='radio' name='template' id='kanban' ref={radio => { this.kanbanRadio = radio }} onChange={event => this.onTemplateChanged('kanban')}/>
                    <div className='template-name'>KANBAN</div>
                    {this.state.selectedTemplate === 'kanban'
                      ? <div>{this.renderKanbanForm()}</div>
                      : null
                    }
                  </li>
                </ul>
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
        <style jsx>{styles}</style>
      </div>
    )
  }
}
