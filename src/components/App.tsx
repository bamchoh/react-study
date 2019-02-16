import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles, WithStyles } from '@material-ui/core/styles';

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
        <div className={classes.root}>
          <LoginContainer action={bridge} />
          <AddTodoContainer action={bridge} />
          <VisibleTodoList action={bridge} />
          <LogoutContainer action={bridge} />
        </div>
      )
    }
  }
)

export default connect()(App)
