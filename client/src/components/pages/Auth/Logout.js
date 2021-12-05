import {useUserContext} from '../../../contexts/User';
import {Navigate} from 'react-router';
import {useEffect} from 'react';


export function Logout() {
    const {logout} = useUserContext();

    useEffect(() => {
        logout();
    });

    return <Navigate to="/auth/login" replace={true} />;
}