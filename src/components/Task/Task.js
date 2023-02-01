import React, {Component} from "react";
import styles from './taskStyle.module.css';
import {Button, Card, Form} from "react-bootstrap";
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt, faEdit} from "@fortawesome/free-solid-svg-icons";


class Task extends Component {
    handleChange = () => {
        const {onToggle, data} = this.props
        onToggle(data._id)
    }

    render() {
        const task = this.props.data;
        const {disabled, onDelete, selected, onEdit} = this.props;
        return (
            <Card className={`${selected ? styles.selected : ''} my-2`}>
                <Card.Body>
                    <Form.Check
                        onChange={this.handleChange}
                        checked={selected}

                    />
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>
                        {task.description}
                    </Card.Text>
                    <Button
                        variant="danger"
                        onClick={() => onDelete(task._id)}
                        disabled={disabled}
                    >
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </Button>
                    <Button
                        className={'mx-2'}
                        variant="warning"
                        disabled={disabled}
                        onClick={()=>onEdit(task)}
                    >
                        <FontAwesomeIcon icon={faEdit}/>
                    </Button>
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