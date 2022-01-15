import {FC} from 'react';

import {Link} from 'react-router-dom';

import {Col, Container, Row} from 'react-bootstrap';

const NotFound: FC = () => {
    return (
        <Container className="content not-found">
            <Row>
                <Col className="text-center">
                    <p className="lead">Page not found!</p>
                    <p><Link to="/" role="button" className="btn btn-primary">Start from the beginning</Link></p>
                </Col>
            </Row>
        </Container>
    )
}

export default NotFound;
