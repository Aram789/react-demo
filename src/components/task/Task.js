import React, {Component} from "react";
import {Button, Card, Form} from "react-bootstrap";


class Task extends Component {
    render() {
        const task = this.props.data;
        const{onToggle, disabled, onDelete} = this.props;
        return (
            <Card className='my-2'>
                <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Form.Check
                        onChange={() => onToggle(task._id)}
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

export default Task;