import { Dispatch} from "redux";
import * as firebase from "firebase/app";
import 'firebase/database';

export class DatabaseBridge {
  uid:string;
  dispatch:any;

  constructor(dispatch:any) {
    this.uid = "";
    this.dispatch = dispatch;
  }

  getDatabase() {
    return firebase.database;
  }

  changeUsersEvent(database:any, action:any) {
    const usersRef = database.ref(`users/${this.uid}`)
    usersRef.once('value').then((snapshot:any) => {
      if(snapshot.val() === null) {
        usersRef.set({
          username: action.payload.username
        });
        this.dispatch({
          type: 'user/change_username',
          payload: {
            username: action.payload.username
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
      console.log(error)
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
      console.log(error)
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
      console.log(error)
    })
  }

  initdb(action:any) {
    if(action.payload.uid !== "") {
      this.uid = action.payload.uid;
    }

    const database:any = this.getDatabase()

    this.changeUsersEvent(database, action)

    this.childAddEvent(database)

    this.childRemovedEvent(database)

    this.childChangedEvent(database)

    this.dispatch(action)
  }

  addTodo(action:any) {
    const text:string = action.payload.text
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

  completeTodo(action:any) {
    const id:string = action.payload.id
    const database:any = this.getDatabase();

    if(this.uid == "") {
      return
    }

    const ref = database.ref(`todos/${this.uid}/${id}/completed`)
    ref.once('value').then((snapshot:any) => {
      ref.set(!snapshot.val())
    })
  }

  deleteTodo(action:any) {
    const id:string = action.payload.id
    const database:any = this.getDatabase();

    if(this.uid == "") {
      return
    }

    database.ref(`todos/${this.uid}/${id}`).remove()
  }
}

export default DatabaseBridge
