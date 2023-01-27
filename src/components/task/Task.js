import React, {Component} from "react";
import styles from './taskStyle.module.css';
import {Button, Card, Form} from "react-bootstrap";


class Task extends Component {
    state = {
        selected: false
    };
    handleChange = () => {
        const {onToggle, data } = this.props
        onToggle(data._id)

        this.setState({
            selected: !this.state.selected
        })
    }
    render() {
        const task = this.props.data;
        const{ disabled, onDelete} = this.props;
        const {selected} = this.state
        return (
            <Card className={`${selected ? styles.selected : ''} my-2`}>
                <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Form.Check
                        onChange={this.handleChange}
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