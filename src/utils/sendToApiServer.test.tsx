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
    bridge.addTodo("test")

    expect(mockGetDatabase.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls.length).toBe(0)
    expect(mockDbRef.mock.calls.length).toBe(0)
    expect(mockDbSet.mock.calls.length).toBe(0)

    bridge.uid = "user1"
    bridge.addTodo("todo 1")
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
    bridge.completeTodo("abcdefg1234")

    expect(mockGetDatabase.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls.length).toBe(0)
    expect(mockDbRef.mock.calls.length).toBe(0)
    expect(mockDbSet.mock.calls.length).toBe(0)

    bridge.uid = "user1"

    bridge.completeTodo("abcdefg1234")
    expect(mockGetDatabase.mock.calls.length).toBe(2)
    expect(mockDispatch.mock.calls.length).toBe(0)
    expect(mockDbRef.mock.calls.length).toBe(1)
    expect(mockDbRef.mock.calls[0][0]).toEqual("todos/user1/abcdefg1234/completed")
    expect(mockDbOnce.mock.calls.length).toBe(1)
    expect(mockDbOnce.mock.calls[0][0]).toEqual('value')
    expect(mockDbSet.mock.calls.length).toBe(1)
    expect(mockDbSet.mock.calls[0][0]).toEqual(true)

    bridge.completeTodo("abcdefg1234")
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
    bridge.deleteTodo("abcdefg1234")

    expect(mockGetDatabase.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls.length).toBe(0)
    expect(mockDbRef.mock.calls.length).toBe(0)
    expect(mockDbRemove.mock.calls.length).toBe(0)

    bridge.uid = "user1"
    bridge.deleteTodo("abcdefg1234")
    expect(mockGetDatabase.mock.calls.length).toBe(2)
    expect(mockDispatch.mock.calls.length).toBe(0)
    expect(mockDbRef.mock.calls.length).toBe(1)
    expect(mockDbRef.mock.calls[0][0]).toEqual("todos/user1/abcdefg1234")
    expect(mockDbRemove.mock.calls.length).toBe(1)
  })
})
