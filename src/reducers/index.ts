import { combineReducers } from 'redux'
import { TodoState } from './todos'
import todos from './todos'

export interface UserState {
  init:boolean;
  login:boolean;
  username:string;
  uid:string;
}

const initState = {
  init: false,
  login: false,
  username: "",
  uid: "",
}

const users = (state:UserState[] = [], action:any) => {
  return state
}

export default combineReducers({
  users,
  todos
})
