import React, {Component} from "react";
import Task from "../Task/Task";
import {Button, Col, Row, Container} from 'react-bootstrap';
import NewTask from "../NewTask/NewTask";
import Confirm from "../Confirm";

class ToDo extends Component {
    state = {
        tasks: [],
        selectedTasks: new Set(),
        showConfirm:false
    }
    addTask = (newTask) => {
       const tasks = [...this.state.tasks, newTask];

        this.setState({
            tasks
        })
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
            selectedTasks,

        })
    }
    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
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
            selectedTasks: new Set(),
            showConfirm:false
        })
    }

    render() {
        const {tasks, selectedTasks, showConfirm} = this.state
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
                        <NewTask
                            disabled={!!selectedTasks.size}
                            onAdd={this.addTask}
                        />
                    </Col>
                </Row>
                <Row className='my-2'>
                    <Col>
                        <Button variant="danger" onClick={this.toggleConfirm} disabled={!selectedTasks.size}>Delete
                            Selected</Button>
                    </Col>
                </Row>
                <Row>
                    {taskComponents}
                </Row>
                {showConfirm &&
                    <Confirm
                        onClose={this.toggleConfirm}
                        onConfirm={this.removeAllChecked}
                        count={selectedTasks.size}
                />}
            </Container>
        )
    }
}

export default ToDo;