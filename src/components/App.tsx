import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import AddTodoContainer from "../containers/AddTodoContainer";
import VisibleTodoList from "../containers/VisibleTodoList";
import LoginContainer from "../containers/LoginContainer";
import LogoutContainer from "../containers/LogoutContainer";
import styles from '../css/style';
import sendToApiServer from '../utils/sendToApiServer'

const App = withStyles(styles)(
  class extends React.Component<WithStyles<typeof styles>, {}> {
    render() {
      const { classes } = this.props
      return (
        <div className={classes.root}>
          <LoginContainer action={sendToApiServer} />
          <AddTodoContainer action={sendToApiServer} />
          <VisibleTodoList action={sendToApiServer} />
          <LogoutContainer action={sendToApiServer} />
        </div>
      )
    }
  }
)

export default App
