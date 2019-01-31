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
import addTodo from '../actions'

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
		dispatch:any

		constructor(props: any) {
			super(props);
			this.dispatch = this.props.dispatch;
		}

		on_click_li = (e: React.MouseEvent<HTMLDivElement>) => {
			var id:number;
			id = +(e.currentTarget.id)
			// this.state.items[id].done = !this.state.items[id].done
			// this.updateState(this.state);
		}

		on_click = () => {
			if(this.textRef.current!.value == "") {
				return
			}
			this.dispatch(addTodo(this.textRef.current!.value));
			this.textRef.current!.value = "";
		}

		on_click_for_del = (e: React.MouseEvent<HTMLButtonElement>) => {
			var id:number;
			id = +(e.currentTarget.id)
			// this.state.items.splice(id, 1)
			// this.updateState(this.state);
		}

		drawItems = (item: TodoState) => {
			if(item.completed) {
				return <s>{item.completed}</s>
			}
			return item.text
		}

		listItems = () => {
			return this.props.todos.map((item:TodoState) => {
				if(item.completed==false) {
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
				}
				return null;
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
