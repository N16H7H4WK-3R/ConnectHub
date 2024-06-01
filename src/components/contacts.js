import React, { useState, useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { fetchContactData } from '../config/api';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { getAccessToken } from '../config/tokenUtils';
import axios from "axios";


function Contact() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        user: '1'
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        company: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let errors = {};

        if (!formData.name) {
            errors.name = 'Name is required';
        }

        if (!formData.company) {
            errors.company = 'Company is required';
        }

        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            const accessToken = getAccessToken();
            axios.post('http://127.0.0.1:8000/api/contacts/', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                withCredentials: true
            })
                .then(response => {
                    if (response.status === 201) {
                        setData([...data, response.data]);
                        setFormData({
                            name: '',
                            company: '',
                            email: '',
                            phone: ''
                        });
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchContactData();
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Server Error</div>;
    }

    return (
        <>
            <ListGroup as="ol" numbered style={{ fontWeight: 'bold' }}>
                {data.map(item => (
                    <ListGroup.Item
                        key={item.id}
                        as="li"
                        className="d-flex justify-content-between align-items-start border border-dark rounded mb-2"
                        style={{
                            color: 'black',
                            backgroundColor: '#fff',
                            padding: '5px'
                        }}
                    >
                        <div className="ms-2 me-auto" style={{ borderLeft: '2px solid #60626c', paddingLeft: '10px' }}>
                            <p style={{ fontSize: '12px', letterSpacing: '2px', fontWeight: 'normal' }}>{item.name}</p>
                            <p >{item.phone}</p>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Add more contacts..</Accordion.Header>
                    <Accordion.Body>
                        <Container fluid >
                            <Form className='border border-dark rounded' style={{ padding: '30px' }} onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            isInvalid={!!formErrors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formErrors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridCompany">
                                        <Form.Label>Company</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            isInvalid={!!formErrors.company}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formErrors.company}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            isInvalid={!!formErrors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formErrors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridPhone">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Phone Number"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formErrors.phone}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

export default Contact;
