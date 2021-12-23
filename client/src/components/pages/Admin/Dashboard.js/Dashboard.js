import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getOrders} from '../../../../services/orderService';
import './Dashboard.scss';

export function Dashboard() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadOrders();

        async function loadOrders() {
            try {
                const query = new URLSearchParams();
                query.append('sort', '_createdAt');
                const loaded = await getOrders(query.toString());
                setOrders(() => loaded);
            } catch {
                navigate('/error');
            }
        }
    }, [navigate]);


    return (
        <section className="page dashboard container">
            <h1 className="page-title">Admin Dashboard</h1>

            <header className="section-header">
                <h4>Latest Orders</h4>
            </header>
            <div className="dashboard-content">
                <ul className='order-list'>
                    <li className="order-info headers">
                        <span className='order-id'>Number</span>
                        <span className='order-date'>Date</span>
                        <span className='order-status'>Status</span>
                        <span className='order-items'>Items</span>
                        <span className='order-total'>Total</span>
                    </li>
                    {orders.map(({_id, _createdAt, value, status, items}) => (
                        <li key={_id} >
                            <Link to={`/order/${_id}`} className="order-info">
                                <span className="order-id">{_id}</span>
                                <span className='order-date'>{(new Date(_createdAt)).toLocaleDateString()}</span>
                                <span className='order-status'>{status}</span>
                                <span className='order-items'>{items.length}</span>
                                <span className='order-total'>{value.toLocaleString('en-GB', {style: 'currency', currency: 'EUR'})}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}