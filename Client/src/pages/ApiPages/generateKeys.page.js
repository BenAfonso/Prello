import React from 'react'
import AddNewApplicationForm from '../../components/API/AddNewApplicationForm/AddNewApplicationForm'

export default class GenerateKeysPage extends React.Component {
  render () {
    return (
      <div className='container'>
        <h1>Add a new application</h1>
        <AddNewApplicationForm />
        <style jsx>{`
          h1 {
            color: white;
          }
        `}</style>
      </div>
    )
  }
}
