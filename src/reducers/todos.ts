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
    default:
      return state
  }
}

export default todos
