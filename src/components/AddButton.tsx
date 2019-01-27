import * as React from 'react';

import { TodoState } from "./TodoStateInterface";

export interface AddButtonProps {
	updateState: (state: TodoState) => void,
}

export class AddButton extends React.Component<AddButtonProps, TodoState> {
	private myRef = React.createRef<HTMLButtonElement>()

	constructor(props: any) {
		super(props);
	}

	updateState = (state: TodoState) => {
		this.setState(state)
		this.props.updateState(state);
	}

	on_click = () => {
		this.state.items.push({todo:"", done:false});
		this.updateState(this.state);
	}

	render() {
		return (
			<button ref={this.myRef} onClick={this.on_click}>
				+
			</button>
		)
	}
}
