import {FC} from 'react';
import {useHistory} from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {useDispatch} from 'react-redux';
import useTripSelector from '../../hooks/useTripSelector';
import {clearTripModal} from '../../store/actions/tripActions';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';

const TripModal: FC = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {tripModal} = useTripSelector();

    const handleClose = () => {
        dispatch(clearTripModal());

        if(tripModal!.redirect) {
            history.push(tripModal!.redirect);
        }

    }

    return (
        <Modal show={tripModal!.show} onHide={handleClose} fullscreen="sm-down">
            <Modal.Header closeButton />
            <Modal.Body>
                <Alert variant={tripModal!.variant}><FontAwesomeIcon
                    icon={tripModal!.variant === 'success' ? faCheck : faTimes}/> {tripModal!.message}</Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TripModal;
