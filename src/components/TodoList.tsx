import * as React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import Input from '@material-ui/core/Input';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../css/style';
import { TodoState } from '../reducers/todos'

import * as cssStyle from '../css/button.css'

interface EditDialogProps {
  id:any
  open: any
  text:string
  onClose: any
}

interface EditDialogState {
  text:string
}

class EditDialog extends React.Component<EditDialogProps, EditDialogState> {
  textRef = React.createRef<HTMLInputElement>();

  constructor(props:any) {
    super(props)

    this.state = {
      text: props.text
    }
  }

  handleCancel = () => {
    this.props.onClose(null)
  }

  handleOK = () => {
    const text = this.textRef.current!.value
    this.props.onClose(text)
  }

  onChange = (e:any) => {
    this.setState({text: e.target!.value})
  }

  render() {
    const { ...other } = this.props

    console.log("render")

    return (
      <Dialog fullWidth={true} maxWidth={"lg"} aria-labelledby="todo-edit-dialog-title" {...other}>
        <DialogTitle id="todo-edit-dialog-title">Edit TODO</DialogTitle>
        <DialogContent>
          <Input inputRef={this.textRef} type="text" fullWidth={true} onChange={this.onChange} value={this.state.text} multiline={true}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOK} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

interface PropsWithDispatch {
  action: any
  todos: TodoState[]
  user: any
}

interface TodoListState {
  id: any
  open : any
  text: string
}

const TodoList = withStyles(styles)(
  class extends React.Component<PropsWithDispatch & WithStyles<typeof styles>, TodoListState> {
    constructor(props:any) {
      super(props)

      this.state = {
        id: "",
        open: false,
        text: "",
      }
    }

    onDragEnd = (result:any) => {
      const {destination, source ,draggableId} = result;

      if(!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      this.props.action.onDragEnd({
        dst: destination,
        src: source,
        todos: this.props.todos
      });
    }

    on_click_li = (e: React.MouseEvent<HTMLDivElement>) => {
      var id:string = e.currentTarget.id
      this.props.action.completeTodo({id: id});
    }

    onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      var id:string = e.currentTarget.id
      this.props.action.deleteTodo({id: id})
    }

    drawItems = (item: TodoState) => {
      if(item.completed) {
        return <s>{item.text}</s>
      }
      return item.text
    }

    listItems = () => {
      const { classes } = this.props
      return this.props.todos.map((item:TodoState, index:number) => (
        <div key={item.id}>
        <Draggable draggableId={item.id} index={index}>
        {(provided:any) => (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
          <Paper className={classes.paper} id={String(item.id)} onClick={this.on_click_li} >
          <div className={cssStyle.div}>
            <Typography component="p">
              {this.drawItems(item)}
            </Typography>
            <IconButton aria-label="Edit" onClick={this.onEdit} id={String(item.id)}>
              <Icon id={String(item.id)}>edit_icon</Icon>
            </IconButton>
            <IconButton aria-label="Delete" onClick={this.onDelete} id={String(item.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
          </Paper>
          </div>
        )}
        </Draggable>
        </div>
      ));
    }

    onEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      const todo = this.props.todos.find((todo:TodoState) => (todo.id === e.currentTarget.id))
      this.setState({id:todo!.id, open: true, text:todo!.text});
    }

    onDialogClose = (text:any) => {
      if(text !== null && (typeof text) === "string") {
        this.props.action.editTodo({id: this.state.id, text:text});
      }
      this.setState({open: false });
    }

    render() {
      const { user } = this.props

      const EditDialogOpener = () => {
        if(this.state.open) {
          return (
            <EditDialog
            id={this.state.id}
            text={this.state.text}
            open={this.state.open}
            onClose={this.onDialogClose}
            />
          )
        }
        return <></>
      }

      if(user.init && user.uid !== "") {
        return (
          <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="columns-1">
          {(provided:any) => (
            <div ref={provided.innerRef} {...provided.droppableProps} >
            {this.listItems()}
            {provided.placeholder}
            </div>
          )}
          </Droppable>
          <EditDialogOpener />
          </DragDropContext>
        )
      }

      return (
        <></>
      )
    }
  });

export default TodoList;
