import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/auth'

const HomePage = ({ isAuthenticated, logout }) => (
  <div>
    <h1>Home Page</h1>
    {isAuthenticated ? (
      <button
        onClick={() => {
          logout()
        }}
      >
        logout
      </button>
    ) : (
      <div>
        <Link to="/login">Login</Link> or <Link to="/signup">Sign up</Link>
      </div>
    )}
  </div>
)
HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({ isAuthenticated: !!state.user.token })

export default connect(mapStateToProps, { logout: actions.logout })(HomePage)
