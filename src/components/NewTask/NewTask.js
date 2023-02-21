import React, {PureComponent, createRef} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatData} from "../../utils";

class NewTask extends PureComponent {
    constructor(props) {
        super(props);
        this.inputRef = createRef();
    }
    state = {
        title: '',
        description: '',
        date: new Date()
    };
    componentDidMount() {
        this.inputRef.current.focus()
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
        const date = formatData(this.state.date.toISOString())

        if (!title) {
            return;
        }
        const newTask = {
            title,
            description,
            date
        }

        this.props.onAdd(newTask);
    }
    dateChange = (dateValue) =>{
        this.setState({
            date:dateValue ? dateValue : new Date()
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
                                  ref={this.inputRef}
                    />
                    <Form.Control
                        as="textarea"
                        placeholder="Description"
                        rows={3}
                        onChange={this.handleChange}
                        name='description'
                    />
                    <DatePicker
                        selected={this.state.date}
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
                        Add Task
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

NewTask.propTypes = {
    onAdd: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};
export default NewTask;