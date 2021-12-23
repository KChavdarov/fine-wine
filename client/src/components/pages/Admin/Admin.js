import {Outlet, useLocation} from 'react-router-dom';
import {useIsAdmin} from '../../../guards/guards';

export function Admin() {
    const location = useLocation();
    let from = location.state?.from?.pathname || '/';
    const isAdmin = useIsAdmin(from);

    return isAdmin(
        <Outlet />
    );
}