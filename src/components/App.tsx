import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AddTodoContainer from "../containers/AddTodoContainer";
import VisibleTodoList from "../containers/VisibleTodoList";
import LoginContainer from "../containers/LoginContainer";
import LogoutContainer from "../containers/LogoutContainer";
import styles from '../css/style';
import DatabaseBridge from '../utils/sendToApiServer'

interface PropsWithDispatch {
  dispatch: any
}

const App = withStyles(styles)(
  class extends React.Component<PropsWithDispatch & WithStyles<typeof styles>, {}> {
    render() {
      const { classes, dispatch } = this.props
      const bridge = new DatabaseBridge(dispatch)
      return (
        <Grid container justify="center" className={classes.root}>
          <Grid className={classes.container}>
            <LogoutContainer action={bridge} />
            <LoginContainer action={bridge} />
            <AddTodoContainer action={bridge} />
            <VisibleTodoList action={bridge} />
          </Grid>
        </Grid>
      )
    }
  }
)

export default connect()(App)
