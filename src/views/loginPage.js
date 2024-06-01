import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.email = /\S+@\S+\.\S+/.test(formData.email) ? "" : "Email is invalid.";
        tempErrors.password = formData.password.length >= 6 ? "" : "Password must be at least 6 characters long.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    useEffect(() => {
        const token = Cookies.get('refreshToken');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            axios.post('http://127.0.0.1:8000/api/login/', formData, {
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
    return (
        <Container fluid className="d-flex justify-content-center align-items-center" style={{
            height: '100vh',
        }}>
            <Form onSubmit={handleSubmit} className='border border-dark rounded' style={{ padding: '30px' }}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        New User? <a href="/sign-up" rel="noopener noreferrer">Sign Up</a>
                    </Form.Text>
                </Form.Group>


                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default LoginPage;
