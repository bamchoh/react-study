export interface TodoAction {
	type: string;
	id: string;
	text: string;
}

export const addTodo = (text:string) => ({
  type: 'ADD_TODO',
  text
})

export const completeTodo = (id:string) => ({
  type: 'COMPLETE_TODO',
  id: id,
})

export const deleteTodo = (id:string) => ({
  type: 'DELETE_TODO',
  id: id,
})

export const fetchTodo = () => ({
  type: 'FETCH_TODO',
})

export default addTodo
