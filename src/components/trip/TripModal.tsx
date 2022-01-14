import {FC, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {useDispatch} from 'react-redux';
import useTripSelector from '../../hooks/useTripSelector';
import {clearTripModal} from '../../store/actions/tripActions';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';


const TripModal: FC = () => {

    const [icon, setIcon] = useState<IconDefinition>(faCheckCircle);

    const dispatch = useDispatch();
    const history = useHistory();

    const {tripModal} = useTripSelector();

    useEffect(() => {
        switch (tripModal.variant) {
            case 'danger':
            case 'warning':
                setIcon(faExclamationCircle);
                break;
            case 'success':
                setIcon(faCheckCircle);
                break;
            default:
                setIcon(faInfoCircle);
        }
    }, [tripModal]);

    const handleClose = () => {
        dispatch(clearTripModal());
        if(tripModal && tripModal.redirect) {
            history.push(tripModal.redirect);
        }
    }

    return (
        <Modal show={tripModal.show} onHide={handleClose} fullscreen="sm-down" dialogClassName={`modal-${tripModal.variant}`}>
            <Modal.Header className={tripModal.variant} closeButton>
                <FontAwesomeIcon icon={icon} size="2x"/></Modal.Header>
            <Modal.Body>
                {tripModal.message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant={tripModal.variant} onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TripModal;
