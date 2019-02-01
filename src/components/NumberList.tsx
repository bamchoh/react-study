import * as React from 'react';
import { ButtonProps } from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { connect } from 'react-redux'
import addTodo, { completeTodo, deleteTodo } from '../actions'

import { TodoState } from '../reducers/todos'
import { CombineState } from '../reducers'

const mapStateToProps = (state:CombineState) => ({
  todos: state.todos
})

const TodoList = ({todos} : {todos:TodoState[]}) => (
  <ul>
    {todos.map((todo:TodoState) =>
      <li key={todo.id}>
        {todo.text}
      </li>
    )}
  </ul>
)

const styles = (theme: Theme) => createStyles({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	button: {
		margin: theme.spacing.unit
	}
});

interface PropsWithDispatch {
	dispatch: any
	todos: TodoState[]
}

const NumberList = withStyles(styles)(
	class extends React.Component<PropsWithDispatch & WithStyles<typeof styles>, {}> {
		textRef = React.createRef<HTMLInputElement>();

		on_click_li = (e: React.MouseEvent<HTMLDivElement>) => {
			var id:number;
			id = +(e.currentTarget.id)
      this.props.dispatch(completeTodo(id));
		}

		on_click = () => {
			if(this.textRef.current!.value == "") {
				return
			}
			this.props.dispatch(addTodo(this.textRef.current!.value));
			this.textRef.current!.value = "";
		}

		on_click_for_del = (e: React.MouseEvent<HTMLButtonElement>) => {
			var id:number;
			id = +(e.currentTarget.id)
      this.props.dispatch(deleteTodo(id))
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
			const { classes } = this.props
			return (
				<div className={classes.root}>
					<div>
						<Button color="primary" variant="contained" onClick={this.on_click} className={classes.button}>+</Button>
						<Input inputRef={this.textRef} type="text" />
					</div>
					<List>
						{this.listItems()}
					</List>
				</div>
			)
		}
	});

export default connect(mapStateToProps)(NumberList);
