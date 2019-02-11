import { combineReducers } from 'redux'
import { TodoState } from './todos'
import todos from './todos'
import user from './user'

export default combineReducers({
  user,
  todos
})
