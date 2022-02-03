import {combineReducers} from 'redux'
import user from './reducers/user'
import books from './reducers/books'

const rootReducer = combineReducers({user, books})

export default rootReducer