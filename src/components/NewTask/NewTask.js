import React, {PureComponent} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";

class NewTask extends PureComponent {
    state = {
        title: '',
        description: ''
    };
    handleChange = (event) => {
        const {name, value} = event.target
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
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyDown}
                        name='title'
                    />
                    <Form.Control
                        as="textarea"
                        placeholder="Description"
                        rows={3}
                        onChange={this.handleChange}
                        name='description'
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