import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useEffect} from 'react/cjs/react.development';
import {useIsAuth} from '../../../../guards/guards';
import {getOrders} from '../../../../services/orderService';
import {selectUser} from '../../../../store/slices/userSlice';

export function Profile() {
    const {status, user, errors} = useSelector(selectUser);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadOrders(user._id);

        async function loadOrders(userId) {
            try {
                const query = new URLSearchParams();
                query.append('_creator', user._id);
                const orders = getOrders(query.toString());
                setOrders(() => orders);
            } catch (error) {
                error.forEach(err => toast.error(err));
            }
        }
    }, [user._id]);

    const isAuth = useIsAuth();


    return isAuth(
        <div className="container">
            <Link to="/auth/logout">Logout</Link>
        </div>
    );
}