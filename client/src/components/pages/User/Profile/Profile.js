import './Profile.scss';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useEffect} from 'react/cjs/react.development';
import {useIsAuth} from '../../../../guards/guards';
import {getOrders} from '../../../../services/orderService';
import {selectUser, update} from '../../../../store/slices/userSlice';
import {isTouchedError, Required} from '../../../../util/formik';


export function Profile() {
    const {status, user, errors} = useSelector(selectUser);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const isAuth = useIsAuth();
    const dispatch = useDispatch();
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
                await dispatch(update(values)).unwrap();
                toast.success('Profile updated successfully!');
                setIsActive(() => false);
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

    let disabled = ((status === 'loading') || !formik.isValid || formik.isSubmitting || !formik.dirty);
    const isError = isTouchedError.bind(null, formik);

    useEffect(() => {
        loadOrders(user._id);

        async function loadOrders(userId) {
            setIsLoading(true);
            try {
                const query = new URLSearchParams();
                query.append('_creator', user._id);
                const orders = await getOrders(query.toString());
                setOrders(() => orders);
                setIsLoading(false);
            } catch (error) {
                error.forEach(err => toast.error(err));
            }
        }
    }, [user._id]);

    const orderSummary = orders.map(({_id, _createdAt, value, status, items}) => {
        return (
            <li key={_id} className="order-info">
                <span className='order-date'>{(new Date(_createdAt)).toLocaleDateString()}</span>
                <span className='order-status'>{status}</span>
                <span className='order-items'>{items.length}</span>
                <span className='order-total'>{value.toLocaleString('en-GB', {style: 'currency', currency: 'EUR'})}</span>
            </li>
        );
    });


    return isAuth(
        <section className="page checkout">
            <h1 className="page-title">
                User Profile
            </h1>
            <header className="section-header">
                <h4>Profile Summary</h4>
            </header>


            <form className='checkout-form' onSubmit={formik.handleSubmit}>

                <div className="form-content">
                    <h4 className='group-title'>Personal Information</h4>
                    <label htmlFor="firstName">First name<Required /></label>
                    <input disabled={!isActive} type="text" placeholder="John" id="firstName" className={isError('firstName') ? 'error' : ''} {...formik.getFieldProps('firstName')} />
                    {isError('firstName') ? <div className="errors">{formik.errors.firstName}</div> : null}

                    <label htmlFor="lastName">Last name<Required /></label>
                    <input disabled={!isActive} type="text" placeholder="Doe" id="lastName" className={isError('lastName') ? 'error' : ''} {...formik.getFieldProps('lastName')} />
                    {isError('lastName') ? <div className="errors">{formik.errors.lastName}</div> : null}

                    <label htmlFor="email">E-mail<Required /></label>
                    <input disabled={!isActive} type="text" placeholder="example@email.com" id="email" className={isError('email') ? 'error' : ''} {...formik.getFieldProps('email')} />
                    {isError('email') ? <div className="errors">{formik.errors.email}</div> : null}

                    <label htmlFor="phone">Phone number<Required /></label>
                    <input disabled={!isActive} type="text" placeholder="+359888123456" id="phone" className={isError('phone') ? 'error' : ''} {...formik.getFieldProps('phone')} />
                    {isError('phone') ? <div className="errors">{formik.errors.phone}</div> : null}

                    <label htmlFor="address">Address<Required /></label>
                    <input disabled={!isActive} type="text" id="address" placeholder="City, 1 Example street, ap.1" className={isError('address') ? 'error' : ''} {...formik.getFieldProps('address')} />
                    {isError('address') ? <div className="errors">{formik.errors.address}</div> : null}
                    {isActive ? <input type="submit" className="button submit-button" value="Update Profile" disabled={disabled} /> : null}
                    {isActive ? null : <button type='button' className="button" onClick={() => setIsActive(() => true)} >Edit Profile</button>}
                </div>


                <div className="order-history">
                    <h4 className='group-title'>Ordering history</h4>
                    <ul className="order-list">
                        <li className="order-info">
                            <span className='order-date'>Date</span>
                            <span className='order-status'>Status</span>
                            <span className='order-items'>Items</span>
                            <span className='order-total'>Total</span>
                        </li>
                        {orderSummary}
                    </ul>
                </div>


            </form>

            <div className="logout-container">
                <Link className='button logout-button' to="/auth/logout">Logout</Link>
            </div>

        </section>
    );
}