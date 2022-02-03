import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SignupForm from '../forms/SignupForm'
import  {signup}  from '../../redux/actions/users'

class SignupPage extends React.Component {
  submit = data =>
    this.props.signup(data).then(() => this.props.history.push('/dashboard'))

  render() {
    const { loggedIn } = this.props
    return loggedIn ? (
      <Redirect to="/dashboard" />
    ) : (
      <div>
        <h1>Signup Page</h1>
        <SignupForm submit={this.submit} />
        <Link to="/">Back</Link>
      </div>
    )
  }
}
SignupPage.propTypes = {
  signup: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  loggedIn: PropTypes.bool,
}
SignupPage.defaultProps = {
  loggedIn: false,
}

const mapStateToProps = state => ({
  loggedIn: !!state.user.token,
})

export default connect(mapStateToProps, { signup })(SignupPage)
