import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import AddTodo from "../containers/AddTodo";
import VisibleTodoList from "../containers/VisibleTodoList";
import styles from '../css/style';

const App = withStyles(styles)(
  class extends React.Component<WithStyles<typeof styles>, {}> {
    render() {
      const { classes } = this.props
      return (
        <div className={classes.root}>
          <AddTodo />
          <VisibleTodoList />
        </div>
      )
    }
  }
)

export default App
