import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import TodoList from '../components/TodoList'

import { TodoState } from '../reducers/todos'
import sendToApiServer from '../utils/sendToApiServer'

export interface CombineState {
	todos: TodoState[]
}

const mapStateToProps = (state:CombineState) => ({
  todos: state.todos
})

export default connect(mapStateToProps)(TodoList);
