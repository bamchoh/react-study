import { combineReducers } from 'redux'
import { TodoState } from './todos'
import todos from './todos'

export interface CombineState {
	todos: TodoState[]
}
export default combineReducers({
  todos
})
