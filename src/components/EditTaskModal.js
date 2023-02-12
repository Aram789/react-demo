import React, {PureComponent} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatData} from "../utils";

class EditTaskModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...props.data,
            date: props.data.date ? new Date(props.data.date) : new Date()
        };
    }
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
        const {date} = this.state;

        if (!title) {
            return;
        }
        this.props.onSave({
            _id:this.state._id,
            title,
            description,
            date: formatData(date.toISOString())
        })
    }
    dateChange = (dateValue) =>{
        this.setState({
            date:dateValue || new Date()
        })
    }
    render() {
        const {onClose} = this.props;
        const {title, description, date} = this.state;
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
                        Edit Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control className={'my-3'}
                                  placeholder="Title"
                                  onChange={this.handleChange}
                                  onKeyPress={this.handleKeyDown}
                                  name='title'
                                  value={title}
                    />
                    <Form.Control
                        as="textarea"
                        placeholder="Description"
                        rows={3}
                        onChange={this.handleChange}
                        name='description'
                        value={description}
                    />
                    <DatePicker
                        selected={date}
                        minDate={new Date()}
                        className='my-3 form-control'
                        onChange={this.dateChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"
                            onClick={this.handleSubmit}
                            id="button-addon2"
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

EditTaskModal.propTypes = {
    onClose:PropTypes.func.isRequired,
    data:PropTypes.object.isRequired,
    onSave:PropTypes.func.isRequired
};
export default EditTaskModal;