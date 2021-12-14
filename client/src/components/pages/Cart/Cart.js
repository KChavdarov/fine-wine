import {createContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getAll} from '../../../services/wineService';
import {selectCart} from '../../../store/slices/cartSlice';
import {Outlet} from 'react-router-dom';
import {toast} from 'react-toastify';

export const CartContext = createContext();

export function Cart() {
    const cart = useSelector(selectCart);
    const [cartDetails, setCatDetails] = useState([]);
    const cartTotal = Number(cartDetails.reduce((a, c) => {
        return a + c.itemTotal;
    }, 0).toFixed(2) || 0);

    useEffect(() => {
        async function loadCartDetails(query) {
            try {
                const data = await getAll(query);
                const details = data.map(wine => ({wine, quantity: cart[wine._id], itemTotal: Number((wine.currentPrice * cart[wine._id] || 0).toFixed(2))}));
                setCatDetails(details);
            } catch ({message}) {
                message.forEach(err => toast.error(err));
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
        <CartContext.Provider value={{cartDetails, cartTotal}}>
            <Outlet />
        </CartContext.Provider>
    );
}