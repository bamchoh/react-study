import { Dispatch} from "redux";

const sendToApiServer = async (dispatch: any, action : any) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'applicatoin/json'
  };

  switch (action.type) {
    case 'ADD_TODO':
      {
        const method = 'POST'
        const obj = action;
        const body = JSON.stringify(obj);
        const ep = '/api/add_todo'
        const res: Response = await fetch(ep, {method, headers, body})

        if(res.ok) {
          const json = await res.json()
          dispatch(json)
        }
        break
      }
    case 'COMPLETE_TODO':
      {
        const method = 'POST'
        const obj = action;
        const body = JSON.stringify(obj);
        const ep = '/api/complete_todo'
        const res: Response = await fetch(ep, {method, headers, body})

        if(res.ok) {
          const json = await res.json()
          dispatch(json)
        }
        break
      }
    case 'DELETE_TODO':
      {
        const method = 'POST'
        const obj = action;
        const body = JSON.stringify(obj);
        const ep = '/api/delete_todo'
        const res: Response = await fetch(ep, {method, headers, body})

        if(res.ok) {
          const json = await res.json()
          dispatch(json)
        }
        break
      }
    case 'FETCH_TODO':
      {
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
