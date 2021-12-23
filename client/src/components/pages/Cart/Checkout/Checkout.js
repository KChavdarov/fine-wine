import './Checkout.scss';
import {useContext} from 'react';
import {CartContext} from '../Cart';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../../../../store/slices/userSlice';
import {toast} from 'react-toastify';
import {Navigate, useNavigate} from 'react-router-dom';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {isTouchedError, Required} from '../../../../util/formik';
import {createOrder} from '../../../../services/orderService';
import {resetCart} from '../../../../store/slices/cartSlice';

export function Checkout() {
    const {cartDetails, cartTotal} = useContext(CartContext);
    const {status, user, errors} = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            address: user.address,
        },
        onSubmit: async (values) => {
            try {
                const orderData = {
                    recipient: values,
                    items: cartDetails.map(i => ({wine: i.wine._id, quantity: i.quantity, price: i.wine.currentPrice})),
                };
                const order = await createOrder(orderData);
                dispatch(resetCart());
                toast.success('Thank you for your order!');
                navigate(`/order/${order._id}`, {replace: true});
            } catch (error) {
                error.forEach(err => toast.error(err));
            }
        },
        validationSchema: yup.object({
            firstName: yup.string().required('Please enter your first name'),
            lastName: yup.string().required('Please enter your last name'),
            email: yup.string().email('Please enter a valid email').required('Please enter your email'),
            phone: yup.string().required('Please enter your phone number'),
            address: yup.string().required('Please enter your address'),
        })
    });

    let disabled = ((status === 'loading') || !formik.isValid || formik.isSubmitting || (user._id ? false : !formik.dirty));
    const isError = isTouchedError.bind(null, formik);

    const itemSummary = cartDetails.map(({wine, quantity, itemTotal}) => {
        return (
            <li key={wine._id} className="item-info">
                <span className='item-label'>{wine.brand} | {wine.name}</span>
                <span className='item-quantity'>x{quantity}</span>
                <span className='item-total'>{itemTotal.toLocaleString('en-GB', {style: 'currency', currency: 'EUR'})}</span>
            </li>
        );
    });

    return (
        cartDetails.length === 0
            ? <Navigate to="/cart" replace={true} />
            : <section className="page checkout container">
                <h1 className="page-title">
                    Order Checkout
                </h1>
                <header className="section-header">
                    <h4>Order Summary</h4>
                </header>


                <form className='checkout-form' onSubmit={formik.handleSubmit}>

                    <div className="item-summary">
                        <h4 className='group-title'>Item summary</h4>
                        <ul className="item-list">
                            {itemSummary}
                        </ul>
                        <div className="list-total">
                            <h4 className="order-total-label">Order Total</h4>
                            <h4 className="order-total-value">{cartTotal.toLocaleString('en-GB', {style: 'currency', currency: 'EUR'})}</h4>
                        </div>
                    </div>

                    <div className="form-content">
                        <h4 className='group-title'>Contact Information</h4>
                        <label htmlFor="firstName">First name<Required /></label>
                        <input type="text" placeholder="John" id="firstName" className={isError('firstName') ? 'error' : ''} {...formik.getFieldProps('firstName')} />
                        {isError('firstName') ? <div className="errors">{formik.errors.firstName}</div> : null}

                        <label htmlFor="lastName">Last name<Required /></label>
                        <input type="text" placeholder="Doe" id="lastName" className={isError('lastName') ? 'error' : ''} {...formik.getFieldProps('lastName')} />
                        {isError('lastName') ? <div className="errors">{formik.errors.lastName}</div> : null}

                        <label htmlFor="email">E-mail<Required /></label>
                        <input type="text" placeholder="example@email.com" id="email" className={isError('email') ? 'error' : ''} {...formik.getFieldProps('email')} />
                        {isError('email') ? <div className="errors">{formik.errors.email}</div> : null}

                        <label htmlFor="phone">Phone number<Required /></label>
                        <input type="text" placeholder="+359888123456" id="phone" className={isError('phone') ? 'error' : ''} {...formik.getFieldProps('phone')} />
                        {isError('phone') ? <div className="errors">{formik.errors.phone}</div> : null}

                        <label htmlFor="address">Address<Required /></label>
                        <input type="text" id="address" placeholder="City, 1 Example street, ap.1" className={isError('address') ? 'error' : ''} {...formik.getFieldProps('address')} />
                        {isError('address') ? <div className="errors">{formik.errors.address}</div> : null}
                    </div>

                    <input type="submit" className="button submit-button" value="Place Order" disabled={disabled} />
                </form>
            </section>
    );
}