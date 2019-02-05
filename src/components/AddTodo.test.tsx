import * as React from 'react';
import { shallow, mount } from 'enzyme';
const sinon = require("sinon");
import AddTodo from './AddTodo'
import Input from '@material-ui/core/Input';

describe('AddTodo', () => {
  it('should not send ADD_TODO action when text is empty', () => {
    const spy = sinon.spy();
    const wrapper = mount(<AddTodo action={spy} dispatch={{}} />);
    const input = wrapper.find(Input).at(0);
    // input.props().inputRef.current.value = ""
    wrapper.find('WithStyles(Button)').simulate("click")
    expect(spy.callCount).toEqual(0)
    // expect(spy.getCall(1).args[0]).toEqual({})
    // expect(spy.getCall(1).args[1]).toEqual({"text": "", "type": "ADD_TDOO"})
  })

  it('should send ADD_TODO action when text is empty', () => {
    const spy = sinon.spy();
    const wrapper = mount(<AddTodo action={spy} dispatch={{}} />);
    const input = wrapper.find(Input).at(0);
    input.props().inputRef.current.value = "test"
    wrapper.find('WithStyles(Button)').simulate("click")
    expect(spy.callCount).toEqual(1)
    expect(spy.getCall(0).args[0]).toEqual({})
    expect(spy.getCall(0).args[1]).toEqual({"text": "test", "type": "ADD_TODO"})

    input.props().inputRef.current.value = "jest"
    wrapper.find('WithStyles(Button)').simulate("click")
    expect(spy.callCount).toEqual(2)
    expect(spy.getCall(1).args[0]).toEqual({})
    expect(spy.getCall(1).args[1]).toEqual({"text": "jest", "type": "ADD_TODO"})
  })
})
