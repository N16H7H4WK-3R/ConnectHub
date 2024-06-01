import React, { useState, useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { fetchInteractionData, fetchContactData } from '../config/api';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { getAccessToken } from '../config/tokenUtils';
import axios from "axios";


function Interactions() {

    const [data, setData] = useState([]);
    const [contactData, setContactData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        date: '',
        contact: '',
        type: 'Call',
        notes: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.contact) newErrors.contact = 'Contact is required';
        if (!formData.notes) newErrors.notes = 'Notes are required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const accessToken = getAccessToken();
            axios.post('http://127.0.0.1:8000/api/interactions/', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                withCredentials: true
            })
                .then(response => {
                    if (response.status === 201) {
                        setData([...data, response.data]);
                        setFormData({
                            date: '',
                            contact: '',
                            type: '',
                            notes: ''
                        });
                        setErrors({});
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    useEffect(() => {
        const contactFetchData = async () => {
            try {
                const ContactResponse = await fetchContactData();
                setContactData(ContactResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        contactFetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchInteractionData();
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
            <ListGroup as="ol" numbered style={{ fontWeight: 'bold' }} >
                {data.map(item => (
                    <ListGroup.Item
                        key={item.id}
                        as="li"
                        className="d-flex justify-content-between align-items-start border border-dark rounded mb-2"
                        style={{
                            color: 'black',
                            backgroundColor: '#fff',
                            padding: '10px'
                        }}
                    >
                        <div className="ms-2 me-auto" style={{ borderLeft: '2px solid #60626c', paddingLeft: '10px' }}>
                            <div><strong>{item.notes}</strong></div>
                            <p style={{ fontSize: '12px', fontWeight: 'normal' }}>Source : {item.type}</p>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Add Interactions..</Accordion.Header>
                    <Accordion.Body>
                        <Container fluid>
                            <Form className="border border-dark rounded" style={{ padding: '30px' }} onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridDate">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            placeholder="Date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.date}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.date}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridContact">
                                        <Form.Label >Contact</Form.Label>
                                        <Form.Select
                                            name="contact"
                                            value={formData.contact}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.contact}
                                        >
                                            <option value="">Select Contact</option>
                                            {contactData.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.contact}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridType">
                                        <Form.Label >Type</Form.Label>
                                        <Form.Select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                        >
                                            <option>Call</option>
                                            <option>Email</option>
                                            <option>Meeting</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridNotes">
                                        <Form.Label>Notes</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Notes"
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.notes}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.notes}
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


export default Interactions;