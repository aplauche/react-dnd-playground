
import React from 'react'
import initialData from './data';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import Column from './components/Column';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
  state = initialData;

  onDragStart = () => {
    document.body.style.color = 'orange'
  }

  onDragEnd = result => {
    document.body.style.color = 'inherit'
    const {destination, source, draggableId, type} = result

    if(!destination) { return }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) { return }

    if(type == 'column'){
      const newColOrder = Array.from(this.state.columnOrder)
      newColOrder.splice(source.index, 1)
      newColOrder.splice(destination.index, 0, draggableId)

      const newState = {
        ...this.state,
        columnOrder: newColOrder
      }

      this.setState(newState)
      return
    }

    const startCol = this.state.columns[source.droppableId]
    const finishCol = this.state.columns[destination.droppableId]

    if(startCol === finishCol ) {
      const column = startCol
      const newTaskIds = Array.from(column.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)
  
      const newColumn = {
        ...column,
        taskIds: newTaskIds
      }
  
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }
  
      this.setState(newState)
    } else {
      const startTaskIds = Array.from(startCol.taskIds)
      startTaskIds.splice(source.index, 1)

      const newStartCol = {
        ...startCol,
        taskIds: startTaskIds
      }

      const finishTaskIds = Array.from(finishCol.taskIds)
      finishTaskIds.splice(destination.index, 0, draggableId)

      const newFinishCol = {
        ...finishCol,
        taskIds: finishTaskIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStartCol.id]: newStartCol,
          [newFinishCol.id]: newFinishCol
        }
      }

      this.setState(newState)


    }

  }

  render() {
    
    return (
          
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
      >
        <Droppable droppableId='all-columns' direction='horizontal' type='column'>
          {(provided) => (
            <Container
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
            { this.state.columnOrder.map((columnId, index) => {
              const column = this.state.columns[columnId]
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])
          
              return <Column key={column.id} column={column} tasks={tasks} index={index} />
            })}
            {provided.placeholder}
            </Container>
          )}

        </Droppable>

      </DragDropContext>
    )  
  }
}


// function App() {

//   const items = [
//     "Item 1",
//     "Item 2",
//     "Item 3",
//     "Item 4",
//     "Item 5",
//     "Item 6",
//     "Item 7",
//   ]

//   return (
//     <DragDropContext>
//       <Droppable droppableId="list">
//         {provided => (
//         <div ref={provided.innerRef} {...provided.droppableProps} className="App" style={{width: "800px", margin: "20px auto"}}>
//           {items.map((item, index) => (
//             <Draggable key={item} draggableId={item} index={index}>
//               {(provided) => (
//                 <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} style={{padding: "2rem", background: "#f5f5f5", margin: "4px"}}>
//                   {item}
//                 </div>
//               )}
//             </Draggable>
//           ))}
//         </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// }

export default App;
