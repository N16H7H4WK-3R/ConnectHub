import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Cookies from 'js-cookie';

const SignUpPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const errors = {};
        if (!formData.first_name) errors.first_name = 'First Name is required';
        if (!formData.last_name) errors.last_name = 'Last Name is required';
        if (!formData.username) errors.username = 'User Name is required';
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Invalid email address';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://127.0.0.1:8000/api/users/', formData, {
                withCredentials: true
            })
                .then(response => {
                    if (response.data.success) {
                        // Store the refresh token in cookies
                        Cookies.set('refreshToken', response.data.tokens.refresh, {
                            expires: 5,
                        });
                        navigate('/');
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    useEffect(() => {
        const token = Cookies.get('refreshToken');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <Container fluid className="d-flex justify-content-center align-items-center" style={{
            height: '100vh',
        }}>
            <Form onSubmit={handleSubmit} className='border border-dark rounded' style={{ padding: '30px' }}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridfirst_name">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="first_name"
                            placeholder="Enter first name"
                            onChange={handleChange}
                            value={formData.first_name}
                            isInvalid={!!errors.first_name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.first_name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridlast_name">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="last_name"
                            placeholder="Enter Last Name"
                            onChange={handleChange}
                            value={formData.last_name}
                            isInvalid={!!errors.last_name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.last_name}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridusername">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            onChange={handleChange}
                            value={formData.username}
                            isInvalid={!!errors.username}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            onChange={handleChange}
                            value={formData.email}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridpassword">
                    <Form.Label>Password confirmation</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Confirm your password"
                        onChange={handleChange}
                        value={formData.password}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        Already have an account? <a href="/login" rel="noopener noreferrer">Login</a>
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default SignUpPage;
