import './Login.scss';
import {useLocation, useNavigate} from 'react-router';
import {useIsGuest} from '../../../../guards/guards';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {selectUser, login} from '../../../../store/slices/userSlice';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {isTouchedError, Required} from '../../../../util/formik';

const initialValues = {
    email: '',
    password: '',
};

export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {status, user, errors} = useSelector(selectUser);
    let from = location.state?.from?.pathname || '/';
    const isGuest = useIsGuest(from);

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            try {
                await dispatch(login(values)).unwrap();
                navigate(from, {replace: true});
            } catch (error) {
                error.forEach(err => toast.error(err));
            }
        },
        validationSchema: yup.object({
            email: yup.string().required('Please enter your email'),
            password: yup.string().required('Please enter your password'),
        })
    });

    let disabled = ((status === 'loading')|| !formik.isValid || formik.isSubmitting || !formik.dirty);
    const isError = isTouchedError.bind(null, formik);

    return isGuest(
        <form className='login-form' onSubmit={formik.handleSubmit}>

            <label htmlFor="email">E-mail<Required /></label>
            <input type="text" className={isError('email') ? 'error' : ''} placeholder="example@email.com" id="email" {...formik.getFieldProps('email')} />
            {isError('email') ? <div className="errors">{formik.errors.email}</div> : null}

            <label htmlFor="password">Password<Required /></label>
            <input type="password" className={isError('password') ? 'error' : ''} placeholder="******" id="password" {...formik.getFieldProps('password')} />
            {isError('password') ? <div className="errors">{formik.errors.password}</div> : null}

            <input type="submit" className="button submit-button" value="Login" disabled={disabled} />

        </form>
    );
}