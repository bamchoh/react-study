import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import TodoList from '../components/TodoList'

import { TodoState } from '../reducers/todos'

export interface CombineState {
	todos: TodoState[]
}

const mapStateToProps = (state:CombineState) => {
  console.log(state)
  return({
    todos: state.todos
  })
}

export default connect(mapStateToProps)(TodoList);
