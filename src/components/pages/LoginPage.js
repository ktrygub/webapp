import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LoginForm from '../forms/LoginForm'
import { login } from '../../redux/actions/auth'

class LoginPage extends React.Component {
  submit = data =>
    this.props.login(data).then(() => this.props.history.push('/dashboard'))

  render() {
    const { loggedIn } = this.props
    // refactor in future:
    // rename component to LoginRoute
    // take out LoginPage representation to separate component
    // return loogedIn ? <Redirect to="/dashboard" /> : <LoginPage />
    // make same changes in DashboardRoute and maybe other routes
    return loggedIn ? (
      <Redirect to="/dashboard" />
    ) : (
      <div>
        <h1>Login Page</h1>
        <LoginForm submit={this.submit} />
        <Link to="/">Back</Link> or <Link to="/forgot_password">Forgot Password?</Link>
      </div>
    )
  }
}
LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  loggedIn: PropTypes.bool,
}
LoginPage.defaultProps = {
  loggedIn: false,
}

const mapStateToProps = state => ({
  loggedIn: !!state.user.token,
})

export default connect(mapStateToProps, { login })(LoginPage)
