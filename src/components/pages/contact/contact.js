import {Button, Container, Form} from "react-bootstrap";
import {useRef, useEffect, useState} from "react";

export default function Contact() {
    const name = useRef('');

    useEffect(() => {
        name.current.focus()
    }, [])

    const [value, setValue] = useState({
        name: '',
        email: '',
        message: ''
    })

    function onSubmit(event) {
        event.preventDefault()
        fetch('http://localhost:3001/form', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async (response) => {
                const res = await response.json();

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error;
                    } else {
                        throw new Error('Something went wrong!');
                    }
                }
                alert('success')
                setValue({
                    name: '',
                    email: '',
                    message: ''
                })
            })
            .catch((error) => {
                console.log('catch error', error);
            });
    }

    return (
        <Container className={'my-5'}>

            <Form onSubmit={(event) => onSubmit(event)}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" value={value.name} ref={name} onChange={(event) => {
                        setValue({
                            ...value,
                            name: event.target.value
                        })
                    }}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={value.email} placeholder="Enter email" onChange={(event) => {
                        setValue({
                            ...value,
                            email: event.target.value
                        });
                    }}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control type="text" value={value.message} placeholder="Message" onChange={(event) => {
                        setValue({
                            ...value,
                            message: event.target.value
                        })
                    }}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}