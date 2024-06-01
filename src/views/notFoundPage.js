import React from 'react';
import { Container } from 'react-bootstrap';

function NotFoundPage() {

    return (
        <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="text-center">
                <div className="gif mb-4">
                    <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
                </div>
                <div className="content">
                    <h1 className="main-heading">This page is gone.</h1>
                    <p>
                        ...maybe the page you're looking for is not found or never existed.
                    </p>
                    <a href="/" rel="noopener noreferrer">
                        <button className="btn btn-primary mt-3">
                            Back to home <i className="far fa-hand-point-right"></i>
                        </button>
                    </a>
                </div>
            </div>
        </Container>
    );
}

export default NotFoundPage;
