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

export default addTodo
