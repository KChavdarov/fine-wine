import './Error.scss';
import {Link} from 'react-router-dom';

export function Error() {

    return (
        <section>
            <p>Error</p>
            <Link to="/" >Return Home</Link>
        </section >
    );
}