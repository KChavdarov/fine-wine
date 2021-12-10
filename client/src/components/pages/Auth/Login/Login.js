import './Login.scss';
import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {useIsGuest} from '../../../../guards/guards';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {selectUser, login} from '../../../../store/slices/userSlice';
import {toast} from 'react-toastify';

const initialState = {
    email: '',
    password: '',
};

export function Login() {
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
            await dispatch(login(state)).unwrap();
            navigate(from, {replace: true});
        } catch (error) {
            error.forEach(err => toast.error(err));
        }
    }

    return isGuest(
        <form className='login-form' onSubmit={formSubmitHandler}>

            <label htmlFor="email">E-mail</label>
            <input type="text" name="email" placeholder="example@email.com" id="email" onChange={inputChangeHandler} value={state.email} />
            <div className="errors"></div>

            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="******" id="password" onChange={inputChangeHandler} value={state.password} />
            <div className="errors"></div>

            <input type="submit" className="button submit-button" value="Login" disabled={((status === 'loading') || state.isInvalid)} />

        </form>
    );
}