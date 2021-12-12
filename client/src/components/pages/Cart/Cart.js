import {createContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getAll} from '../../../services/wineService';
import {selectCart} from '../../../store/slices/cartSlice';
import {Outlet} from 'react-router-dom';

export const CartContext = createContext();

export function Cart() {
    const cart = useSelector(selectCart);
    const [cartDetails, setCatDetails] = useState([]);
    const cartTotal = Number(cartDetails.reduce((a, c) => {
        return a + (c.wine.currentPrice * c.quantity);
    }, 0).toFixed(2) || 0);

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
        <CartContext.Provider value={{cartDetails, cartTotal}}>
            <Outlet />
        </CartContext.Provider>
    );
}