import {Outlet} from 'react-router-dom';
import {useIsAuth} from '../../../guards/guards';

export function User() {
    const isAuth = useIsAuth();
    return isAuth(
        <div className="container">
            <Outlet />
        </div>
    );
}