import {useState} from 'react';
import {useNavigate} from 'react-router';
import {Link} from 'react-router-dom';
import {register} from '../../../services/userService';
import './Register.scss';

export function Register() {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        repeatPassword: '',
        isInvalid: false,
    });
    const navigate = useNavigate();

    function inputChangeHandler(event) {
        const name = event.target.name;
        const value = event.target.value;
        setState(state => ({...state, [name]: value}));
    }

    async function formSubmitHandler(event) {
        event.preventDefault();
        const user = await register(state);
        navigate('/catalogue');
    }


    return (
        <section className='page register container' onSubmit={formSubmitHandler}>
            <header className="section-header">
                <ul className="auth-link-list">
                    <li className="auth-link-list-item"><Link className="auth-link" to="/user/login">Login</Link></li>
                    <li className="auth-link-list-item active"><Link className="auth-link active" to="/user/register">Register</Link></li>
                </ul>
            </header>

            <form className='register-form'>

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

                <input type="submit" className="button submit-button" value="Register" disabled={state.isInvalid} />

            </form>
        </section>
    );
}