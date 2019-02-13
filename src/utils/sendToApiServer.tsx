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

  initdb(payload:any) {
    if(payload.uid !== "") {
      this.uid = payload.uid;
    }

    const database:any = this.getDatabase()

    database.ref(`users/${payload.uid}`).once('value').then((snapshot:any) => {
      if(snapshot.val() === null) {
        database.ref(`users/${payload.uid}`).set({
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

    var todosref = database.ref(`todos/${payload.uid}`);
    todosref.on('child_added', function(snapshot:any) {
      if(snapshot!.val() === null) {
      } else {
        this.dispatch({
          type: 'todos/child_added',
          payload: snapshot!.val()
        })
      }
    }, function(error:any) {
      console.log(error)
    })

    todosref.on('child_removed', function(snapshot:any) {
      if(snapshot!.val() === null) {
      } else {
        this.dispatch({
          type: 'todos/child_removed',
          payload: snapshot!.val()
        })
      }
    }, function(error:any) {
      console.log(error)
    })

    todosref.on('child_changed', function(snapshot:any) {
      if(snapshot!.val() === null) {
      } else {
        this.dispatch({
          type: 'todos/child_changed',
          payload: snapshot!.val()
        })
      }
    }, function(error:any) {
      console.log(error)
    })
  }

  addTodo(text:string) {
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

  completeTodo(id:string) {
    const database:any = this.getDatabase();

    if(this.uid == "") {
      return
    }

    const ref = database.ref(`todos/${this.uid}/${id}/completed`)
    ref.once('value').then((snapshot:any) => {
      ref.set(!snapshot.val())
    })
  }

  deleteTodo(id:string) {
    const database:any = this.getDatabase();

    if(this.uid == "") {
      return
    }

    database.ref(`todos/${this.uid}/${id}`).remove()
  }

  sendToApiServer(action:any) {
    switch (action.type) {
      case 'user/change_user':
        {
          this.initdb(action.payload);
          this.dispatch(action)
          break;
        }
      default:
        this.dispatch(action)
        break
    }
  }
}

export default DatabaseBridge
