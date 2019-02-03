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
import { TodoState } from '../reducers/todos'

interface PropsWithDispatch {
  dispatch: any
  action: any
  todos: TodoState[]
}

const TodoList = withStyles(styles)(
  class extends React.Component<PropsWithDispatch & WithStyles<typeof styles>, {}> {
    on_click_li = (e: React.MouseEvent<HTMLDivElement>) => {
      var id:number;
      id = +(e.currentTarget.id)
      this.props.action(this.props.dispatch, completeTodo(id));
    }

    on_click_for_del = (e: React.MouseEvent<HTMLButtonElement>) => {
      var id:number;
      id = +(e.currentTarget.id)
      this.props.action(this.props.dispatch, deleteTodo(id))
    }

    componentWillMount() {
      this.props.action(this.props.dispatch, fetchTodo());
    }

    drawItems = (item: TodoState) => {
      if(item.completed) {
        return <s>{item.text}</s>
      }
      return item.text
    }

    listItems = () => {
      return this.props.todos.map((item:TodoState) => {
        return(
          <ListItem key={item.id} button id={String(item.id)} onClick={this.on_click_li}>
            <ListItemText>
              {this.drawItems(item)}
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton aria-label="Delete" onClick={this.on_click_for_del} id={String(item.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )
      });
    }

    render() {
      return (
        <List>
          {this.listItems()}
        </List>
      )
    }
  });

export default TodoList;
