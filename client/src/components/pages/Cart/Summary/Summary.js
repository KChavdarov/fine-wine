import './Summary.scss';
import {CartItem} from './CartItem';
import {Link, useLocation} from 'react-router-dom';
import {useContext} from 'react';
import {CartContext} from '../Cart';
import {useSelector} from 'react-redux';
import {selectUser} from '../../../../store/slices/userSlice';

export function Summary() {
    const location = useLocation();
    const {cartDetails, cartTotal} = useContext(CartContext);
    const {user} = useSelector(selectUser);

    const content = cartDetails.length === 0
        ? <article className="empty-cart">
            <h4 className="heading">Your cart is currently empty</h4>
            <Link className='main-text' to="/catalogue">Please have a look at our catalogue and select the best wine for your occasion</Link>
            <Link className='button catalogue-button' to="/catalogue">Catalogue</Link>
        </article>
        : <div className="cart-container">
            <div className='table-header'>
                <h4 className='product'>Product</h4>
                <h4 className='price'>Price</h4>
                <h4 className='quantity'>Quantity</h4>
                <h4 className='item-total'>Item Total</h4>
            </div>
            <div className='table-body'>
                {cartDetails.map(({wine, quantity, itemTotal}) => <CartItem key={wine._id} wine={wine} quantity={quantity} itemTotal={itemTotal} />)}
            </div>
            <div className='table-footer'>
                <div className="subtotal">
                    <div className="subtotal-label">Subtotal:</div>
                    <div className="subtotal-value">{cartTotal.toLocaleString('en-GB', {style: 'currency', currency: 'EUR'})}</div>
                </div>
                <Link className='button checkout-button' to="/cart/checkout">Proceed to checkout</Link>
            </div>
        </div>;

    return (
        <section className="page cart container">
            <h1 className="page-title">Shopping Cart</h1>
            {!user._id ?
                <article className="guest-user">
                    <h4 className="heading">You are still a guest user</h4>
                    <Link className='main-text' to="/auth/login" state={{from: location}}>Register or sign in to your account for additional functionality and a better experience</Link>
                </article>
                : null}
            {content}
        </section>
    );
}