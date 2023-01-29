import React, {Component} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import idGenerator from "../../helpers/idGenerator";
import PropTypes from "prop-types";

class NewTask extends Component {
    state = {
        title: '',
        description: ''
    };
    handleChange = (event) => {
        this.setState({
            title: event.target.value
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
            title:'',
            description:''
        })


    }

    render() {
        const {disabled} = this.props;
        const {title, description} = this.state;
        return (
            <InputGroup>
                <Form.Control
                    placeholder="Title"
                    onChange={this.handleChange}
                    value={title}
                    onKeyDown={this.handleKeyDown}
                    disabled={!!disabled}
                />
                <Button variant="primary"
                        onClick={this.handleSubmit}
                        id="button-addon2"
                        disabled={!!disabled}
                >
                    Add Task
                </Button>
            </InputGroup>
        )
    }

}

NewTask.propTypes = {
    onAdd: PropTypes.func.isRequired,
    disabled:PropTypes.bool.isRequired,
};
export default NewTask;