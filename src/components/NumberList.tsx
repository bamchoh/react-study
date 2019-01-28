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

import { TodoState, Item } from "./TodoStateInterface";

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

const NumberList = withStyles(styles)(
	class extends React.Component<WithStyles<typeof styles>, TodoState> {
		text: string;
		textRef = React.createRef<HTMLInputElement>();

		constructor(props: any) {
			super(props);
			this.state = {
				items: []
			};
			this.text = "";
		}

		updateState = (state: TodoState) => {
			this.setState(state)
		}

		on_click_li = (e: React.MouseEvent<HTMLDivElement>) => {
			var id:number;
			id = +(e.currentTarget.id)
			this.state.items[id].done = !this.state.items[id].done
			this.updateState(this.state);
		}

		on_click = () => {
			if(this.textRef.current!.value == "") {
				return
			}
			this.state.items.push({ todo:this.text, done:false});
			this.textRef.current!.value = "";
			this.updateState(this.state);
		}

		on_change = (e: React.ChangeEvent<HTMLInputElement>) => {
			this.text = e.currentTarget.value;
		}

		on_click_for_del = (e: React.MouseEvent<HTMLButtonElement>) => {
			var id:number;
			id = +(e.currentTarget.id)
			this.state.items.splice(id, 1)
			this.updateState(this.state);
		}

		drawItems = (item: Item) => {
			if(item.done) {
				return <s>{item.todo}</s>
			}
			return item.todo
		}

		listItems = (state: TodoState) => {
			return state.items.map((item, i) => {
				if(item.todo!="") {
					return(
						<ListItem key={i} button id={String(i)} onClick={this.on_click_li}>
						<ListItemText>
						{this.drawItems(item)}
						</ListItemText>
						<ListItemSecondaryAction>
						<IconButton aria-label="Delete" onClick={this.on_click_for_del} id={String(i)}>
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
				<Input inputRef={this.textRef} type="text" onChange={this.on_change} />
				</div>
				<List>
				{this.listItems(this.state)}
				</List>
				</div>
			)
		}
	});

export default NumberList;
