import React, {Component} from "react";
import Task from "../task/Task";
//import styles from './todo.module.css';
import {Button, Col, Row, Container, InputGroup, Form} from 'react-bootstrap';
import idGenerator from "../../helpers/idGenerator";
// 13-2 00:22
class ToDo extends Component {
    state = {
        inputValue: '',
        tasks: [],
        selectedTasks: new Set()
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
    remove  = (taskId) => {
        const newTasks = this.state.tasks.filter((task) => taskId !== task._id) //return true new array

        this.setState({
            tasks: newTasks,
        })
    }

    selectedTasks = (taskId) => {
        const selectedTasks = new Set(this.state.selectedTasks);

        if (selectedTasks.has(taskId)) {
            selectedTasks.delete(taskId)
        } else {
            selectedTasks.add(taskId)
        }
        this.setState({
            selectedTasks
        })
    }

    removeAllChecked = () => {

        const {selectedTasks, tasks} = this.state;

        const newTask = tasks.filter((task) => {
            if (selectedTasks.has(task._id)) {
                return false;
            }
            return true;
        });
        this.setState({
            tasks: newTask,
            selectedTasks: new Set()
        })
    }
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.addTask();
        }
    }

    render() {
        const {tasks, selectedTasks} = this.state
        const taskComponents = tasks.map((task) => {
            return <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Task
                    data={task}
                    onToggle={this.selectedTasks}
                    disabled={!!selectedTasks.size}
                    onDelete={this.remove}
                />
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
                        <InputGroup>
                            <Form.Control
                                placeholder="My Task"
                                onChange={this.handleChange}
                                value={this.state.inputValue}
                                onKeyDown={this.handleKeyDown}
                            />
                            <Button variant="primary"
                                    onClick={this.addTask}
                                    id="button-addon2"
                                    disabled={!!selectedTasks.size}
                            >
                                Add Task
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='my-2'>
                    <Col>
                        <Button variant="danger" onClick={this.removeAllChecked} disabled={!selectedTasks.size}>Delete
                            Selected</Button>
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