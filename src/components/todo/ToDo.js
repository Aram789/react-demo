import React, {Component} from "react";
//import styles from './todo.module.css';
import {Button, Col, Row, Container, Card} from 'react-bootstrap';
import idGenerator from "../../helpers/idGenerator";
// 00:48
class ToDo extends Component {
    state = {
        inputValue: '',
        tasks: [],
    }
    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }
    addTask = () => {
        const inputValue = this.state.inputValue.trim();
        const newTask = {
            _id: idGenerator(),
            title: inputValue
        }
        const tasks = [...this.state.tasks, newTask]

        if (inputValue) {
            this.setState({
                tasks,
                inputValue: '',
            })
        }
    }
    remove = () => {

    }

    render() {
        const {tasks} = this.state
        const taskComponents = tasks.map((task) => {
            return <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2} >
                <Card className='my-2'>
                    <Card.Body>
                        <Card.Title>{task.title}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Button variant="danger" onClick={this.remove}>Delete</Button>
                    </Card.Body>
                </Card>
            </Col>
        })
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>ToDo List</h2>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex gap-2">
                        <input
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.inputValue}
                        />
                        <Button
                            variant="primary"
                            onClick={this.addTask}
                        >
                            Add Task
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {taskComponents}
                </Row>
            </Container>
        )
    }
}

export default ToDo;