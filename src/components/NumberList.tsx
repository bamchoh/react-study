import * as React from 'react';

import { TodoState, Item } from "./TodoStateInterface";

export class NumberList extends React.Component<{}, TodoState> {
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

	on_click_li = (e: React.MouseEvent<HTMLLIElement>) => {
		var id:number;
		id = +(e.currentTarget.id)
		this.state.items[id].done = true
		this.updateState(this.state);
	}

	on_click = () => {
		this.state.items.push({ todo:this.text, done:false});
		this.textRef.current!.value = "";
		this.updateState(this.state);
	}

	on_change = (e: React.FormEvent<HTMLInputElement>) => {
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
					<li id={String(i)} key={i} onClick={this.on_click_li}>
						<div>
							{this.drawItems(item)}
							<button id={String(i)} onClick={this.on_click_for_del}>-</button>
						</div>
					</li>
				)
			}
			return null;
		});
	}

	render() {
		return (
			<div>
				<div>
					<button onClick={this.on_click}>+</button>
					<input ref={this.textRef} type="text" onChange={this.on_change} />
				</div>
				<ul>{this.listItems(this.state)}</ul>
			</div>
		)
	}
}
