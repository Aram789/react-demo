import React, {Component} from "react";
import styles from './taskStyle.module.css';
import {Button, Card, Form} from "react-bootstrap";
import PropTypes from 'prop-types';


class Task extends Component {
    handleChange = () => {
        const {onToggle, data} = this.props
        onToggle(data._id)
    }

    render() {
        const task = this.props.data;
        const {disabled, onDelete, selected} = this.props;
        return (
            <Card className={`${selected ? styles.selected : ''} my-2`}>
                <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Form.Check
                        onChange={this.handleChange}
                        checked={selected}

                    />
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Button
                        variant="danger"
                        onClick={() => onDelete(task._id)}
                        disabled={disabled}
                    >Delete</Button>
                </Card.Body>
            </Card>
        )
    }
}


Task.propTypes = {
    data: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired,
    disabled:PropTypes.bool.isRequired,
    onDelete:PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired
};
export default Task;