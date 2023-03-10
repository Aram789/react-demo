import React, {Component} from "react";
import Task from "../Task/Task";
import {Button, Col, Container, Row} from 'react-bootstrap';
import NewTask from "../NewTask/NewTask";
import Confirm from "../Confirm";
import EditTaskModal from "../EditTaskModal";

class ToDo extends Component {
    state = {
        tasks: [],
        selectedTasks: new Set(),
        showConfirm: false,
        openNewTaskModal: false,
        editTask: null
    }
    componentDidMount(){
        fetch('http://localhost:3001/task', {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async (response) => {
                const res = await response.json();

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error;
                    } else {
                        throw new Error('Something went wrong!');
                    }
                }

                this.setState({
                    tasks: res
                });

            })
            .catch((error) => {
                console.log('catch error', error);
            });

    }
    addTask = (newTask) => {
        fetch('http://localhost:3001/task', {
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async (response) => {
                const res = await response.json();

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error;
                    } else {
                        throw new Error('Something went wrong!');
                    }
                }

                const tasks = [...this.state.tasks, res];

                this.setState({
                    tasks,
                    openNewTaskModal: false
                });

            })
            .catch((error) => {
                console.log('catch error', error);
            });
    };
    remove = (taskId) => {
        fetch('http://localhost:3001/task/' + taskId, {
            method: 'Delete',
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async (response) => {
                const res = await response.json();

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error;
                    } else {
                        throw new Error('Something went wrong!');
                    }
                }

                const newTasks = this.state.tasks.filter((task) => taskId !== task._id) //return true new array

                this.setState({
                    tasks: newTasks,
                })

            })
            .catch((error) => {
                console.log('catch error', error);
            });
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
        const body = {
            tasks: [...selectedTasks]
        }

        fetch('http://localhost:3001/task', {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async (response) => {
                const res = await response.json();

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error;
                    } else {
                        throw new Error('Something went wrong!');
                    }
                }
                const newTask = tasks.filter((task) => {
                    return !selectedTasks.has(task._id);
                });
                this.setState({
                    tasks: newTask,
                    selectedTasks: new Set(),
                    showConfirm: false
                })

            })
            .catch((error) => {
                console.log('catch error', error);
            });


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
    toggleNewTaskModal = () => {
        const show = this.state.openNewTaskModal;

        this.setState({
            openNewTaskModal: !show
        })
    }
    handleEdit = (editTask) => {
        this.setState({
            editTask
        })
    }
    handleSaveTask = (editedTask) => {
        fetch('http://localhost:3001/task/' + editedTask._id, {
            method: 'PUT',
            body: JSON.stringify(editedTask),
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async (response) => {
                const res = await response.json();
                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error;
                    } else {
                        throw new Error('Something went wrong!');
                    }
                }

                const tasks = [...this.state.tasks];
                const findIndex = tasks.findIndex((task) => task._id === editedTask._id);
                tasks[findIndex] = editedTask;

                this.setState({
                    tasks: tasks,
                    editTask: null,
                })

            })
            .catch((error) => {
                console.log('catch error', error);
            });

    }

    render() {
        const {tasks, selectedTasks, showConfirm, openNewTaskModal, editTask} = this.state
        const taskComponents = tasks.map((task) => {
            return <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Task
                    data={task}
                    onToggle={this.selectedTasks}
                    disabled={!!selectedTasks.size}
                    onDelete={this.remove}
                    selected={selectedTasks.has(task._id)}
                    onEdit={this.handleEdit}
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
                <Row className='my-2'>
                    <Col>
                        <Button
                            variant="primary"
                            onClick={this.toggleNewTaskModal}
                            disabled={selectedTasks.size}
                        >
                            Add new Task</Button>
                    </Col>
                    {tasks.length ?
                        <>
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
                                    disabled={((!tasks.length) || (selectedTasks.size === tasks.length))}
                                >
                                    Check All</Button>
                            </Col>
                            <Col>
                                <Button
                                    variant="warning"
                                    onClick={this.DeselectAll}
                                    disabled={!selectedTasks.size}
                                >
                                    Deselect All</Button>
                            </Col>
                        </>
                        : ''
                    }
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
                {editTask &&
                    <EditTaskModal
                        data={editTask}
                        onClose={() => this.handleEdit(null)}
                        onSave={this.handleSaveTask}
                    />
                }

            </Container>
        )
    }
}

export default ToDo;