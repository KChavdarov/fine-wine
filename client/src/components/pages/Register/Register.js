import {useState} from 'react';
import {useNavigate} from 'react-router';
import {Link} from 'react-router-dom';
import {useUserContext} from '../../../contexts/User';
import {toast} from 'react-toastify';
import './Register.scss';

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
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const {register} = useUserContext();

    function inputChangeHandler(event) {
        const name = event.target.name;
        const value = event.target.value;
        setState(state => ({...state, [name]: value}));
    }

    async function formSubmitHandler(event) {
        setIsLoading(() => true);
        event.preventDefault();
        try {
            await register(state);
            setState(initialState);
            setIsLoading(() => false);
            navigate('/catalogue');
        } catch (error) {
            setIsLoading(() => false);
            error.message.forEach(err => toast.error(err));
        }
    }


    return (
        <section className='page register container' >
            <header className="section-header">
                <ul className="auth-link-list">
                    <li className="auth-link-list-item"><Link className="auth-link" to="/user/login">Login</Link></li>
                    <li className="auth-link-list-item active"><Link className="auth-link active" to="/user/register">Register</Link></li>
                </ul>
            </header>

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

                <input type="submit" className="button submit-button" value="Register" disabled={(isLoading || state.isInvalid)} />

            </form>
        </section>
    );
}