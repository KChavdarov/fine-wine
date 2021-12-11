import {Link} from 'react-router-dom';

export function Profile() {
    return (
        <div className="container">
            <Link to="/auth/logout">Logout</Link>
        </div>
    );
}