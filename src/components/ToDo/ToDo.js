import React, {Component} from "react";
import Task from "../Task/Task";
import {Button, Col, Row, Container} from 'react-bootstrap';
import NewTask from "../NewTask/NewTask";
import Confirm from "../Confirm";

class ToDo extends Component {
    state = {
        tasks: [],
        selectedTasks: new Set(),
        showConfirm:false,
        openNewTaskModal:false
    }
    addTask = (newTask) => {
       const tasks = [...this.state.tasks, newTask];

        this.setState({
            tasks,
            openNewTaskModal:false
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

    selectAll = () => {
        const taskIds = this.state.tasks.map((task) => task._id)

        this.setState({
            selectedTasks: new Set(taskIds)
        })
    }
    DeselectAll = () => {
        this.setState({
            selectedTasks: new Set()
        })
    }
    // button Add new Task
    toggleNewTaskModal = () =>{
        const show = this.state.openNewTaskModal;

        this.setState({
            openNewTaskModal: !show
        })
    }
    render() {
        const {tasks, selectedTasks, showConfirm, openNewTaskModal} = this.state
        const taskComponents = tasks.map((task) => {
            return <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Task
                    data={task}
                    onToggle={this.selectedTasks}
                    disabled={!!selectedTasks.size}
                    onDelete={this.remove}
                    selected={selectedTasks.has(task._id)}
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
                <Row className='my-2' >
                    <Col>
                        <Button
                            variant="primary"
                            onClick={this.toggleNewTaskModal}
                            disabled={selectedTasks.size}
                        >
                            Add new Task</Button>
                    </Col>
                    <Col>
                        <Button
                            variant="danger"
                            onClick={this.toggleConfirm}
                            disabled={!selectedTasks.size}
                        >
                            Delete Selected</Button>
                    </Col>
                    <Col>
                        <Button
                            variant="warning"
                            onClick={this.selectAll}
                        >
                            Check All</Button>
                    </Col>
                    <Col>
                        <Button
                            variant="warning"
                            onClick={this.DeselectAll}
                        >
                            Deselect All</Button>
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
                {openNewTaskModal &&
                    <NewTask
                        onClose={this.toggleNewTaskModal}
                        onAdd={this.addTask}
                    />}
            </Container>
        )
    }
}

export default ToDo;