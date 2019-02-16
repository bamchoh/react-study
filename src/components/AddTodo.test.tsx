import * as React from 'react';
import { mount } from 'enzyme';
const sinon = require("sinon");
import Input from '@material-ui/core/Input';

import AddTodo from './AddTodo'

const initUser = {
  init: true,
  login: true
}

describe('AddTodo', () => {
  it('should not send ADD_TODO action when text is empty', () => {
    const spy = sinon.spy();
    const wrapper = mount(<AddTodo user={initUser} action={spy} />);
    const input = wrapper.find(Input).at(0);
    wrapper.find('WithStyles(Button)').simulate("click")
    expect(spy.callCount).toEqual(0)
  })

  it('should send ADD_TODO action when text is empty', () => {
    const spy = {
      addTodo: jest.fn()
    }
    const wrapper = mount(<AddTodo user={initUser} action={spy} />);
    const input = wrapper.find(Input).at(0);
    input.props().inputRef.current.value = "test"
    wrapper.find('WithStyles(Button)').simulate("click")
    expect(spy.addTodo.mock.calls.length).toBe(1)
    expect(spy.addTodo.mock.calls[0][0]).toEqual({"text": "test"})

    input.props().inputRef.current.value = "jest"
    wrapper.find('WithStyles(Button)').simulate("click")
    expect(spy.addTodo.mock.calls.length).toBe(2)
    expect(spy.addTodo.mock.calls[1][0]).toEqual({"text": "jest"})
  })
})
