import * as React from 'react';
import { connect } from 'react-redux'
import { ButtonProps } from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../css/style';
import addTodo from '../actions'

interface PropsWithDispatch {
  dispatch: any
  action: any
}

const AddTodo = withStyles(styles)(
  class extends React.Component<PropsWithDispatch & WithStyles<typeof styles>, {}> {
    textRef = React.createRef<HTMLInputElement>();

    on_click = () => {
      if(this.textRef.current!.value == "") {
        return
      }
      this.props.action(this.props.dispatch, addTodo(this.textRef.current!.value));
      this.textRef.current!.value = "";
    }

    render() {
      const { classes } = this.props
      return (
        <div>
          <Button color="primary" variant="contained" onClick={this.on_click} className={classes.button}>+</Button>
          <Input inputRef={this.textRef} type="text" />
        </div>
      )
    }
  });

export default connect()(AddTodo);
