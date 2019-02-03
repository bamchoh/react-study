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
    case 'FETCH_TODO':
      if(action.data === null) {
        return state
      }
      return action.data.map((todo:any) => {
        return ({
          id: todo.id,
          text: todo.text,
          completed: todo.completed,
        })
      })
    default:
      return state
  }
}

export default todos
