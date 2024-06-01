import React from 'react';
import { Navbar } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';


function HomePage() {
    return (
        <div>
            <Navbar className='mb-3 border border-dark rounded'>
                <strong>Customer Relationship Management</strong>
            </Navbar>
            <Carousel data-bs-theme="dark">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.cxtoday.com/wp-content/uploads/2022/05/crm-reasons.jpg"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.cxtoday.com/wp-content/uploads/2022/05/crm-reasons.jpg"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.cxtoday.com/wp-content/uploads/2022/05/crm-reasons.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
            <Navbar className='mb-3 mt-3 border border-dark rounded'>
                <strong>About Us</strong>
            </Navbar>
            <Container>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ipsa fugiat odit optio
                nihil velit ullam? Excepturi reprehenderit a minima accusantium, odit, cupiditate rerum
                tempore labore fugit illum ducimus molestias? <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, molestiae?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ipsa fugiat odit optio
                nihil velit ullam? Excepturi reprehenderit a minima accusantium, odit, cupiditate rerum
                tempore labore fugit illum ducimus molestias? <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, molestiae?
            </Container>
        </div >
    );
}

export default HomePage;