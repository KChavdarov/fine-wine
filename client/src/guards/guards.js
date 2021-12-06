import {Navigate} from 'react-router-dom';
import {useUserContext} from '../contexts/User';

export function IsAuth({children}) {
    const {user} = useUserContext();
    return (
        user._id
            ? children
            : <Navigate to="/auth/login" replace={true} />
    );
}

export function IsGuest({children}) {
    const {user} = useUserContext();
    return (
        user._id
            ? <Navigate to="/" replace={true} />
            : children
    );
}

export function IsAdmin({children}) {
    const {user} = useUserContext();
    return (
        user._isAdmin
            ? children
            : <Navigate to="/" replace={true} />
    );
}