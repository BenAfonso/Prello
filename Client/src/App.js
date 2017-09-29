import React, { Component } from 'react'
import IndexPage from './pages/index.page'
import LoginPage from './pages/login.page'
import RegisterPage from './pages/register.page'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <Router>
        <div className='App'>
          <Route exact path='/' component={IndexPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
        </div>
      </Router>
    )
  }
}

export default App
