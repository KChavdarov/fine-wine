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
import {selectUser} from '../../../../store/slices/userSlice';
import {isTouchedError, Required} from '../../../../util/formik';

export function Profile() {
    const {status, user, errors} = useSelector(selectUser);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
            <li key={_id} className="item-info">
                <span className='item-label'>{(new Date(_createdAt)).toLocaleDateString()}</span>
                <span className='item-total'>{value.toLocaleString('en-GB', {style: 'currency', currency: 'EUR'})}</span>
                <span className='item-quantity'>{status}</span>
            </li>
        );
    });


    return isAuth(
        <section className="page checkout container">
            <h1 className="page-title">
                User Profile
            </h1>
            <header className="section-header">
                <h4>Profile Summary</h4>
            </header>


            <form className='checkout-form' onSubmit={formik.handleSubmit}>

                <div className="item-summary">
                    <h4 className='group-title'>Ordering history</h4>
                    <ul className="item-list">
                        {orderSummary}
                    </ul>
                    {/* <div className="list-total">
                        <h4 className="order-total-label">Order Total</h4>
                        <h4 className="order-total-value">{cartTotal.toLocaleString('en-GB', {style: 'currency', currency: 'EUR'})}</h4>
                    </div> */}
                </div>

                <div className="form-content">
                    <h4 className='group-title'>Personal Information</h4>
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
                    <input type="submit" className="button submit-button" value="Place Order" disabled={disabled} />
                </div>

            </form>

            <Link className='button' to="/auth/logout">Logout</Link>

        </section>
    );
}