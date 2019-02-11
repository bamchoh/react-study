import { Dispatch} from "redux";
import * as firebase from "firebase/app";
import 'firebase/database';

const sendWithPost = async (ep:string, dispatch: any, action:any) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'applicatoin/json'
  };

  const method = 'POST'
  const obj = action;
  const body = JSON.stringify(obj);
  const res: Response = await fetch(ep, {method, headers, body})

  if(res.ok) {
    const json = await res.json()
    dispatch(json)
  }
}

const addTodo = async (text:string) => {
  if(uid == "") {
    return
  }

  const database = firebase.database();

  const ref = database.ref('todos/' + uid).push();
  ref.set({
    id:ref.key,
    text: text,
    completed: false
  })
}

const initdb = async (dispatch:any, payload:any) => {
  if(payload.uid == "") {
    return
  }

  const database = firebase.database();

  database.ref('users/' + payload.uid).once('value').then((snapshot) => {
    if(snapshot.val() === null) {
      database.ref('users/' + payload.uid).set({
        username: payload.username
      });
      dispatch({
        type: 'user/change_username',
        payload: {
          username: payload.username
        }
      });
    } else {
      const newUsername = snapshot.val().username;
      dispatch({
        type: 'user/change_username',
        payload: {
          username: newUsername
        }
      });
    }
  })

  console.log("start to watch value")
  console.log(payload.uid)
  var todosref = database.ref('todos/' + payload.uid);
  todosref.on('value', function(snapshot) {
    if(snapshot!.val() === null) {
      console.log("snapshot value is null")
    } else {
      console.log(snapshot!.val())
      dispatch({
        type: 'todos/update_todos',
        payload: snapshot!.val()
      })
    }
  }, function(error:any) {
    console.log(error)
  })
}

var uid = "";
const sendToApiServer = async (dispatch: any, action : any) => {
  switch (action.type) {
    case 'user/change_user':
      {
        if(action.payload.uid !== "") {
          uid = action.payload.uid;
        }
        await initdb(dispatch, action.payload);
        dispatch(action)
        break;
      }
    case 'ADD_TODO':
      {
        await addTodo(action.text);
        break
      }
    case 'COMPLETE_TODO':
      {
        await sendWithPost('/api/complete_todo', dispatch, action)
        break
      }
    case 'DELETE_TODO':
      {
        await sendWithPost('/api/delete_todo', dispatch, action)
        break
      }
    case 'FETCH_TODO':
      {
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'applicatoin/json'
        };

        const method = 'GET'
        const ep = '/api/fetch_todo'
        const res: Response = await fetch(ep, {method, headers})

        if(res.ok) {
          const json = await res.json()
          dispatch(json)
        }
        break
      }
    default:
      dispatch(action)
      break
  }
}

export default sendToApiServer
