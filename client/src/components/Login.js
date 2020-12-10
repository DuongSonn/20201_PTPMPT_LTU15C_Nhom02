import React, { useRef } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';
require('dotenv').config()

export default function Login({ onIdSubmit }) {
    const passwordRef = useRef();
    const nameRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/login`, {
            name: nameRef.current.value,
            password: passwordRef.current.value
        }).then(function (response) {
            onIdSubmit(response.data.user._id)
        }).catch(function (error) {
            console.log(error);
        });
    }

    function createNewId() {
        axios.post(`${process.env.REACT_APP_API_URL}/register`, {
            name: nameRef.current.value,
            password: passwordRef.current.value
        }).then(async function (response) {
            onIdSubmit(response.data.user._id)
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <Container className="align-items-center d-flex" style={{ height: '100vh'}}>
            <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group>
                    <Form.Label>Enter Your Name</Form.Label>
                    <Form.Control type="text" ref={nameRef}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter Your Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef}></Form.Control>
                </Form.Group>
                <Button type="submit" className="mr-2">Login</Button>
                <Button onClick={createNewId} variant="secondary">Create A New Id</Button>
            </Form>
        </Container>
    )
}
