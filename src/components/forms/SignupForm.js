import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import isEmail from 'validator/lib/isEmail'
import PropTypes from 'prop-types'

import InlineError from '../messages/InlineError'

class SignupForm extends React.Component {
  state = {
    data: {
      email: '',
      password: '',
    },
    loading: false,
    errors: {},
  }

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    })
  }

  onSubmit = (e) => {

    e.preventDefault()
    const errors = this.validate(this.state.data)
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true })
      this.props.submit(this.state.data).catch(err => {
        this.setState({ errors: err.response.data.errors, loading: false })
      })
    } else {
      this.setState({ errors })
    }
  }

  validate = data => {
    const errors = {}
    if (!data.password) errors.password = `Can't be blank`
    if (!isEmail(data.email)) errors.email = 'Invalid email'
    return errors
  }

  render() {
    const { data, errors, loading } = this.state
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>

        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>

        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="your password here..."
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Button primary>Sign Up</Button>
      </Form>
    )
  }
}
SignupForm.propTypes = {
  submit: PropTypes.func.isRequired,
}

export default SignupForm
