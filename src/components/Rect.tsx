import * as React from "react";

interface RectProps {
	num: number;
	bgcolor: string;
}

interface RectState {
	num: number;
}

export class Rect extends React.Component<RectProps, RectState> {
	style = {}

	constructor(props: RectProps) {
		super(props)
		this.state = {
			num: props.num,
		};

		this.style = {
			width: 50,
			height: 50,
			background: this.props.bgcolor,
		}
	}

	onIncrement = () => {
		var num = this.state.num + 1
		this.setState({num})
	}

	render() {
		return (
			<button style={this.style} className="square" onClick={this.onIncrement}>
			Hello {this.state.num}
			</button>
		)
	}
}

