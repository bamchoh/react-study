import { TodoAction } from '../actions'

export interface TodoState {
  id:string;
  text:string;
  completed:boolean;
}

const todos = (state:TodoState[] = [], action:any) => {
  switch (action.type) {
    case 'todos/on_drag_end':
      console.log(action)
      return state
    case 'todos/child_added':
      if(action.payload === undefined || action.payload === null) {
        return state
      }
      return [
        ...state,
        action.payload
      ]
    case 'todos/child_removed':
      return state.filter(({id}) => id !== action.payload.id)
    case 'todos/child_changed':
      return state.map(todo => {
        if(todo.id === action.payload.id) {
          return action.payload
        } else {
          return todo
        }
      })
    default:
      return state
  }
}

export default todos
