import * as React from 'react';
import { ButtonProps } from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';
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
  user: any
}

const Logout = withStyles(styles)(
  class extends React.Component<PropsWithDispatch & WithStyles<typeof styles>, {}> {
    render() {
      const { classes, user } = this.props
      const { action } = this.props

      const signOut = () => {
        firebase.auth().signOut().then(() => {
          action.signOut()
        }).catch(function(error) {
          console.log(error)
        });
      }

      if(user.init) {
        if(user.login) {
          return (
            <Button color="inherit" variant="outlined" onClick={signOut} className={classes.button}>
            Sign out
            </Button>
          )
        }
      }
      return (
        <></>
      )
    }
  }
);

export default Logout;
