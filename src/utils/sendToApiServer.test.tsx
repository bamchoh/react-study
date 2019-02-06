import * as fetchMock from 'fetch-mock'
import sendToApiServer from './sendToApiServer'

describe('sendToApiServer', () => {
  it('ADD_TODO', async () => {
    const action = {
      type: 'ADD_TODO',
      text: "test",
    }

    fetchMock.post('/api/add_todo', {body: {'type':'ADD_TODO', 'text':'test'}, status: 200});

    const mockDispatch = jest.fn()

    await sendToApiServer(mockDispatch, action)

    expect(mockDispatch.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls[0][0]).toEqual(action)
  })

  it('COMPLETE_TODO', async () => {
    const action = {
      type: 'COMPLETE_TODO',
      id: 0,
    }

    fetchMock.post('/api/complete_todo', {body: {'type':'COMPLETE_TODO', 'id':0}, status: 200});

    const mockDispatch = jest.fn()

    await sendToApiServer(mockDispatch, action)

    expect(mockDispatch.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls[0][0]).toEqual(action)
  })

  it('DELETE_TODO', async () => {
    const action = {
      type: 'DELETE_TODO',
      id: 0,
    }

    fetchMock.post('/api/delete_todo', {body: {'type':'DELETE_TODO', 'id':0}, status: 200});

    const mockDispatch = jest.fn()

    await sendToApiServer(mockDispatch, action)

    expect(mockDispatch.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls[0][0]).toEqual(action)
  })

  describe('FETCH_TODO', () => {
    it('returned data is null', async () => {
      const action = {
        type: 'FETCH_TODO',
        id: 0,
      }

      fetchMock.get('/api/fetch_todo', {body: {'type':'FETCH_TODO', 'data':null}, status: 200});

      const mockDispatch = jest.fn()

      await sendToApiServer(mockDispatch, action)

      expect(mockDispatch.mock.calls.length).toBe(1)
      expect(mockDispatch.mock.calls[0][0]).toEqual({'type':'FETCH_TODO', 'data':null})

      fetchMock.restore();
    })

    it('returned data is empty', async () => {
      const action = {
        type: 'FETCH_TODO',
        id: 0,
      }

      fetchMock.get('/api/fetch_todo', {body: {'type':'FETCH_TODO', 'data':[]}, status: 200});

      const mockDispatch = jest.fn()

      await sendToApiServer(mockDispatch, action)

      expect(mockDispatch.mock.calls.length).toBe(1)
      expect(mockDispatch.mock.calls[0][0]).toEqual({'type':'FETCH_TODO', 'data':[]})

      fetchMock.restore();
    })

    it('returned data is 1', async () => {
      const action = {
        type: 'FETCH_TODO',
        id: 0,
      }

      fetchMock.get('/api/fetch_todo', {body: {'type':'FETCH_TODO', 'data':[
        { 'type':'', 'text':'aaa', 'id':0, 'completed':false },
      ]}, status: 200});

      const mockDispatch = jest.fn()

      await sendToApiServer(mockDispatch, action)

      expect(mockDispatch.mock.calls.length).toBe(1)
      expect(mockDispatch.mock.calls[0][0]).toEqual({'type':'FETCH_TODO', 'data':[
        { 'type':'', 'text':'aaa', 'id':0, 'completed':false },
      ]})

      fetchMock.restore();
    })

    it('returned data is 2', async () => {
      const action = {
        type: 'FETCH_TODO',
        id: 0,
      }

      fetchMock.get('/api/fetch_todo', {body: {'type':'FETCH_TODO', 'data':[
        { 'type':'', 'text':'aaa', 'id':0, 'completed':false },
        { 'type':'', 'text':'bbb', 'id':1, 'completed':true },
      ]}, status: 200});

      const mockDispatch = jest.fn()

      await sendToApiServer(mockDispatch, action)

      expect(mockDispatch.mock.calls.length).toBe(1)
      expect(mockDispatch.mock.calls[0][0]).toEqual({'type':'FETCH_TODO', 'data':[
        { 'type':'', 'text':'aaa', 'id':0, 'completed':false },
        { 'type':'', 'text':'bbb', 'id':1, 'completed':true },
      ]})

      fetchMock.restore();
    })
  })
})
