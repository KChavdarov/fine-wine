import {useSelector} from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';
import {selectUser} from '../store/slices/userSlice';

export function useIsAuth() {
    const {user} = useSelector(selectUser);
    const location = useLocation();
    return (element) => {
        return user._id
            ? element
            : <Navigate to="/auth/login" state={{from: location}} />;
    };
}

export function useIsGuest(pathname) {
    const {user} = useSelector(selectUser);
    return (element) => {
        return user._id
            ? <Navigate to={pathname} />
            : element;
    };
}

export function useIsAdmin(pathname) {
    const {user} = useSelector(selectUser);
    return (element) => {
        return user._isAdmin
            ? element
            : <Navigate to={pathname} />;
    };
}