import './Summary.scss';
import {CartItem} from './CartItem';
import {Link} from 'react-router-dom';
import {useContext} from 'react';
import {CartContext} from '../Cart';

export function Summary() {
    const {cartDetails, cartTotal} = useContext(CartContext);

    const content = cartDetails.length === 0
        ? <article className="empty-cart">
            <h3 className="heading">Your cart is currently empty</h3>
            <Link className='main-text' to="/catalogue">Please have a look at our catalogue and select the best wine for your occasion</Link>
            <Link className='button catalogue-button' to="/catalogue">Catalogue</Link>
        </article>
        : <div className="cart-container">
            <div className='table-header'>
                <p className='product'>Product</p>
                <p className='price'>Price</p>
                <p className='quantity'>Quantity</p>
                <p className='item-total'>Item Total</p>
            </div>
            <div className='table-body'>
                {cartDetails.map(({wine, quantity, itemTotal}) => <CartItem key={wine._id} wine={wine} quantity={quantity} itemTotal={itemTotal} />)}
            </div>
            <div className='table-footer'>
                <div className="subtotal">
                    <div className="subtotal-label">Subtotal:</div>
                    <div className="subtotal-value">{cartTotal.toLocaleString('en-GB',{style:'currency', currency: 'EUR' })}</div>
                </div>
                <Link className='button checkout-button' to="/cart/checkout">Proceed to checkout</Link>
            </div>
        </div>;

    return (
        <section className="page cart container">
            <h1 className="page-title">Shopping Cart</h1>
            {content}
        </section>
    );
}