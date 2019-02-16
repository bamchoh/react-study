import * as fetchMock from 'fetch-mock'
import DatabaseBridge from './sendToApiServer'


describe('DatabaseBridge', () => {
  it('addTodo() should work well', () => {
    const mockDispatch = jest.fn()
    const mockDbSet = jest.fn()
    const mockDbRef = jest.fn(() => {
      return {
        push: () => {
          return {
            set: mockDbSet,
            key: "1"
          }
        }
      }
    })
    const bridge = new DatabaseBridge(mockDispatch)
    const mockGetDatabase = jest.spyOn(bridge, 'getDatabase');
    mockGetDatabase.mockImplementation(() => {
      return { ref: mockDbRef }
    })
    bridge.uid = ""
    bridge.addTodo({ text: "text"})

    expect(mockGetDatabase.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls.length).toBe(0)
    expect(mockDbRef.mock.calls.length).toBe(0)
    expect(mockDbSet.mock.calls.length).toBe(0)

    bridge.uid = "user1"
    bridge.addTodo({ text: "todo 1"})
    expect(mockGetDatabase.mock.calls.length).toBe(2)
    expect(mockDispatch.mock.calls.length).toBe(0)
    expect(mockDbRef.mock.calls.length).toBe(1)
    expect(mockDbRef.mock.calls[0][0]).toEqual("todos/user1")
    expect(mockDbSet.mock.calls.length).toBe(1)
    expect(mockDbSet.mock.calls[0][0]).toEqual({id:"1", text:"todo 1", completed: false})
  })

  it('complatedTodo() should work well', () => {
    const mockDispatch = jest.fn()
    const mockDbSet = jest.fn()
    const mockDbOnce = jest
      .fn()
      .mockImplementationOnce(() => {
        return {
          then: (fn:any) => {
            fn({ val: () => { return false }})
          }
        }
      })
      .mockImplementationOnce(() => {
        return {
          then: (fn:any) => {
            fn({ val: () => { return true }})
          }
        }
      })
    const mockDbRef = jest.fn(() => {
      return {
        once: mockDbOnce,
        set: mockDbSet
      }
    })
    const bridge = new DatabaseBridge(mockDispatch)
    const mockGetDatabase = jest.spyOn(bridge, 'getDatabase');
    mockGetDatabase.mockImplementation(() => {
      return { ref: mockDbRef }
    })
    bridge.uid = ""
    bridge.completeTodo({type:'todos/complete_todo', payload: { id: "abcdefg1234"} })

    expect(mockGetDatabase.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls.length).toBe(0)
    expect(mockDbRef.mock.calls.length).toBe(0)
    expect(mockDbSet.mock.calls.length).toBe(0)

    bridge.uid = "user1"

    bridge.completeTodo({ id: "abcdefg1234"})
    expect(mockGetDatabase.mock.calls.length).toBe(2)
    expect(mockDispatch.mock.calls.length).toBe(0)
    expect(mockDbRef.mock.calls.length).toBe(1)
    expect(mockDbRef.mock.calls[0][0]).toEqual("todos/user1/abcdefg1234/completed")
    expect(mockDbOnce.mock.calls.length).toBe(1)
    expect(mockDbOnce.mock.calls[0][0]).toEqual('value')
    expect(mockDbSet.mock.calls.length).toBe(1)
    expect(mockDbSet.mock.calls[0][0]).toEqual(true)

    bridge.completeTodo({ id: "abcdefg1234"})
    expect(mockGetDatabase.mock.calls.length).toBe(3)
    expect(mockDispatch.mock.calls.length).toBe(0)
    expect(mockDbRef.mock.calls.length).toBe(2)
    expect(mockDbRef.mock.calls[1][0]).toEqual("todos/user1/abcdefg1234/completed")
    expect(mockDbOnce.mock.calls.length).toBe(2)
    expect(mockDbOnce.mock.calls[1][0]).toEqual('value')
    expect(mockDbSet.mock.calls.length).toBe(2)
    expect(mockDbSet.mock.calls[1][0]).toEqual(false)
  })

  it('deleteTodo() should work well', () => {
    const mockDispatch = jest.fn()
    const mockDbRemove = jest.fn()
    const mockDbRef = jest.fn(() => {
      return {
        remove: mockDbRemove
      }
    })
    const bridge = new DatabaseBridge(mockDispatch)
    const mockGetDatabase = jest.spyOn(bridge, 'getDatabase');
    mockGetDatabase.mockImplementation(() => {
      return { ref: mockDbRef }
    })
    bridge.uid = ""
    bridge.deleteTodo({ id: "abcdefg1234"})

    expect(mockGetDatabase.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls.length).toBe(0)
    expect(mockDbRef.mock.calls.length).toBe(0)
    expect(mockDbRemove.mock.calls.length).toBe(0)

    bridge.uid = "user1"
    bridge.deleteTodo({ id: "abcdefg1234"})
    expect(mockGetDatabase.mock.calls.length).toBe(2)
    expect(mockDispatch.mock.calls.length).toBe(0)
    expect(mockDbRef.mock.calls.length).toBe(1)
    expect(mockDbRef.mock.calls[0][0]).toEqual("todos/user1/abcdefg1234")
    expect(mockDbRemove.mock.calls.length).toBe(1)
  })

  it('initdb() should work well', () => {
    const mockDispatch = jest.fn()
    const bridge = new DatabaseBridge(mockDispatch)
    const mock1 = jest.spyOn(bridge, 'changeUsersEvent').mockImplementation();
    const mock2 = jest.spyOn(bridge, 'childAddEvent').mockImplementation();
    const mock3 = jest.spyOn(bridge, 'childRemovedEvent').mockImplementation();
    const mock4 = jest.spyOn(bridge, 'childChangedEvent').mockImplementation();
    const mockGetDatabase = jest.spyOn(bridge, 'getDatabase').mockImplementation(() => {
      return {}
    })
    bridge.uid = ""
    bridge.initdb({uid: "abcdefg1234", username: 'user1' })

    expect(mockGetDatabase.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls.length).toBe(1)
    expect(mock1.mock.calls.length).toBe(1)
    expect(mock1.mock.calls[0][0]).toEqual({})
    expect(mock1.mock.calls[0][1]).toEqual({uid: 'abcdefg1234', username: 'user1'})
    expect(mock2.mock.calls.length).toBe(1)
    expect(mock2.mock.calls[0][0]).toEqual({})
    expect(mock3.mock.calls.length).toBe(1)
    expect(mock3.mock.calls[0][0]).toEqual({})
    expect(mock4.mock.calls.length).toBe(1)
    expect(mock4.mock.calls[0][0]).toEqual({})
    expect(bridge.uid).toEqual('abcdefg1234')
  })

  it('changeUsersEvent() should work well', () => {
    const mockDispatch = jest.fn()
    const mockDbSet = jest.fn()
    const mockDbOnce = jest
      .fn()
      .mockImplementationOnce(() => {
        return {
          then: (fn:any) => {
            fn({ val: () => { return null }})
          }
        }
      })
      .mockImplementationOnce(() => {
        return {
          then: (fn:any) => {
            fn({ val: () => { return { username: "user2"} }})
          }
        }
      })
    const mockDbRef = jest.fn(() => {
      return {
        once: mockDbOnce,
        set: mockDbSet
      }
    })
    const bridge = new DatabaseBridge(mockDispatch)
    const db = { ref: mockDbRef }
    bridge.uid = "abcdefg1234"

    const payload = { username: 'user1' };
    bridge.changeUsersEvent(db, payload)
    expect(mockDbRef.mock.calls.length).toBe(1)
    expect(mockDbRef.mock.calls[0][0]).toEqual("users/abcdefg1234")
    expect(mockDbOnce.mock.calls.length).toBe(1)
    expect(mockDbOnce.mock.calls[0][0]).toEqual('value')
    expect(mockDbSet.mock.calls.length).toBe(1)
    expect(mockDbSet.mock.calls[0][0]).toEqual({username: 'user1'})
    expect(mockDispatch.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls[0][0]).toEqual({type: 'user/change_username', payload: { username: 'user1' }})

    bridge.changeUsersEvent(db, payload)
    expect(mockDbRef.mock.calls.length).toBe(2)
    expect(mockDbRef.mock.calls[0][0]).toEqual("users/abcdefg1234")
    expect(mockDbOnce.mock.calls.length).toBe(2)
    expect(mockDbOnce.mock.calls[1][0]).toEqual('value')
    expect(mockDbSet.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls.length).toBe(2)
    expect(mockDispatch.mock.calls[1][0]).toEqual({type: 'user/change_username', payload: { username: 'user2' }})
  })

  it('childAddEvent() should work well', () => {
    const mockDispatch = jest.fn()
    const mockDbOn = jest
      .fn()
      .mockImplementationOnce((url:string, fn:any) => {
        fn({ val: () => { return null }})
      })
      .mockImplementationOnce((url:string, fn:any) => {
        fn({ val: () => { return { id: 'abcdefg1234', text: 'todo 1', completed: false} }})
      })
    const mockDbRef = jest.fn(() => {
      return {
        on: mockDbOn
      }
    })
    const bridge = new DatabaseBridge(mockDispatch)
    const db = { ref: mockDbRef }
    bridge.uid = "abcdefg1234"

    bridge.childAddEvent(db)
    expect(mockDbRef.mock.calls.length).toBe(1)
    expect(mockDbRef.mock.calls[0][0]).toEqual("todos/abcdefg1234")
    expect(mockDbOn.mock.calls.length).toBe(1)
    expect(mockDbOn.mock.calls[0][0]).toEqual('child_added')
    expect(mockDispatch.mock.calls.length).toBe(0)

    bridge.childAddEvent(db)
    expect(mockDbRef.mock.calls.length).toBe(2)
    expect(mockDbRef.mock.calls[0][0]).toEqual("todos/abcdefg1234")
    expect(mockDbOn.mock.calls.length).toBe(2)
    expect(mockDbOn.mock.calls[1][0]).toEqual('child_added')
    expect(mockDispatch.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls[0][0]).toEqual({type: 'todos/child_added', payload: { id: 'abcdefg1234', text: 'todo 1', completed: false}})
  })

  it('childRemoveEvent() should work well', () => {
    const mockDispatch = jest.fn()
    const mockDbOn = jest
      .fn()
      .mockImplementationOnce((url:string, fn:any) => {
        fn({ val: () => { return null }})
      })
      .mockImplementationOnce((url:string, fn:any) => {
        fn({ val: () => { return { id: 'abcdefg1234', text: 'todo 1', completed: false} }})
      })
    const mockDbRef = jest.fn(() => {
      return {
        on: mockDbOn
      }
    })
    const bridge = new DatabaseBridge(mockDispatch)
    const db = { ref: mockDbRef }
    bridge.uid = "abcdefg1234"

    bridge.childRemovedEvent(db)
    expect(mockDbRef.mock.calls.length).toBe(1)
    expect(mockDbRef.mock.calls[0][0]).toEqual("todos/abcdefg1234")
    expect(mockDbOn.mock.calls.length).toBe(1)
    expect(mockDbOn.mock.calls[0][0]).toEqual('child_removed')
    expect(mockDispatch.mock.calls.length).toBe(0)

    bridge.childRemovedEvent(db)
    expect(mockDbRef.mock.calls.length).toBe(2)
    expect(mockDbRef.mock.calls[0][0]).toEqual("todos/abcdefg1234")
    expect(mockDbOn.mock.calls.length).toBe(2)
    expect(mockDbOn.mock.calls[1][0]).toEqual('child_removed')
    expect(mockDispatch.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls[0][0]).toEqual({type: 'todos/child_removed', payload: { id: 'abcdefg1234', text: 'todo 1', completed: false}})
  })

  it('childChangedEvent() should work well', () => {
    const mockDispatch = jest.fn()
    const mockDbOn = jest
      .fn()
      .mockImplementationOnce((url:string, fn:any) => {
        fn({ val: () => { return null }})
      })
      .mockImplementationOnce((url:string, fn:any) => {
        fn({ val: () => { return { id: 'abcdefg1234', text: 'todo 1', completed: false} }})
      })
    const mockDbRef = jest.fn(() => {
      return {
        on: mockDbOn
      }
    })
    const bridge = new DatabaseBridge(mockDispatch)
    const db = { ref: mockDbRef }
    bridge.uid = "abcdefg1234"

    bridge.childChangedEvent(db)
    expect(mockDbRef.mock.calls.length).toBe(1)
    expect(mockDbRef.mock.calls[0][0]).toEqual("todos/abcdefg1234")
    expect(mockDbOn.mock.calls.length).toBe(1)
    expect(mockDbOn.mock.calls[0][0]).toEqual('child_changed')
    expect(mockDispatch.mock.calls.length).toBe(0)

    bridge.childChangedEvent(db)
    expect(mockDbRef.mock.calls.length).toBe(2)
    expect(mockDbRef.mock.calls[0][0]).toEqual("todos/abcdefg1234")
    expect(mockDbOn.mock.calls.length).toBe(2)
    expect(mockDbOn.mock.calls[1][0]).toEqual('child_changed')
    expect(mockDispatch.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls[0][0]).toEqual({type: 'todos/child_changed', payload: { id: 'abcdefg1234', text: 'todo 1', completed: false}})
  })
})
