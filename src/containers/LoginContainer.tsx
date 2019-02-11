import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Login from '../components/Login'

import { UserState } from '../reducers/user'

export interface CombineState {
  user: UserState
}

const mapStateToProps = (state:CombineState) => {
  return({
    user: state.user
  })
}

export default connect(mapStateToProps)(Login);
