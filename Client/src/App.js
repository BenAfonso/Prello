import React, { Component } from 'react'
import IndexPage from './pages/index.page'
import LoginPage from './pages/LoginPage/login.page'
import RegisterPage from './pages/register.page'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Store from './store/store'

const store = Store()

class App extends Component {
  render () {
    return (
      <Router>
        <Provider store={store}>
        <div className='App'>
          <Route exact path='/' component={IndexPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
        </div>
        </Provider>
      </Router>
    )
  }
}

export default App
