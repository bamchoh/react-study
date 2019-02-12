import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import TodoList from '../components/TodoList'

import { TodoState } from '../reducers/todos'

export interface CombineState {
	todos: TodoState[]
  user: any
}

const mapStateToProps = (state:CombineState) => {
  return({
    todos: state.todos,
    user: state.user
  })
}

export default connect(mapStateToProps)(TodoList);
