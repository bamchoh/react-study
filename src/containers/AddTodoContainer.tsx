import { connect } from 'react-redux'
import AddTodo from '../components/AddTodo'

const mapStateToProps = (state:any) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(AddTodo);
