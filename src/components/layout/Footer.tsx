import moment from 'moment/moment';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCode} from '@fortawesome/free-solid-svg-icons/faCode';
import {faGithub} from '@fortawesome/free-brands-svg-icons/faGithub';

const Footer = () => {
    return (
        <footer className="footer mt-auto">
            <Container>
                <Row>
                    <Col xs={12} className="footer-notes text-center">
                        <p className="h5"><a href="https://github.com/marcsoler/triplog"><FontAwesomeIcon icon={faGithub} /> Triplog</a></p>
                        <p><FontAwesomeIcon icon={faCode} /> by <a href="https://soler.dev">Marc Solèr</a> &copy; {moment().format('YYYY')}</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;
