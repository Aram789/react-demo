import React from "react";
import {Modal, Button} from 'react-bootstrap';
import PropTypes from "prop-types";

function Confirm(props) {
    return (
        <Modal
            show={true}
            onHide={props.onClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Are you sure to remove {props.count} task(s)</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant='danger'
                    onClick={props.onConfirm}
                >Delete</Button>
                <Button onClick={props.onClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

Confirm.propTypes = {
    onClose: PropTypes.func.isRequired,
    onConfirm:PropTypes.func.isRequired,
    count:PropTypes.number.isRequired
};
export default Confirm;