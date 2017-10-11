import React, { Component } from 'react'
import IndexPage from './pages/index.page'
import LoginPage from './pages/LoginPage/login.page'
import BoardsPage from './pages/boards.page'
import BoardPage from './pages/board.page'
import RegisterPage from './pages/RegisterPage/register.page'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'

class App extends Component {
  render () {
    return (
      <Router>
        <Provider store={store}>
          <div className='App'>
            <Route exact path='/' component={IndexPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route exact path='/boards' component={BoardsPage} />
            <Route path='/boards/:id' component={BoardPage} />
          </div>
        </Provider>
      </Router>
    )
  }
}

export default App
