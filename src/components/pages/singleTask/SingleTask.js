import React, {Component} from "react";
import {Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import EditTaskModal from "../../EditTaskModal";

export default class SingleTask extends Component {
    state = {
        task: null,
        editTask:null
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
    edit = (editTask) =>{
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
                let task = {...this.state.task[0]};
                task = editTask;

                this.setState({
                    task,
                    editTask: null,
                })
            })
            .catch((error) => {
                console.log('catch error', error);
            });
    }
    render() {
        const {task} = this.state;
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
                                <Button
                                    variant="danger"
                                >
                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                </Button>
                                <Button
                                    className={'mx-2'}
                                    variant="warning"
                                    onClick={()=>this.edit(task)}
                                >
                                    <FontAwesomeIcon icon={faEdit}/>
                                </Button>
                            </Card.Body>
                            {this.state.editTask &&
                                <EditTaskModal
                                    data={this.state.editTask}
                                    onClose={() => this.edit(null)}
                                    onSave={this.saveTask}
                                />
                            }
                        </Card>
                        :
                        <p> not task</p>
                }
            </div>
        );
    }
}