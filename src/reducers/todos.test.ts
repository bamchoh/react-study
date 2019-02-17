import todos from './todos'

describe('todo reducer', () => {
  it('should handle initial state', () => {
    expect(
      todos(undefined, {})
    ).toEqual([])
  })

  it('should handle todos/child_added', () => {
    expect(
      todos([], {
        type: 'todos/child_added',
        payload: {
          text: 'Run the tests',
          completed: false,
          id: "0"
        }
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: "0"
      }
    ])

    expect(
      todos([
        {
          text: 'Run the tests',
          completed: false,
          id: "0"
        }
      ], {
        type: 'todos/child_added',
        payload: {
          text: 'Use Redux',
          completed: false,
          id: "1"
        }
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: "0"
      }, {
        text: 'Use Redux',
        completed: false,
        id: "1"
      }
    ])

    expect(
      todos([
        {
          text: 'Run the tests',
          completed: false,
          id: "0"
        }, {
          text: 'Use Redux',
          completed: false,
          id: "1"
        }
      ], {
        type: 'todos/child_added',
        payload: {
          text: 'Fix tests',
          completed: false,
          id: "2"
        }
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: "0"
      }, {
        text: 'Use Redux',
        completed: false,
        id: "1"
      }, {
        text: 'Fix tests',
        completed: false,
        id: "2"
      }
    ])
  })

  it('should handle todos/child_changed', () => {
    expect(
      todos([
        {
          text: 'Run the tests',
          completed: false,
          id: "1"
        }, {
          text: 'Use Redux',
          completed: false,
          id: "0"
        }
      ], {
        type: 'todos/child_changed',
        payload: {
          text: 'Run the tests',
          completed: true,
          id: "1"
        }
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: true,
        id: "1"
      }, {
        text: 'Use Redux',
        completed: false,
        id: "0"
      }
    ])

    expect(
      todos([
        {
          text: 'Run the tests',
          completed: true,
          id: "1"
        }, {
          text: 'Use Redux',
          completed: false,
          id: "0"
        }
      ], {
        type: 'todos/child_changed',
        payload: {
          text: 'Run the tests',
          completed: false,
          id: "1"
        }
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: "1"
      }, {
        text: 'Use Redux',
        completed: false,
        id: "0"
      }
    ])
  })

  it('should handle todos/child_removed', () => {
    expect(
      todos([], {
        type: 'todos/child_removed',
        payload: {
          text: "",
          completed: false,
          id: "0",
        }
      })
    ).toEqual([])

    expect(
      todos([
        {
          text: 'Run the tests',
          completed: true,
          id: "0"
        }
      ], {
        type: 'todos/child_removed',
        payload: {
          text: 'Run the tests',
          completed: true,
          id: "0",
        }
      })
    ).toEqual([])

    expect(
      todos([
        {
          text: 'Run the tests',
          completed: true,
          id: "10"
        }, {
          text: 'Use Redux',
          completed: false,
          id: "9"
        }
      ], {
        type: 'todos/child_removed',
        payload: {
          text: 'Use Redux',
          completed: false,
          id: "9"
        }
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: true,
        id: "10"
      }
    ])

    expect(
      todos([
        {
          text: 'Run the tests',
          completed: true,
          id: "10"
        }, {
          text: 'Use Redux',
          completed: false,
          id: "9"
        }, {
          text: 'Fix tests',
          completed: false,
          id: "8"
        }
      ], {
        type: 'todos/child_removed',
        payload: {
          text: 'Use Redux',
          completed: false,
          id: "9"
        }
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: true,
        id: "10"
      }, {
        text: 'Fix tests',
        completed: false,
        id: "8"
      }
    ])
  })
})
