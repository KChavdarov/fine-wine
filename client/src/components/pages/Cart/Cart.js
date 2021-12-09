import {useEffect, useState} from 'react';
import {createSearchParams} from 'react-router-dom';
import {getAll} from '../../../services/wineService';
import './Cart.scss';
import {CartItem} from './CartItem';

const cart = [
    {wineId: '61a40dd00c6d037fe4be51ce', quantity: 2},
    {wineId: '61a40dd00c6d037fe4be51cd', quantity: 3}
];

export function Cart() {
    const [wines, setWines] = useState(cart);


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
                    {wines.map(({wineId, quantity}) => <CartItem key={wineId} wineId={wineId} quantity={quantity} />)}
                </tbody>
                <tfoot>

                </tfoot>
            </table>

        </section>
    );
}