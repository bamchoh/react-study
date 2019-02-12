import { Dispatch} from "redux";
import * as firebase from "firebase/app";
import 'firebase/database';

const addTodo = async (text:string) => {
  if(uid == "") {
    return
  }

  const database = firebase.database();

  const ref = database.ref('todos/' + uid).push()
  ref.set({
    id:ref.key,
    text: text,
    completed: false
  })
}

const completeTodo = async (action:any) => {
  if(uid == "") {
    return
  }

  const database = firebase.database();

  const ref = database.ref('todos/' + uid + '/' + action.id + '/completed')
  ref.once('value').then((snapshot) => {
    ref.set(!snapshot.val())
  })
}

const deleteTodo = async (action:any) => {
  if(uid == "") {
    return
  }

  const database = firebase.database();

  database.ref(`todos/${uid}/${action.id}`).remove()
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

  var todosref = database.ref('todos/' + payload.uid);
  todosref.on('child_added', function(snapshot) {
    if(snapshot!.val() === null) {
    } else {
      dispatch({
        type: 'todos/child_added',
        payload: snapshot!.val()
      })
    }
  }, function(error:any) {
    console.log(error)
  })

  todosref.on('child_removed', function(snapshot) {
    if(snapshot!.val() === null) {
    } else {
      dispatch({
        type: 'todos/child_removed',
        payload: snapshot!.val()
      })
    }
  }, function(error:any) {
    console.log(error)
  })

  todosref.on('child_changed', function(snapshot) {
    if(snapshot!.val() === null) {
    } else {
      dispatch({
        type: 'todos/child_changed',
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
        await completeTodo(action)
        break
      }
    case 'DELETE_TODO':
      {
        await deleteTodo(action)
        break
      }
    default:
      dispatch(action)
      break
  }
}

export default sendToApiServer
