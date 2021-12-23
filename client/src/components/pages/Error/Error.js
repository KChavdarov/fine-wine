import './Error.scss';
import {Link} from 'react-router-dom';

export function Error() {

    return (
        <section className="page error container">
            <h1 className="page-title">Page Error</h1>
            <header className="section-header">
                <h4>Looks like we have encountered a problem</h4>
            </header>
            <div className='main-text'>
                <p>Please accept out apologies for the inconvenience caused. Clicking the button below button will lead you back to our home page.</p>
            </div>

            <Link className='button return' to="/" >Return Home</Link>
        </section >
    );
}