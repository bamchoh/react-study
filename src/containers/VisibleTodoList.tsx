import { connect } from 'react-redux'
import TodoList from '../components/TodoList'

import { TodoState } from '../reducers/todos'

export interface CombineState {
	todos: TodoState[]
}

const mapStateToProps = (state:CombineState) => ({
  todos: state.todos
})

export default connect(mapStateToProps)(TodoList);
