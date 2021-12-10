import './Register.scss';
import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {toast} from 'react-toastify';
import {useIsGuest} from '../../../../guards/guards';
import {useSelector} from 'react-redux';
import {register, selectUser} from '../../../../store/slices/userSlice';
import {useDispatch} from 'react-redux';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    repeatPassword: '',
    // isInvalid: true,
};

export function Register() {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {status, user, errors} = useSelector(selectUser);
    let from = location.state?.from?.pathname || '/';
    const isGuest = useIsGuest(from);

    function inputChangeHandler(event) {
        const name = event.target.name;
        const value = event.target.value;
        setState(state => ({...state, [name]: value}));
    }

    async function formSubmitHandler(event) {
        event.preventDefault();
        try {
            await dispatch(register(state)).unwrap();
            navigate(from, {replace: true});
        } catch (error) {
            error.forEach(err => toast.error(err));
        }
    }

    return isGuest(
        <form className='register-form' onSubmit={formSubmitHandler}>

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

            <label htmlFor="phone">Address</label>
            <input type="text" name="address" id="phone" placeholder="City, 1 Example street, ap.1" onChange={inputChangeHandler} value={state.address} />
            <div className="errors"></div>

            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="******" id="password" onChange={inputChangeHandler} value={state.password} />
            <div className="errors"></div>

            <label htmlFor="repeatPassword">Repeat password</label>
            <input type="password" name="repeatPassword" placeholder="******" id="repeatPassword" onChange={inputChangeHandler} value={state.repeatPassword} />
            <div className="errors"></div>

            <input type="submit" className="button submit-button" value="Register" disabled={((status === 'loading') || state.isInvalid)} />

        </form>
    );
}