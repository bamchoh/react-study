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
      const spy = sinon.spy();
      const state:TodoState[] = [
        {
          id:"0",
          text:"aaa", 
          completed:false,
        }
      ]
      const wrapper = shallow(<TodoList action={spy} todos={state} dispatch={{}} user={initUser}/>);
      const mockedEvent = { currentTarget: { id: "0" }};
      wrapper.dive().find(ListItem).at(0).simulate('click', mockedEvent);
      // componentWillMount() と on_click_li() の両方でactionが呼ばれるため2になる
      expect(spy.callCount).toEqual(2)
      expect(spy.getCall(1).args[0]).toEqual({})
      expect(spy.getCall(1).args[1]).toEqual({"id": "0", "type": "COMPLETE_TODO"})
    })

    it('2 state, click first list', () => {
      const spy = sinon.spy();
      const state:TodoState[] = [
        { id:"0", text:"aaa", completed:false, },
        { id:"1", text:"bbb", completed:false, }
      ]
      const wrapper = shallow(<TodoList action={spy} todos={state} dispatch={{}} user={initUser}/>);
      const mockedEvent0 = { currentTarget: { id: "0" }};
      wrapper.dive().find(ListItem).at(0).simulate('click', mockedEvent0);
      expect(spy.callCount).toEqual(2)
      expect(spy.getCall(1).args[0]).toEqual({})
      expect(spy.getCall(1).args[1]).toEqual({"id": "0", "type": "COMPLETE_TODO"})

      const mockedEvent1 = { currentTarget: { id: "1" }};
      wrapper.dive().find(ListItem).at(1).simulate('click', mockedEvent1);
      expect(spy.callCount).toEqual(4)
      expect(spy.getCall(3).args[0]).toEqual({})
      expect(spy.getCall(3).args[1]).toEqual({"id": "1", "type": "COMPLETE_TODO"})
    })

    it('3 state, click last list', () => {
      const spy = sinon.spy();
      const state:TodoState[] = [
        { id:"0", text:"aaa", completed:false, },
        { id:"1", text:"bbb", completed:false, },
        { id:"2", text:"ccc", completed:false, }
      ]
      const wrapper = shallow(<TodoList action={spy} todos={state} dispatch={{}} user={initUser}/>);
      const mockedEvent0 = { currentTarget: { id: "2" }};
      wrapper.dive().find(ListItem).at(2).simulate('click', mockedEvent0);
      expect(spy.callCount).toEqual(2)
      expect(spy.getCall(1).args[0]).toEqual({})
      expect(spy.getCall(1).args[1]).toEqual({"id": "2", "type": "COMPLETE_TODO"})
    })
  })

  describe('should send FETCH_TODO action when click ListItem', () => {
    it('should call action when mount', () => {
      const spy = sinon.spy();
      const state:TodoState[] = [
        { id:"0", text:"aaa", completed:false, },
        { id:"1", text:"bbb", completed:false, },
        { id:"2", text:"ccc", completed:false, }
      ]
      const wrapper = mount(<TodoList action={spy} todos={state} dispatch={{}} user={initUser}/>);
      const mockedEvent0 = { currentTarget: { id: "2" }};
      expect(spy.callCount).toEqual(1)
      expect(spy.getCall(0).args[0]).toEqual({})
      expect(spy.getCall(0).args[1]).toEqual({"type": "FETCH_TODO"})
    })
  })
})
