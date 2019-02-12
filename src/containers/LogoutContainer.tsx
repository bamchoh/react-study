import { connect } from 'react-redux'
import Logout from '../components/Logout'

const mapStateToProps = (state:any) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Logout);
