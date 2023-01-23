import React, {Component} from "react";
import styles from './todo.module.css';
import {Button, Col, Row, Container} from 'react-bootstrap';

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
        const tasks = [...this.state.tasks, inputValue]
        if (inputValue) {
            this.setState({
                tasks: tasks,
                inputValue: '',
            })
        }
    }
    remove = (event) => {

    }
    render() {
        const {tasks} = this.state
        const taskComponents = tasks.map((task, index) => {
            return <p className={index===2?styles.selected: ''} key={index}>{task} <Button variant="danger" onClick={this.remove}>X</Button></p>
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
                    <Col>
                        {taskComponents}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ToDo;