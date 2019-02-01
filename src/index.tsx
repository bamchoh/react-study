import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Todo from "./components/Todo";
import rootReducer from './reducers/index'

const store = createStore(rootReducer)

ReactDOM.render(
	<Provider store={store}>
		<Todo />
	</Provider>,
	document.getElementById("root")
);
