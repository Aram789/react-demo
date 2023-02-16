import React, {Component} from "react";
import {Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import EditTaskModal from "../../EditTaskModal";
import {Navigate} from "react-router-dom";
import {formatData} from "../../../utils";

export default class SingleTask extends Component {
    state = {
        task: null,
        editTask: null,
        navigate: false
    }

    componentDidMount() {
        const taskId = window.location.pathname;

        fetch('http://localhost:3001' + taskId, {
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
                    task: res
                })
            })
            .catch((error) => {
                console.log('catch error', error);
            });
    }

    edit = (editTask) => {
        this.setState({
            editTask
        })
    }
    saveTask = (editTask) => {
        fetch('http://localhost:3001/task/' + editTask._id, {
            method: 'PUT',
            body: JSON.stringify(editTask),
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
                    task:res,
                    editTask: null,
                })
            })
            .catch((error) => {
                console.log('catch error', error);
            });
    }
    removeTask = () => {
        const taskId = this.state.task._id;

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
                this.setState({
                    navigate: !this.state.navigate
                })
            })
            .catch((error) => {
                console.log('catch error', error);
            });

    }

    render() {
        const {task, editTask, navigate} = this.state;
        return (
            <div className='container'>

                {
                    task ?
                        <Card className='m-5'>
                            <Card.Body>
                                <Card.Text>
                                    Title: {task.title}
                                </Card.Text>
                                <Card.Text>
                                    Description: {task.description}
                                </Card.Text>
                                <Card.Text>
                                    Date: { formatData(task.date)}
                                </Card.Text>
                                <Button
                                    variant="danger"
                                    onClick={this.removeTask}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                </Button>
                                <Button
                                    className={'mx-2'}
                                    variant="warning"
                                    onClick={() => this.edit(task)}
                                >
                                    <FontAwesomeIcon icon={faEdit}/>
                                </Button>
                            </Card.Body>
                            {editTask &&
                                <EditTaskModal
                                    data={editTask}
                                    onClose={() => this.edit(null)}
                                    onSave={this.saveTask}
                                />
                            }
                        </Card>
                        :
                        <h1 className='text-center'> Not Task</h1>

                }
                {navigate ? <Navigate to="/" replace={true}/> : ''}
            </div>
        );
    }
}