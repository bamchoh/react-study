import * as React from 'react';
import { shallow, mount } from 'enzyme';
const sinon = require("sinon");
import { TodoState } from '../reducers/todos'
import TodoList from './TodoList'
import ListItem from '@material-ui/core/ListItem';

const initUser = {
  init:true,
  login:true,
}

describe('TodoList', () => {
  describe('should send COMPLETE_TODO action when click ListItem', () => {
    it('1 state, click first list', () => {
      const spy = { completeTodo: jest.fn() };
      const state:TodoState[] = [
        {
          id:"0",
          text:"aaa", 
          completed:false,
        }
      ]
      const wrapper = shallow(<TodoList action={spy} todos={state} user={initUser}/>);
      const mockedEvent = { currentTarget: { id: "0" }};
      wrapper.dive().find(ListItem).at(0).simulate('click', mockedEvent);

      expect(spy.completeTodo.mock.calls.length).toBe(1)
      expect(spy.completeTodo.mock.calls[0][0]).toEqual({"id": "0"})
    })

    it('2 state, click first list', () => {
      const spy = { completeTodo: jest.fn() };
      const state:TodoState[] = [
        { id:"0", text:"aaa", completed:false, },
        { id:"1", text:"bbb", completed:false, }
      ]
      const wrapper = shallow(<TodoList action={spy} todos={state} user={initUser}/>);
      const mockedEvent0 = { currentTarget: { id: "0" }};
      wrapper.dive().find(ListItem).at(0).simulate('click', mockedEvent0);
      expect(spy.completeTodo.mock.calls.length).toBe(1)
      expect(spy.completeTodo.mock.calls[0][0]).toEqual({"id": "0"})

      const mockedEvent1 = { currentTarget: { id: "1" }};
      wrapper.dive().find(ListItem).at(1).simulate('click', mockedEvent1);
      expect(spy.completeTodo.mock.calls.length).toBe(2)
      expect(spy.completeTodo.mock.calls[1][0]).toEqual({"id": "1"})
    })

    it('3 state, click last list', () => {
      const spy = { completeTodo: jest.fn() };
      const state:TodoState[] = [
        { id:"0", text:"aaa", completed:false, },
        { id:"1", text:"bbb", completed:false, },
        { id:"2", text:"ccc", completed:false, }
      ]
      const wrapper = shallow(<TodoList action={spy} todos={state} user={initUser}/>);
      const mockedEvent0 = { currentTarget: { id: "2" }};
      wrapper.dive().find(ListItem).at(2).simulate('click', mockedEvent0);
      expect(spy.completeTodo.mock.calls.length).toBe(1)
      expect(spy.completeTodo.mock.calls[0][0]).toEqual({"id": "2"})
    })
  })
})
