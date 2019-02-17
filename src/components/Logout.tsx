import * as React from 'react';
import { ButtonProps } from '@material-ui/core/Button';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

      if(user.init && user.uid !== "") {
        return (
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                TODO Apps
              </Typography>
              <Button color="inherit" variant="outlined" onClick={signOut} className={classes.button}>
                Sign out
              </Button>
            </Toolbar>
          </AppBar>
        )
      }

      return (
        <></>
      )
    }
  }
);

export default Logout;
