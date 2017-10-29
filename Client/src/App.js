import React, { Component } from 'react'
import IndexPage from './pages/index.page'
import LoginPage from './pages/LoginPage/login.page'
import BoardsPage from './pages/boards.page'
import BoardPage from './pages/board.page'
import RegisterPage from './pages/RegisterPage/register.page'
import LoadingPage from './pages/LoadingPage/loading.page'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import { isAuthenticated } from './services/Authentication.services'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )
  )} />
)

class App extends Component {
  render () {
    return (
      <Router>
        <Provider store={store}>
          <div className='App'>
            <PrivateRoute exact path='/' component={IndexPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <PrivateRoute exact path='/boards' component={BoardsPage} />
            <PrivateRoute exact path='/boards/:id' component={BoardPage} />
            <Route exact path='/loading' component={LoadingPage} />
          </div>
        </Provider>
      </Router>
    )
  }
}

export default App
