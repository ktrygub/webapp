import React from 'react'
import { Menu, Dropdown, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import gravatarUrl from 'gravatar-url'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {allBooksSelector} from '../../redux/reducers/books'
import { logout } from '../../redux/actions/auth'

const TopNavigation = ({ user, logout, hasBooks }) => (
  <Menu secondary pointing>
    <Menu.Item as={Link} to="/dashboard">
      Dashboard
    </Menu.Item>

    {hasBooks && <Menu.Item as={Link} to="/books/new">
      Add new book
    </Menu.Item>}

    <Menu.Menu position="right">
      <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} />}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
)
TopNavigation.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  hasBooks: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  hasBooks: allBooksSelector(state).length > 0
})
export default connect(mapStateToProps, { logout })(TopNavigation)
