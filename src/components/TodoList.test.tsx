import * as React from 'react';
import { shallow } from 'enzyme';
const sinon = require("sinon");
import { TodoState } from '../reducers/todos'
import TodoList from './TodoList'
import ListItem from '@material-ui/core/ListItem';

import VisibleTodoList from '../containers/VisibleTodoList';

describe('TodoList', () => {
  it('test1', () => {
    const spy = sinon.spy();
    const state:TodoState[] = [
      {
        id:0,
        text:"aaa", 
        completed:false,
      }
    ]
    const wrapper = shallow(<TodoList action={spy} todos={state} dispatch={{}}/>);
    const mockedEvent = { currentTarget: { id: "0" }};
    wrapper.dive().find(ListItem).at(0).simulate('click', mockedEvent);
    // componentWillMount() と on_click_li() の両方でactionが呼ばれるため2になる
    expect(spy.callCount).toEqual(2)
    expect(spy.getCall(1).args[0]).toEqual({})
    expect(spy.getCall(1).args[1]).toEqual({"id": 0, "type": "COMPLETE_TODO"})
  })
})
