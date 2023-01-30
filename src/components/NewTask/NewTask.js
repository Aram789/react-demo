import React, {Component} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import idGenerator from "../../helpers/idGenerator";
import PropTypes from "prop-types";

class NewTask extends Component {
    state = {
        title: '',
        description: ''
    };
    handleChange = (value, name) => {
        this.setState({
            [name]: value
        })
    }
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleSubmit();
        }
    }
    handleSubmit = () => {
        const title = this.state.title.trim();
        const description = this.state.description.trim();

        if (!title) {
            return;
        }
        const newTask = {
            _id: idGenerator(),
            title,
            description
        }
        this.props.onAdd(newTask);
        this.setState({
            title: '',
            description: ''
        })
    }

    render() {
        const {onClose} = this.props;
        return (
            <Modal
                show={true}
                onHide={onClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add New Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control className={'my-3'}
                        placeholder="Title"
                        onChange={(event)=>this.handleChange(event.target.value, 'title')}
                        onKeyPress={this.handleKeyDown}
                    />
                    <Form.Control
                        as="textarea"
                        placeholder="Description"
                        rows={3}
                        onChange={(event)=>this.handleChange(event.target.value, 'description')}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"
                            onClick={this.handleSubmit}
                            id="button-addon2"
                    >
                        Add Task
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

NewTask.propTypes = {
    onAdd: PropTypes.func.isRequired,
    onClose:PropTypes.func.isRequired
};
export default NewTask;