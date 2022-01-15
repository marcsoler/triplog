import {FC} from 'react';

import './Loading.scss';
import Spinner from 'react-bootstrap/Spinner';

const Loading: FC = () => {
    return (
        <div className="loading">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading&hellip;</span>
            </Spinner>
        </div>
    )
}

export default Loading;
