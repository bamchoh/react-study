import { Dispatch} from "redux";
import * as firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';
import { TodoState } from '../reducers/todos'

export class DatabaseBridge {
  uid:string;
  dispatch:any;
  database:any;

  constructor(dispatch:any) {
    this.uid = "";
    this.dispatch = dispatch;
    this.database = firebase.database;
  }

  getDatabase() {
    return firebase.database();
  }

  changeUsersEvent(database:any, payload:any) {
    const usersRef = database.ref(`users/${this.uid}`)
    usersRef.once('value').then((snapshot:any) => {
      if(snapshot.val() === null) {
        usersRef.set({
          username: payload.username
        });
        this.dispatch({
          type: 'user/change_username',
          payload: {
            username: payload.username
          }
        });
      } else {
        const newUsername = snapshot.val().username;
        this.dispatch({
          type: 'user/change_username',
          payload: {
            username: newUsername
          }
        });
      }
    })
  }

  childAddEvent(database:any) {
    const todosref = database.ref(`todos/${this.uid}`);
    todosref.on('child_added', (snapshot:any) => {
      if(snapshot!.val() !== null) {
        this.dispatch({
          type: 'todos/child_added',
          payload: snapshot!.val()
        })
      }
    }, function(error:any) {
      // console.log(error)
    })
  }

  childRemovedEvent(database:any) {
    const todosref = database.ref(`todos/${this.uid}`);
    todosref.on('child_removed', (snapshot:any) => {
      if(snapshot!.val() !== null) {
        this.dispatch({
          type: 'todos/child_removed',
          payload: snapshot!.val()
        })
      }
    }, function(error:any) {
      // console.log(error)
    })
  }

  childChangedEvent(database:any) {
    const todosref = database.ref(`todos/${this.uid}`);
    todosref.on('child_changed', (snapshot:any) => {
      if(snapshot!.val() !== null) {
        this.dispatch({
          type: 'todos/child_changed',
          payload: snapshot!.val()
        })
      }
    }, function(error:any) {
      // console.log(error)
    })
  }

  initdb(payload:any) {
    this.uid = payload.uid;

    if(this.uid == "") {
      this.dispatch({type: 'user/change_user', payload: payload})
      return
    }

    const database:any = this.getDatabase()

    this.changeUsersEvent(database, payload)

    this.childAddEvent(database)

    this.childRemovedEvent(database)

    this.childChangedEvent(database)

    this.dispatch({type: 'user/change_user', payload: payload})
  }

  addTodo(payload:any) {
    const text:string = payload.text
    const database:any = this.getDatabase();

    if(this.uid == "") {
      return
    }

    const ref = database.ref(`todos/${this.uid}`).push()
    ref.set({
      id:ref.key,
      text: text,
      completed: false
    })
  }

  completeTodo(payload:any) {
    const id:string = payload.id
    const database:any = this.getDatabase();

    if(this.uid == "") {
      return
    }

    const ref = database.ref(`todos/${this.uid}/${id}/completed`)
    ref.once('value').then((snapshot:any) => {
      if(snapshot.val() !== null) {
        ref.set(!snapshot.val())
      }
    })
  }

  deleteTodo(payload:any) {
    const id:string = payload.id
    const database:any = this.getDatabase();

    if(this.uid == "") {
      return
    }

    database.ref(`todos/${this.uid}/${id}`).remove()
  }

  initDone() {
    const action = { type: 'user/init_done' }
    this.dispatch(action)
  }

  signOut() {
    const action = { type: 'user/signout' }
    this.dispatch(action)
  }

  onDragEnd(payload:any) {
    const { dst, src, todos } = payload
    const database:any = this.getDatabase();
    const startAt = dst.index
    const endAt = src.index+1
    var todoAry:any = []

    if(dst.index < src.index) {
      for(var i = src.index;i >= dst.index;i--) {
        todoAry.push({...todos[i]})
      }
    } else {
      for(var i = src.index;i <= dst.index;i++) {
        todoAry.push({...todos[i]})
      }
    }

    var tmp = {...todoAry[0]}
    for(var i:any = 1;i < todoAry.length; i++) {
      todoAry[i-1] = {...todoAry[i], id: todoAry[i-1].id}
    }
    todoAry[todoAry.length-1] = {
      ...tmp,
      id: todoAry[todoAry.length-1].id,
    }

    const todoRef = database.ref(`todos/${this.uid}`)

    var updates:any = {}
    todoAry.forEach((val:any) => {
      updates[`/${val.id}`] = val
    })

    todoRef.update(updates)
  }
}

export default DatabaseBridge
