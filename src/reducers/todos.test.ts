import todos from './todos'

describe('todo reducer', () => {
  it('should handle initial state', () => {
    expect(
      todos(undefined, {})
    ).toEqual([])
  })

  it('should handle ADD_TODO', () => {
    expect(
      todos([], {
        type: 'ADD_TODO',
        text: 'Run the tests',
        id: "0"
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
        type: 'ADD_TODO',
        text: 'Use Redux',
        id: "1"
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
        type: 'ADD_TODO',
        text: 'Fix tests',
        id: "2"
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

  it('should handle COMPLETE_TODO', () => {
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
        type: 'COMPLETE_TODO',
        id: "1"
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
        type: 'COMPLETE_TODO',
        id: "1"
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

  it('should handle DELETE_TODO', () => {
    expect(
      todos([], {
        type: 'DELETE_TODO',
        id: "0",
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
        type: 'DELETE_TODO',
        id: "0",
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
        type: 'DELETE_TODO',
        id: "9",
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
        type: 'DELETE_TODO',
        id: "9",
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

  it('should handle FETCH_TODO', () => {
    expect(
      todos([], {
        type: "FETCH_TODO",
      })
    ).toEqual([])

    expect(
      todos([], {
        type: "FETCH_TODO",
        data: null,
      })
    ).toEqual([])

    expect(
      todos([], {
        type: "FETCH_TODO",
        data: [
          {
            text: "Run the tests",
            completed: false,
            id: "0"
          }
        ],
      })
    ).toEqual([
      {
        text: "Run the tests",
        completed: false,
        id: "0"
      }
    ])

    expect(
      todos([], {
        type: "FETCH_TODO",
        data: [
          {
            text: "Run the tests",
            completed: false,
            id: "0"
          }, {
            text: "Use Redux",
            completed: true,
            id: "1"
          }, {
            text: "Fix tests",
            completed: false,
            id: "2"
          }
        ],
      })
    ).toEqual([
      {
        text: "Run the tests",
        completed: false,
        id: "0"
      }, {
        text: "Use Redux",
        completed: true,
        id: "1"
      }, {
        text: "Fix tests",
        completed: false,
        id: "2"
      }
    ])
  })
})
