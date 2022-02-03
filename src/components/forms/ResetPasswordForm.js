import React from 'react'
import { Form, Button, Message } from 'semantic-ui-react'

import PropTypes from 'prop-types'

import InlineError from '../messages/InlineError'

class ResetPasswordForm extends React.Component {
  state = {
    data: {
      token: this.props.token,
      password: '',
      confirmPassword: '',
    },
    loading: false,
    errors: {},
  }

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    })
  }

  onSubmit = e => {
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
    if (data.password && data.password!==data.confirmPassword) errors.confirmPassword = `Password doesn't match`
    return errors
  }

  render() {
    const { data, errors, loading } = this.state
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && <Message negative>{errors.global}</Message>}
        
        <Form.Field error={!!errors.password}> 
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="new password here..."
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

        <Form.Field error={!!errors.confirmPassword}> 
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="type password again..."
            value={data.confirmPassword}
            onChange={this.onChange}
          />
          {errors.confirmPassword && <InlineError text={errors.confirmPassword} />}
        </Form.Field>
        
        <Button primary>Reset Password</Button>
      </Form>
    )
  }
}
ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
}

export default ResetPasswordForm
