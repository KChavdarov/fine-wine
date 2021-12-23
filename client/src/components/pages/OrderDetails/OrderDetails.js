import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getOrder} from '../../../services/orderService';
import {CartItem} from '../Cart/Summary/CartItem';
import './OrderDetails.scss';

export function OrderDetails() {
    const {orderId} = useParams();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadOrder();

        async function loadOrder() {
            try {
                const loaded = await getOrder(orderId);
                setOrder(() => loaded);
            } catch (error) {
                navigate('/');
            }
        }
    }, [navigate, orderId]);

    const content = (
        !order
            ? null
            : <>
                <div className='table-body'>
                    {order.items.map(({wine, quantity, itemTotal}) => <CartItem key={wine._id} wine={wine} quantity={quantity} itemTotal={itemTotal} ordered={true} />)}
                </div>
                <div className='table-footer'>
                    <div className="complimentary">
                        <div className="status">
                            <div className="status-label">Order Status:</div>
                            <div className="status-value">{order.status}</div>
                        </div>
                        <div className="date">
                            <div className="date-label">Order Date:</div>
                            <div className="date-value">{new Date(order._createdAt).toLocaleDateString()}</div>
                        </div>
                    </div>
                    <div className="total">
                        <div className="total-label">Order Total:</div>
                        <div className="total-value">{order.value.toLocaleString('en-GB', {style: 'currency', currency: 'EUR'})}</div>
                    </div>
                </div>
            </>
    );

    return < section className="page order container" >
        <h1 className="page-title">Order Details</h1>

        <div className="order-container">
            <div className='table-header'>
                <h4 className='product'>Product</h4>
                <h4 className='price'>Price</h4>
                <h4 className='quantity'>Quantity</h4>
                <h4 className='item-total'>Item Total</h4>
            </div>
            {content}
        </div>
    </section >;
};