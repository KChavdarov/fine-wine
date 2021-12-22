import {useNavigate} from 'react-router';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {logout} from '../../../store/slices/userSlice';


export function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function logoutOnLoad() {
        try {
            await dispatch(logout());
            navigate('/auth/login', {replace: true});
        } catch {
            navigate('/error');
        }
    }

    useEffect(() => {
        logoutOnLoad();
    });

    return null;
}