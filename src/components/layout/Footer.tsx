import moment from 'moment/moment';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col xs={12} className="footer-notes text-center">
                        <p className="h5"><a href="https://github.com/marcsoler/triplog">Triplog</a></p>
                        <p>Created by <a href="https://soler.dev">Marc Solèr</a><br />&copy; {moment().format('YYYY')}</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;
