import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getAll} from '../../../services/wineService';
import {selectCart} from '../../../store/slices/cartSlice';
import './Cart.scss';
import {CartItem} from './CartItem';

export function Cart() {
    const cart = useSelector(selectCart);
    const [cartDetails, setCatDetails] = useState([]);

    useEffect(() => {
        async function loadCartDetails(query) {
            try {
                const data = await getAll(query);
                const details = data.map(wine => ({wine, quantity: cart[wine._id]}));
                setCatDetails(details);
            } catch (error) {
                console.log(error.message);
            }
        };
        
        const wineIds = Object.keys(cart);
        if (wineIds.length > 0) {
            const query = new URLSearchParams();
            Object.keys(cart).forEach(wineId => {query.append('_id', wineId);});
            loadCartDetails(query.toString());
        } else {
            setCatDetails([]);
        }
    }, [cart]);


    return (
        <section className="page cart container">
            <h1 className="page-title">Shopping Cart</h1>
            <table className="cart-container">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Item Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cartDetails.map(({wine, quantity}) => <CartItem key={wine._id} wine={wine} quantity={quantity} />)}
                </tbody>
                <tfoot>

                </tfoot>
            </table>

        </section>
    );
}