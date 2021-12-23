import './Register.scss';
import {useLocation, useNavigate} from 'react-router';
import {toast} from 'react-toastify';
import {useIsGuest} from '../../../../guards/guards';
import {useSelector} from 'react-redux';
import {register, selectUser} from '../../../../store/slices/userSlice';
import {useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {isTouchedError, Required} from '../../../../util/formik';

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    repeatPassword: '',
};

export function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {status, user, errors} = useSelector(selectUser);
    let from = location.state?.from?.pathname || '/';
    const isGuest = useIsGuest(from);
    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            try {
                await dispatch(register(values)).unwrap();
                navigate(from, {replace: true});
            } catch (error) {
                error.forEach(err => toast.error(err));
            }
        },
        validationSchema: yup.object({
            firstName: yup.string().required('Please enter your first name'),
            lastName: yup.string().required('Please enter your last name'),
            email: yup.string().email('Please enter a valid email').required('Please enter your email'),
            password: yup.string().required('Please enter your password').min(6, 'Password needs to be at least 6 characters long'),
            repeatPassword: yup.string().required('Please repeat your password').oneOf([yup.ref('password')], 'Passwords don\'t match'),
        })
    });

    let disabled = ((status === 'loading') || !formik.isValid || formik.isSubmitting || !formik.dirty);
    const isError = isTouchedError.bind(null, formik);

    return isGuest(
        <form className='register-form' onSubmit={formik.handleSubmit}>

            <label htmlFor="firstName">First name<Required /></label>
            <input type="text" placeholder="John" id="firstName" className={isError('firstName') ? 'error' : ''} {...formik.getFieldProps('firstName')} />
            {isError('firstName') ? <div className="errors">{formik.errors.firstName}</div> : null}

            <label htmlFor="lastName">Last name<Required /></label>
            <input type="text" placeholder="Doe" id="lastName" className={isError('lastName') ? 'error' : ''} {...formik.getFieldProps('lastName')} />
            {isError('lastName') ? <div className="errors">{formik.errors.lastName}</div> : null}

            <label htmlFor="email">E-mail<Required /></label>
            <input type="text" placeholder="example@email.com" id="email" className={isError('email') ? 'error' : ''} {...formik.getFieldProps('email')} />
            {isError('email') ? <div className="errors">{formik.errors.email}</div> : null}

            <label htmlFor="phone">Phone number</label>
            <input type="text" placeholder="+359888123456" id="phone" className={isError('phone') ? 'error' : ''} {...formik.getFieldProps('phone')} />
            {isError('phone') ? <div className="errors">{formik.errors.phone}</div> : null}

            <label htmlFor="address">Address</label>
            <input type="text" id="address" placeholder="City, 1 Example street, ap.1" className={isError('address') ? 'error' : ''} {...formik.getFieldProps('address')} />
            {isError('address') ? <div className="errors">{formik.errors.address}</div> : null}

            <label htmlFor="password">Password<Required /></label>
            <input type="password" placeholder="******" id="password" className={(isError('password') || isError('repeatPassword')) ? 'error' : ''} {...formik.getFieldProps('password')} />
            {isError('password') ? <div className="errors">{formik.errors.password}</div> : null}

            <label htmlFor="repeatPassword">Repeat password<Required /></label>
            <input type="password" placeholder="******" id="repeatPassword" className={(isError('password') || isError('repeatPassword')) ? 'error' : ''} {...formik.getFieldProps('repeatPassword')} />
            {(isError('password') || isError('repeatPassword')) ? <div className="errors">{formik.errors.repeatPassword}</div> : null}

            <input type="submit" className="button submit-button" value="Register" disabled={disabled} />

        </form>
    );
}