import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../css/style';
import { completeTodo, deleteTodo, fetchTodo } from '../actions'
import { UserState } from '../reducers/user'

import * as firebase from "firebase/app";
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

interface PropsWithDispatch {
  action: any
  user: UserState
}

const config = {
  apiKey: "AIzaSyB4CkztF8-Ai81c9IF_GZeJNFF4S0f3qm0",
  authDomain: "todo-36aad.firebaseapp.com",
  databaseURL: "https://todo-36aad.firebaseio.com",
  projectId: "todo-36aad",
  storageBucket: "todo-36aad.appspot.com",
  messagingSenderId: "391464939332"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult:any, redirectUrl:any) {
      return true;
    },
  },
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID
  ],
  tosUrl: '/term_of_service',
  privacyPolicyUrl: '/privacy_policy'
};

class Login extends React.Component<PropsWithDispatch, {}> {
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user:any) => {
      if(user !== null) {
        this.props.action.initdb({
          uid: user.uid,
          username: user.displayName
        })
      } else {
        this.props.action.initdb({
          uid: "",
          username: ""
        })
      }

      this.props.action.initDone()
    })
  }

  render() {
    const { user } = this.props

    if(user.init && user.uid === "") {
      return (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      )
    }

    return(
      <>
      </>
    )
  }
}

export default Login;
