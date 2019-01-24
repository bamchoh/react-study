import * as React from "react";
import * as ReactDOM from "react-dom";

import { Rect } from "./components/Rect";

ReactDOM.render(
	<div>
		<Rect num={1} bgcolor="#00FF00" />
		<Rect num={2} bgcolor="#FF0000" />
	</div>,
	document.getElementById("root")
);
