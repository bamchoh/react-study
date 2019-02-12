// import { UserAction } from '../actions'

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

const user = (state:UserState = initState, action:any) => {
  switch (action.type) {
    case 'user/signout':
      return({
        ...state,
        ...{
          login: false,
        }
      })
    case 'user/change_user':
      if(state.uid === action.payload.uid) {
        return state
      }
      return({
        ...state,
        ...{
          login: action.payload.login,
          uid: action.payload.uid
        }
      })
    case 'user/change_username':
      if(state.username === action.payload.username) {
        return state
      }
      return({
        ...state,
        ...{
          username: action.payload.username
        }
      })
    case 'user/init_done':
      return({
        ...state,
        ...{
          init: true
        }
      })
  }
  return state
}

export default user
