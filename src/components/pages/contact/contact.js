import {Button, Container, Form} from "react-bootstrap";
import {useRef, useEffect, useState} from "react";

export default function Contact() {
    const name = useRef('');

    useEffect(() => {
        name.current.focus()
    }, [])

    const [values, setValues] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [errors, setErrors] = useState({
        name: null,
        email: null,
        message: null
    })
    const handleChange = ({target : {name, value}}) => {
        if(!value){
            setErrors({
                ...errors,
                [name]:'Խոմ դու քոռ չես'
            });
        }else {
            setErrors({
                ...errors,
                [name]:null
            });
        }
        setValues({
            ...values,
            [name]:value
        });
    }

    function onSubmit(event) {
        event.preventDefault()
        fetch('http://localhost:3001/form', {
            method: 'POST',
            body: JSON.stringify(values),
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
                setValues({
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
                    <Form.Control type="text" required={true} value={values.name} placeholder="Name"  ref={name} name={'name'}
                                  onChange={handleChange}/>
                    <strong className={'text-danger'}>{errors.name}</strong>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" required={true} value={values.email}  placeholder="Enter email" name={'email'}
                                  onChange={handleChange}/>
                    <strong className={'text-danger'}>{errors.email}</strong>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control type="text" required={true} value={values.message}  placeholder="Message" name={'message'}
                                  onChange={handleChange}/>
                    <strong className={'text-danger'}>{errors.message}</strong>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}