import React, { Component } from 'react'
import IndexPage from './pages/index.page'
import LoginPage from './pages/LoginPage/login.page'
import BoardsPage from './pages/boards.page'
import BoardPage from './pages/board.page'
import RegisterPage from './pages/RegisterPage/register.page'
import LoadingPage from './pages/LoadingPage/loading.page'
import ProfilePage from './pages/ProfilePage/profile.page'
import DashboardPage from './pages/dashboard.page'
import ApiPage from './pages/ApiPages/api.page'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import { isAuthenticated } from './services/Authentication.services'
import BoardDashboardPage from './pages/board.dashboard.page'
import TeamPage from './pages/team.page'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (
      <Component {...props} {...rest} />
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
            <PrivateRoute exact path='/dashboard' component={DashboardPage} />
            <PrivateRoute exact path='/boards/:id/cards/:cardId' component={BoardPage} />
            <PrivateRoute exact path='/teams/:id' component={TeamPage} />
            <PrivateRoute exact path='/teams/:id/:tab' component={TeamPage} />
            <PrivateRoute exact path='/developers' component={ApiPage} />
            <Route exact path='/loading' component={LoadingPage} />
            <PrivateRoute exact path='/users/:id/profile' component={ProfilePage} />
            <PrivateRoute exact path='/boards/:id/dashboard/board' component={BoardDashboardPage} analytics='board' />
            <PrivateRoute exact path='/boards/:id/dashboard/lists' component={BoardDashboardPage} analytics='lists' />
            <PrivateRoute exact path='/boards/:id/dashboard/users' component={BoardDashboardPage} analytics='users' />
          </div>
        </Provider>
      </Router>
    )
  }
}

export default App
