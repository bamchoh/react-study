import * as React from 'react';
import { connect } from 'react-redux'
import { ButtonProps } from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../css/style';
import addTodo from '../actions'

interface PropsWithDispatch {
  action: any
  user: any
}

const AddTodo = withStyles(styles)(
  class extends React.Component<PropsWithDispatch & WithStyles<typeof styles>, {}> {
    textRef = React.createRef<HTMLInputElement>();

    add_todo() {
      if(this.textRef.current!.value == "") {
        return
      }

      const text = this.textRef.current!.value

      this.props.action.addTodo({ text: text })
      this.textRef.current!.value = "";
    }

    key_press = (e:any) => {
      if(e.keyCode == 13) {
        this.add_todo()
      }
    }

    render() {
      const { classes, user } = this.props
      if(user.init && user.uid !== "") {
        return (
          <div>
          <Input inputRef={this.textRef} type="text" fullWidth={true} onKeyDown={this.key_press} placeholder="Enter your todo" />
          </div>
        )
      }
      return (
        <></>
      )
    }
  });

export default AddTodo;
