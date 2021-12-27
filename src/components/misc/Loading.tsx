import {FC} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleNotch} from '@fortawesome/free-solid-svg-icons/faCircleNotch';

import './Loading.scss';

const Loading: FC = () => {
    return (
        <div className="spinner">
            <FontAwesomeIcon icon={faCircleNotch} size="6x" className="fa" />
            <span className="sr-only">Loading</span>
        </div>
    )
}

export default Loading;
