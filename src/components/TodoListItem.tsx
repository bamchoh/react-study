import * as React from 'react';
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import InboxIcon from '@material-ui/icons/Inbox'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Draggable } from 'react-beautiful-dnd';
import { TodoState } from '../reducers/todos'

interface Props {
  action: any
  item:TodoState
  index:number
}

export default class Task extends React.Component<Props, {}> {
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

  render() {
    const { item, index } = this.props
    return (
      <Draggable draggableId={item.id} index={index}>
      {(provided:any) => (
        <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        >
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
    )
  }
}
