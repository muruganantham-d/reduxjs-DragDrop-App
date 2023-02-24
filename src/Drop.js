import { useDispatch, useSelector } from 'react-redux';
import {  reorderTasks } from './Redux/features/taskSlice';
import { Container, Row, Col, ListGroup, Nav, Navbar } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

function Drop() {


    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const inProgressTasks = useSelector((state) => state.tasks.inProgressTasks);
    const completedTasks = useSelector((state) => state.tasks.completedTasks);

  
    
    
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceList = result.source.droppableId;
    const destinationList = result.destination.droppableId;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    dispatch(reorderTasks({ sourceList, destinationList, sourceIndex, destinationIndex }));
    };
    
    return (
        <Container>
            <Navbar bg="black" expand="lg">
                <Nav className="me-auto my-2 my-lg-0"></Nav>
                <Link style={{textDecoration: "none", color: "red", border: "1ps solid green", margin: "10px"}} to="/">Back</Link>
              
            </Navbar>

           
            <DragDropContext onDragEnd={handleDragEnd}>

                <Row>
          <Col>
            <h2 className="my-3">Tasks</h2>
            <section>
            <Droppable droppableId="tasks">
              {(provided) => (
                <ListGroup ref={provided.innerRef} {...provided.droppableProps}>
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <ListGroup.Item
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {task.name}{' '}
                        </ListGroup.Item>
                      )}
                    </Draggable>
                    
                  ))}
                  {provided.placeholder}
                </ListGroup>
              )}
            </Droppable>
            </section>
         </Col>


                    <Col>
                    <h2 className="my-3">In Progress</h2>
                    <section>
            <Droppable droppableId="inProgressTasks">
              {(provided) => (
                <ListGroup ref={provided.innerRef} {...provided.droppableProps}>
                  {inProgressTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <ListGroup.Item
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {task.name}{' '}
                  
                        </ListGroup.Item>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ListGroup>
              )}
            </Droppable>
            </section>
                    </Col>

                    



                    <Col>
                    <h2 className="my-3">Completed</h2>
                    <section>
            <Droppable droppableId="completedTasks">
              {(provided) => (
                <ListGroup ref={provided.innerRef} {...provided.droppableProps}>
                  { completedTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <ListGroup.Item
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {task.name}
                        </ListGroup.Item>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ListGroup>
              )}
            </Droppable>
            </section>
                    </Col>
                    
                 </Row>
 </DragDropContext>
 </Container>
  );
    
   };        
export default Drop;            
           
       
  


    


