import * as actions from './index'

describe('todo actions', () => {
  it('addTodo should create ADD_TODO action', () => {
    expect(actions.addTodo('Use Redux')).toEqual({
      type: 'ADD_TODO',
      text: 'Use Redux',
    })
  })

  it('fetchTodo should create FETCH_TODO action', () => {
    expect(actions.fetchTodo()).toEqual({
      type: 'FETCH_TODO',
    })
  })

  describe('completeTodo should crate COMPLETE_TODO action', () => {
    it('with zero', () => {
      expect(actions.completeTodo("0")).toEqual({
        type: 'COMPLETE_TODO',
        id: "0",
      })
    })

    it('with one', () => {
      expect(actions.completeTodo("1")).toEqual({
        type: 'COMPLETE_TODO',
        id: "1",
      })
    })

    it('with huge value', () => {
      expect(actions.completeTodo("9223372036854775807")).toEqual({
        type: 'COMPLETE_TODO',
        id: "9223372036854775807",
      })
    })

    it('with negative value', () => {
      expect(actions.completeTodo("-1234")).toEqual({
        type: 'COMPLETE_TODO',
        id: "-1234",
      })
    })
  })

  describe('deleteTodo should crate DELETE_TODO action', () => {
    it('with zero', () => {
      expect(actions.deleteTodo("0")).toEqual({
        type: 'DELETE_TODO',
        id: "0",
      })
    })

    it('with one', () => {
      expect(actions.deleteTodo("1")).toEqual({
        type: 'DELETE_TODO',
        id: "1",
      })
    })

    it('with huge value', () => {
      expect(actions.deleteTodo("9223372036854775807")).toEqual({
        type: 'DELETE_TODO',
        id: "9223372036854775807",
      })
    })

    it('with negative value', () => {
      expect(actions.deleteTodo("-1234")).toEqual({
        type: 'DELETE_TODO',
        id: "-1234",
      })
    })
  })
})
