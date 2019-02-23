import * as React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../css/style';
import { TodoState } from '../reducers/todos'

interface PropsWithDispatch {
  action: any
  todos: TodoState[]
  user: any
}

const TodoList = withStyles(styles)(
  class extends React.Component<PropsWithDispatch & WithStyles<typeof styles>, {}> {
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

    on_click_for_del = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      return this.props.todos.map((item:TodoState, index:number) => (
        <div key={item.id}>
        <Draggable draggableId={item.id} index={index}>
        {(provided:any) => (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
            <ListItem key={item.id} button id={String(item.id)} onClick={this.on_click_li}>
              <ListItemText>
                {this.drawItems(item)}
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={this.on_click_for_del} id={String(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </div>
        )}
        </Draggable>
        </div>
      ));
    }

    render() {
      const { user } = this.props
      if(user.init && user.uid !== "") {
        return (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <List>
              <Droppable droppableId="columns-1">
                {(provided:any) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} >
                    {this.listItems()}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </List>
          </DragDropContext>
        )
      }

      return (
        <></>
      )
    }
  });

export default TodoList;
