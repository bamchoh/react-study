import { Dispatch} from "redux";

const sendWithPost = async (ep:string, dispatch: any, action:any) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'applicatoin/json'
  };

  const method = 'POST'
  const obj = action;
  const body = JSON.stringify(obj);
  const res: Response = await fetch(ep, {method, headers, body})

  if(res.ok) {
    const json = await res.json()
    dispatch(json)
  }
}

const sendToApiServer = async (dispatch: any, action : any) => {
  switch (action.type) {
    case 'ADD_TODO':
      {
        await sendWithPost('/api/add_todo', dispatch, action)
        break
      }
    case 'COMPLETE_TODO':
      {
        await sendWithPost('/api/complete_todo', dispatch, action)
        break
      }
    case 'DELETE_TODO':
      {
        await sendWithPost('/api/delete_todo', dispatch, action)
        break
      }
    case 'FETCH_TODO':
      {
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'applicatoin/json'
        };

        const method = 'GET'
        const ep = '/api/fetch_todo'
        const res: Response = await fetch(ep, {method, headers})

        if(res.ok) {
          const json = await res.json()
          dispatch(json)
        }
        break
      }
    default:
      dispatch(action)
      break
  }
}

export default sendToApiServer
