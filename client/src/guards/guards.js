import {Navigate, useLocation} from 'react-router-dom';
import {useUserContext} from '../contexts/User';

export function useIsAuth() {
    const {user} = useUserContext();
    const location = useLocation();

    return (element) => {
        return user._id
            ? element
            : <Navigate to="/auth/login" state={{from: location}} />;
    };
}

export function useIsGuest(pathname) {
    const {user} = useUserContext();
    return (element) => {
        return user._id
            ? <Navigate to={pathname} />
            : element;
    };
}

export function useIsAdmin(pathname) {
    const {user} = useUserContext();

    return (element) => {
        return user._isAdmin
            ? element
            : <Navigate to={pathname} />;
    };
}