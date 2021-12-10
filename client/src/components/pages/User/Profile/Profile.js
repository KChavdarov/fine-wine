import {Link} from 'react-router-dom';
import {useIsAuth} from '../../../../guards/guards';

export function Profile() {
    const isAuth = useIsAuth();
    return isAuth(
        <div className="container">
            <Link to="/auth/logout">Logout</Link>
        </div>
    );
}