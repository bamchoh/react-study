import { TodoAction } from '../actions'

export interface TodoState {
  id:number;
  text:string;
  completed:boolean;
}

const todos = (state:TodoState[] = [], action:any) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETE_TODO':
      return state.map(todo => {
        if(todo.id === action.id) {
          return { ...todo, completed: !todo.completed }
        } else {
          return todo
        }
      })
    case 'DELETE_TODO':
      return state.filter(({id}) => id !== action.id)
    case 'todos/update_todos':
      if(action.payload === undefined || action.payload === null) {
        return state
      }
      var newary = []
      for (var key of Object.keys(action.payload)) {
        var todo = action.payload[key]
        newary.push({
          id: todo.id,
          text: todo.text,
          completed: todo.completed,
        })
      }
      return newary
    default:
      return state
  }
}

export default todos
