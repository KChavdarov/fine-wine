import './Summary.scss';
import {CartItem} from './CartItem';
import {Link} from 'react-router-dom';
import {useContext} from 'react';
import {CartContext} from '../Cart';

export function Summary() {
    const {cartDetails, cartTotal} = useContext(CartContext);

    return (
        <section className="page cart container">
            <h1 className="page-title">Shopping Cart</h1>

            <div className="cart-container">
                <div className='table-header'>
                    <p className='product'>Product</p>
                    <p className='price'>Price</p>
                    <p className='quantity'>Quantity</p>
                    <p className='item-total'>Item Total</p>
                </div>
                <div className='table-body'>
                    {cartDetails.map(({wine, quantity}) => <CartItem key={wine._id} wine={wine} quantity={quantity} />)}
                </div>
                <div className='table-footer'>
                    <div className="subtotal">
                        <div className="subtotal-label">Subtotal:</div>
                        <div className="subtotal-value">&euro;{cartTotal.toLocaleString()}</div>
                    </div>
                    <Link className='checkout-button' to="/cart/checkout">Proceed to checkout</Link>
                </div>
            </div>
        </section>
    );
}