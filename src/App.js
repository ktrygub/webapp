import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TopNavigation from './components/pages/TopNavigation'
import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import DashboardPage from './components/pages/DashboardPage'
import SignupPage from './components/pages/SignupPage'
import ConfirmationPage from './components/pages/ConfirmationPage'
import ForgotPasswordPage from './components/pages/ForgotPasswordPage'
import ResetPasswordPage from './components/pages/ResetPasswordPage'
import NewBookPage from './components/pages/NewBookPage'

const App = ({ isAuthenticated }) => (
  <div className="ui container">
    {isAuthenticated && <TopNavigation />}
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/signup" exact component={SignupPage} />
      <Route path="/confirmation/:token" exact component={ConfirmationPage} />
      <Route path="/dashboard" exact component={DashboardPage} />
      <Route path="/books/new" exact component={NewBookPage} />
      <Route path="/forgot_password" exact component={ForgotPasswordPage} />
      <Route
        path="/reset_password/:token"
        exact
        component={ResetPasswordPage}
      />
    </Switch>
  </div>
)
App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.user.email,
})

export default connect(mapStateToProps)(App)
