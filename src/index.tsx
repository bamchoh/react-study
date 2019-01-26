import * as React from "react";
import * as ReactDOM from "react-dom";

import { Rect } from "./components/Rect";
import { CheckboxWithLabel} from "./components/CheckboxWithLabel";

ReactDOM.render(
	<div>
		<Rect num={1} bgcolor="#00FF00" />
		<Rect num={2} bgcolor="#FF0000" />
		<CheckboxWithLabel labelOn="On" labelOff="Off" />
	</div>,
	document.getElementById("root")
);
