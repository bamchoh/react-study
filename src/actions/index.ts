export interface TodoAction {
	type: string;
	id: number;
	text: string;
}

let nextTodoId:number = 0
const addTodo = (text:string) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const completeTodo = (id:number) => ({
  type: 'COMPLETE_TODO',
  id: id,
})

export const deleteTodo = (id:number) => ({
  type: 'DELETE_TODO',
  id: id,
})

export const fetchTodo = () => ({
  type: 'FETCH_TODO',
})

export default addTodo
