import React from 'react'
import styles from './CreateMenu.styles'
import DropDown from '../UI/DropDown/DropDown'
import Icon from '../UI/Icon/Icon'
import NewBoardForm from './Forms/NewBoardForm/NewBoardForm'
import NewTeamForm from './Forms/NewTeamForm/NewTeamForm'
import TrelloImport from '../TrelloImport/TrelloImport'

export default class CreateDropDown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    return (
      <div className='host'>
        <DropDown
          layout='custom'
          orientation='right'
          button={
            <div className='headerButton'>
              <Icon fontSize='20px' name='plus' color='white' />
            </div>
          }
          title='Create'>
          <div style={{ width: '300px' }}>
            <ul>
              <li className='element'>
                <NewBoardForm
                  self
                  button={
                    <div>
                      <div className='element-title'>Create a Board</div>
                      <div className='element-text'>A board is a set of cards classified in lists. Use it to manage your projects!</div>
                    </div>
                  }
                />
              </li>
              <li className='separator' />
              <li className='element'>
                <NewTeamForm
                  button={
                    <div>
                      <div className='element-title'>Create a Team</div>
                      <div className='element-text'>A team is a set of boards and users. Use it to keep your business organized!</div>
                    </div>
                  }
                />
              </li>
              <li className='separator' />
              <li className='element'>
                <TrelloImport />
              </li>
            </ul>
          </div>
        </DropDown>
        <style jsx>{styles}</style>
      </div>
    )
  }
}
