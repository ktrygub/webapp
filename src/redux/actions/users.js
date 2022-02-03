import api from '../../api'
import { userLoggedIn } from './auth'

export const signup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.myappJWT = user.token
    dispatch(userLoggedIn(user))
  })

export const confirm = token => dispatch =>
  api.user.confirm(token).then(user => {
    localStorage.myappJWT = user.token
    dispatch(userLoggedIn(user))
  })

export const resetPasswordRequest = ({ email }) => () =>
  api.user.resetPasswordRequest(email)

export const validateToken = token => () => api.user.validateToken(token)

export const resetPassword = data => () => api.user.resetPassword(data)
