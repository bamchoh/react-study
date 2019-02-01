import { TodoAction } from '../actions'

export interface TodoState {
  id:number;
  text:string;
  completed:boolean;
}

const todos = (state:TodoState[] = [], action:TodoAction) => {
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
    default:
      return state
  }
}

export default todos
