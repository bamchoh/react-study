import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import AddTodoContainer from "../containers/AddTodoContainer";
import VisibleTodoList from "../containers/VisibleTodoList";
import LoginContainer from "../containers/LoginContainer";
import LogoutContainer from "../containers/LogoutContainer";
import styles from '../css/style';
import DatabaseBridge from '../utils/sendToApiServer'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

interface PropsWithDispatch {
  dispatch: any
}

const App = withStyles(styles)(
  class extends React.Component<PropsWithDispatch & WithStyles<typeof styles>, {}> {
    render() {
      const { classes, dispatch } = this.props
      const bridge = new DatabaseBridge(dispatch)
      return (
        <div className={classes.root}>
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                TODO Apps
              </Typography>
              <LogoutContainer action={bridge} />
            </Toolbar>
          </AppBar>
          <LoginContainer action={bridge} />
          <AddTodoContainer action={bridge} />
          <VisibleTodoList action={bridge} />
        </div>
      )
    }
  }
)

export default connect()(App)
