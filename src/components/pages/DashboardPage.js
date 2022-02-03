import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import ConfirmEmailMessage from '../messages/ConfirmEmailMessage'
import {allBooksSelector} from '../../redux/reducers/books'
import AddBookCtA from '../ctas/AddBookCtA'
import {fetchBooks} from '../../redux/actions/books'

class DashboardPage extends React.Component {

  componentDidMount = () => this.props.fetchBooks()

  // onInit = props => props.fetchBooks()

  render() {
    const { loggedIn, isConfirmed, books } = this.props
// const loggedIn = this.props.loggedIn
// const isConfirmed = this.props.isConfirmed
// const books = this.props.books

    return (
      loggedIn ? (
        <div>
          {!isConfirmed && <ConfirmEmailMessage />}
        {books.length === 0 ? <AddBookCtA/> : <p>Your book cards here...</p>}
        </div>
      ) : (
        <Redirect to="/login" />
      )
    )
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool,
  books: PropTypes.arrayOf(PropTypes.shape({title: PropTypes.string.isRequired}).isRequired).isRequired,
  fetchBooks: PropTypes.func.isRequired
}
DashboardPage.defaultProps = {
  loggedIn: false,
}

const mapStateToProps = state => ({
  isConfirmed: !!state.user.isConfirmed,
  loggedIn: !!state.user.token,
  books: allBooksSelector(state)
})

export default connect(mapStateToProps, {fetchBooks})(DashboardPage)
