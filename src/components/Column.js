import React from 'react'
import Task from './Task';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

import styled from 'styled-components';


const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 200px;
  display: flex;
  flex-direction: column;
  
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: 0.3s ease;
  background-color: ${props => (props.isDraggingOver ? 'gray': 'white')};
  flex-grow: 1;
  min-height: 100px;
`;


class Column extends React.Component {
    render(){
        return (
        <Draggable draggableId={this.props.column.id} index={this.props.index}>
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                <Title {...provided.dragHandleProps}>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id} type='task'>
                    {(provided, snapshot) => (
                        <TaskList 
                            {...provided.droppableProps}
                            ref={provided.innerRef} // gives the ref to the dom node
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {this.props.tasks.map((task, index) => <Task index={index} key={task.id} task={task} />)}
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container> 
            )}
           
        </Draggable>
        )
    }
}

export default Column