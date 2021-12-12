import './Checkout.scss';
import {useContext, useState} from 'react';
import {CartContext} from '../Cart';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../../../../store/slices/userSlice';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    // isInvalid: true,
};


export function Checkout() {
    const {cartDetails, cartTotal} = useContext(CartContext);
    const [state, setState] = useState(initialState);
    const {status, user, errors} = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const itemSummary = cartDetails.map(({wine, quantity}) => {
        return (
            <li key={wine._id} className="item-info">
                <span className='item-label'>{wine.brand} | {wine.name}</span>
                <span className='item-quantity'>x{quantity}</span>
                <span className='item-total'>&euro;{Number((wine.currentPrice * quantity || 0).toFixed(2)).toLocaleString()}</span>
            </li>
        );
    });

    function inputChangeHandler(event) {
        const name = event.target.name;
        const value = event.target.value;
        setState(state => ({...state, [name]: value}));
    }

    async function formSubmitHandler(event) {
        event.preventDefault();
        try {
            // navigate('/order', {replace: true});
        } catch (error) {
            error.forEach(err => toast.error(err));
        }
    }

    return (
        <section className="page checkout container">
            <h1 className="page-title">
                Order Checkout
            </h1>
            <header className="section-header">
                <h5>Order Summary</h5>
            </header>


            <form className='checkout-form' onSubmit={formSubmitHandler}>

                <div className="item-summary">
                    <h4 className='group-title'>Item summary</h4>
                    <ul className="item-list">
                        {itemSummary}
                    </ul>
                    <div className="list-total">
                        <h4 className="order-total-label">Order Total</h4>
                        <h4 className="order-total-value">&euro;{cartTotal.toLocaleString()}</h4>
                    </div>
                </div>

                <div className="form-content">
                    <h4 className='group-title'>Contact Information</h4>
                    <label htmlFor="firstName">First name</label>
                    <input type="text" name="firstName" placeholder="John" id="firstName" onChange={inputChangeHandler} value={state.firstName} />
                    <div className="errors"></div>

                    <label htmlFor="lastName">Last name</label>
                    <input type="text" name="lastName" placeholder="Doe" id="lastName" onChange={inputChangeHandler} value={state.lastName} />
                    <div className="errors"></div>

                    <label htmlFor="email">E-mail</label>
                    <input type="text" name="email" placeholder="example@email.com" id="email" onChange={inputChangeHandler} value={state.email} />
                    <div className="errors"></div>

                    <label htmlFor="phone">Phone number</label>
                    <input type="text" name="phone" placeholder="+359888123123" id="phone" onChange={inputChangeHandler} value={state.phone} />
                    <div className="errors"></div>

                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" id="address" placeholder="City, 1 Example street, ap.1" onChange={inputChangeHandler} value={state.address} />
                    <div className="errors"></div>
                </div>

                <input type="submit" className="button submit-button" value="Place Order" disabled={((status === 'loading') || state.isInvalid)} />
            </form>
        </section>
    );
}