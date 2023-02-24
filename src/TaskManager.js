
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, startTask, completeTask } from './Redux/features/taskSlice';
import { Container, Row, Col, Button, ListGroup, Modal, Form, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './TaskManager.css'



function TaskManager() {
  const [newTask, setNewTask] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const inProgressTasks = useSelector((state) => state.tasks.inProgressTasks);
  const completedTasks = useSelector((state) => state.tasks.completedTasks);

  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    dispatch(addTask({ id: tasks.length + 1, name: newTask }));
    setNewTask('');
    setShowModal(false);
  };

  const handleStartTask = (task) => {
    dispatch(startTask(task));
  };

  const handleCompleteTask = (task) => {
    dispatch(completeTask(task));
  };

  return (
    <Container>
         <Navbar bg="black" expand="lg">
                <Navbar.Brand href="#" style={{ color: "skyblue",fontSize:"35px "}} className="mx-3"  >Task Management</Navbar.Brand>
                <Nav className="me-auto my-2 my-lg-0"></Nav>
                <Button variant="outline-success" className="mx-3" onClick={() => setShowModal(true)}>Create</Button>
                <Link style={{textDecoration: "none", color: "red", border: "1ps solid green", margin: "10px"}} to="/drop">Next</Link>
            </Navbar>
          


          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Create New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="formNewTask">
                <Form.Label>New Task</Form.Label>
                <Form.Control type="text" value={newTask} onChange={handleNewTaskChange} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleAddTask}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        


      
<Row>
<Col>
  <h2 className="my-3">Tasks</h2>
  <section>
  <ListGroup>
    {tasks.map((task) => (
      <ListGroup.Item key={task.id}>
        {task.name}{' '}
        <Button variant="success" size="sm" onClick={() => handleStartTask(task)}>
          In Progress
        </Button>
      </ListGroup.Item> 
    ))}
  </ListGroup>
   </section>
</Col>

        <Col>
          <h2 className="my-3">In-Progress</h2>

          <section>
          <ListGroup>
            {inProgressTasks.map((task) => (
              <ListGroup.Item key={task.id}>
                {task.name}{' '}
                <Button variant="success" size="sm" onClick={() => handleCompleteTask(task)}>
                  Complete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </section>

        </Col>
        <Col>
          <h2 className="my-3">Completed</h2>
          <section>
          <ListGroup>
            {completedTasks.map((task) => (
              <ListGroup.Item key={task.id}>{task.name}</ListGroup.Item>
            ))}
          </ListGroup>
          </section>
        </Col>
      </Row>
      
    </Container>
      );
  }
      
   export default TaskManager;
